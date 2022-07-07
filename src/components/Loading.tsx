import { Box, CircularProgress } from '@mui/material';

type PropLoading = {
  fullHeight: boolean;
};

const Loading = ({ fullHeight }: PropLoading) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullHeight ? '100vh' : '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
