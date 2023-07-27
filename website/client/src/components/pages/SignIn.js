import * as React from 'react';
import { useState } from 'react';
import axios from './../functions/Axios';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import pageTitle from '../functions/PageTitle';

export default function SignIn() {

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [ profileId, setProfileId ] = useState(null);

  async function login(){
      if (isConnected) {
          await disconnectAsync();
      }
      const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });
      const {data} = await axios.get('http://localhost:5000/request', {
          params: { address: account, chainId: chain.id },
      });
      const message = data.message;
      const signature = await signMessageAsync({ message });
      const verification = await axios.get('http://localhost:5000/verify', {
          params: { message: message, signature: signature },
      });
      setProfileId(verification?.data?.profileId)
  }

  pageTitle("Sign In");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        const res = await axios.post('/login', JSON.stringify(Object.fromEntries(data)), {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true
        });
        console.log(res.data);
        window.location.href = "/";
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign_up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              {profileId ?
                <div>
                    <h3>Profile ID: {profileId}</h3>
                    <button onClick={()=> setProfileId(null)}>Logout</button>
                </div>:
                <button onClick={login}>Login with MetaMask</button>
              }
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}