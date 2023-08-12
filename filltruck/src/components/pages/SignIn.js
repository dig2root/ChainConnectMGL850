import * as React from 'react';
import { useState, useEffect } from 'react';
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

import './scss/SignIn.scss';
import { useGetUser } from '../functions/contracts/Users/useGetUser';
import { useEthers } from '@usedapp/core';

export default function SignIn() {

  const { activateBrowserWallet, deactivate, account } = useEthers()

  const useGetUserHandler = useGetUser(account);

  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (account) {
        if (!registered) {
            const result = useGetUserHandler;
            if (result !== undefined) {
                const { value, error } = result;
                if (!error) {
                    const data = value[0];
                    if (data[0] === '') {
                        setRegistered(false);
                        alert ("You are not registered. Please register first on https://chainconnect.org");
                    } else {
                        setRegistered(true);
                        alert ("You are registered!\nFirstname: " + data[0] + "\nLastname: " + data[1] + "\nEmail: " + data[2] + "\nAge: " + data[3]);
                    }
                }
            }
        }
    } else {
        setRegistered(false);
    };
  }, [account, useGetUserHandler, registered]);

  pageTitle("Sign In");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
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
            <br/>
            <br/>
            <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <div className='metamask'>
              {!account && <img className='metamask-image' onClick={activateBrowserWallet} alt="MetaMask Fox" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png" />}
              {account && <button className='metamask-button' onClick={deactivate}>Disconnect</button>}
              <p className='metamask-address'>{account}</p>
            </div>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}