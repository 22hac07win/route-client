import React from 'react';
import { FC, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/components/Firebase';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '@/grobalState/atom';
import { Button, IconButton, LogOutIcon } from 'evergreen-ui';
import { useInitRequest } from '@/hooks/useInitRequest';

const Logout: FC = () => {
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const router = useRouter();
  const { sentInitReq } = useInitRequest();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        authUser.getIdToken().then((token) => {
          setToken(token);
        });

        console.log('Login');

        sentInitReq();
        router.push('/home');
      } else {
        setUser(null);
        setToken('');
        router.push('/');
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return (
    <>
      <IconButton icon={LogOutIcon} intent="danger" onClick={signOut}>
        Sign out
      </IconButton>
    </>
  );
};

export default Logout;
