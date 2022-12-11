import React from 'react';
import { FC, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/pages/atom';
import axios from 'axios';
import { GetNote } from '@/components/Axios';
import Logout from '@/components/Logout';
import { auth } from '@/components/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

const Home: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        router.push('/');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <p>Home Page</p>
      <p>{user?.displayName}</p>
      <GetNote />
      <Logout />
    </>
  );
};

export default Home;
