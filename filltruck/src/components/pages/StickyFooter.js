import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://filltruck.com/">
        filltruck
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
    component="footer"
    sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
        theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
    }}
    >
    <Container maxWidth="sm">
        <Typography variant="body1">
            My sticky footer can be found here.
        </Typography>
        <Copyright />
    </Container>
    </Box>
  );
}