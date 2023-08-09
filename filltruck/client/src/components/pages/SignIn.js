import * as React from 'react';
import { useState } from 'react';
import axios from './../functions/Axios';
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
import Web3 from "web3";
import configuration from "../../Users.json";

export default function SignIn() {

  const [ profileId, setProfileId ] = useState(null);
  
  const contractAddress = configuration.networks["5777"].address;
  const contractABI = configuration.abi;
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  const contract = new web3.eth.Contract(contractABI, contractAddress, { gas: 300000, gasPrice: '20000000000' });

  const checkConnection = () => {
    window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch((err) => {
        console.error(err);
    });
  }

  const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setProfileId(null);
      } else {
        setProfileId(accounts[0]);
      }
  }

  const getProfile = async () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      let accounts = await provider.request({ method: 'eth_accounts' });
      let account = accounts[0];
      let result = await contract.methods.getUser().call({ from: account });
      console.log(result);
    } else {
      console.log("Non-ethereum browser detected. Please install Metamask");
    }
  }


  const handleMetamaskSubmit = async () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
        await provider.request({ method: 'eth_requestAccounts' });
        checkConnection();
        getProfile();
    } else {
        console.log("Non-ethereum browser detected.Please install Metamask");
    }
  }

  pageTitle("Sign In");
  checkConnection();

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
            <br/>
            <br/>
            <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              {profileId ?
                <div>
                    <h3>Profile ID: {profileId}</h3>
                </div>:
                <button onClick={handleMetamaskSubmit}>Login with MetaMask</button>
              }
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}