import React from 'react';
import { FC, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/components/Firebase';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '@/pages/atom';

const Logout: FC = () => {
  const setUser = useSetRecoilState(userState);
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
      <button onClick={signOut}>Sign out</button>
    </>
  );
};

export default Logout;
