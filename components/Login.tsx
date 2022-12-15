import React from 'react';
import { FC, useEffect } from 'react';

import { auth, provider } from '@/components/Firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '@/grobalState/atom';

import { Button, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { isPropertyAccessChain } from 'typescript';

const Login: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        authUser.getIdToken().then((token) => {
          setToken(token);
        });
        router.push('/home');
      } else {
        setUser(null);
        setToken('');
        router.push('/');
      }
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#404459',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Button
          startIcon={<AccountCircle />}
          onClick={signInWithGoogle}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          <Typography component="h1" variant="h6">
            Sign In With Google
          </Typography>
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
