import React from 'react';
import { FC, useState, useEffect } from 'react';

import { auth, provider } from '@/components/Firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import authState from '@/pages/atom';

const Login: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [authUser, setAuth] = useRecoilState(authState);
  // const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user);
        router.push('/home');
      } else {
        setAuth(null);
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
      {error && <p>{error}</p>}
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>{authUser?.displayName}</p>
    </>
  );
};

export default Login;
