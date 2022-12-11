import React from 'react';
import { FC, useState, useEffect } from 'react';

import { auth, provider } from '@/components/Firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '@/pages/atom';

const Login: FC = () => {
  const [error, setError] = useState<string | null>(null);
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

  return (
    <>
      {error && <p>{error}</p>}
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  );
};

export default Login;
