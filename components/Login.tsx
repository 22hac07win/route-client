import React from 'react';
import { FC, useEffect } from 'react';
import Image from 'next/image';

import { auth, provider } from '@/components/Firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '@/grobalState/atom';
import { Button, Pane, InlineAlert } from 'evergreen-ui';
import { useInitRequest } from '@/hooks/useInitRequest';

const Login: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const router = useRouter();
  const { sentInitReq } = useInitRequest();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        authUser
          .getIdToken()
          .then((token) => {
            setToken(token);
          })
          .then(() => {
            sentInitReq();
          });

        console.log('Login');

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

  return (
    <>
      <Button width={191} height={46}>
        <Image
          src="/google_button.png"
          width={191}
          height={46}
          alt="logo"
          onClick={signInWithGoogle}
        />
      </Button>
    </>
  );
};

export default Login;
