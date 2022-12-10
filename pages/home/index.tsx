import React from 'react';
import { FC, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@/pages/atom';
import axios from 'axios';

const Home: FC = () => {
  const [user, setUser] = useRecoilState(authState);
  const [message, setMessage] = useState<string | null>(null);
  const name = user?.displayName;
  const token = user?.getIdToken(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/ping')
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <p>Home Page</p>
      <p>{name}</p>
    </>
  );
};

export default Home;
