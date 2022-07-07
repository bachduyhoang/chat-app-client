import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserData } from '../../../@type/User';
import { CardActionArea } from '@mui/material';

export type UserCardProps = {
  user: UserData;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={user.photoUrl}
          alt={`image of user ${user.fullName}`}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            {`${user.fullName}, ${user.age}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${user.city}, ${user.country}`}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </CardActionArea>
    </Card>
  );
}
