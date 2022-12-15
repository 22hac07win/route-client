import axios from 'axios';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { messageState } from '@/app/grobalState/atom';
import { useRouter } from 'next/router';
import { tokenState } from '@/app/grobalState/atom';

export const GetMessage: FC = () => {
  const [resMes, setResMes] = useRecoilState(messageState);
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (!token) {
          router.push('/');
        }

        const res = await axios.post('http://localhost:8080/api/message', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          message: 'message',
        });

        setResMes(res.data.message);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    })();
  }, []);

  return (
    <>
      <p>{resMes}</p>
    </>
  );
};
