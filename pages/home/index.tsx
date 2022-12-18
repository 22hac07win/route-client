import React from 'react';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { userState } from '@/grobalState/atom';
import axios from 'axios';
import Logout from '@/components/Logout';
import { auth } from '@/components/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import ViewText from '@/components/ViewText';
import SendBox from '@/components/SendBox';
import {
  Button,
  Heading,
  Pane,
  Text,
  IconButton,
  ArrowRightIcon,
} from 'evergreen-ui';
import { usePostRequest } from '@/hooks/usePostRequest';

const Home: FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { isLoading, isError, sentReq } = usePostRequest();

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
      <Pane display="flex" padding={50}>
        <Pane
          textAlign="center"
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Pane display="flex" padding={30}>
            <Heading is="h2">Home</Heading>
            <Text>{user?.displayName}</Text>
            <Logout />
          </Pane>
          <ViewText />
          <Pane display="flex" padding={30}>
            <SendBox />
          </Pane>
        </Pane>
        <Pane padding={30} paddingTop={50}>
          <Image src="/character.png" width={205} height={400} alt="logo" />
        </Pane>
      </Pane>
    </>
  );
};

export default Home;
