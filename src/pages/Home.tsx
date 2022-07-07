import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserData } from '../@type/User';
import UserCard from '../components/dashboard/home/UserCard';
import userService, { GetMemberParams } from '../redux/services/userService';

export default function Home() {
  const [listMember, setListMember] = useState<UserData[] | null>(null);
  const [searchParams, setSearchParams] = useState<GetMemberParams>({
    PageNumber: 1,
    PageSize: 12,
    OrderBy: 1,
  });

  useEffect(() => {
    const listUserResult = userService
      .getMember(searchParams)
      .then((response) => {
        if (response) {
          setListMember(response);
        }
      });
  }, [searchParams]);
  return (
    <Container
      sx={{
        display: 'flex',
      }}
      maxWidth="lg"
    >
      <Grid container spacing={3} marginTop={1}>
        {listMember &&
          listMember.map((e) => {
            return (
              <Grid key={e.id} item xs={4} md={2}>
                <UserCard user={e} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
