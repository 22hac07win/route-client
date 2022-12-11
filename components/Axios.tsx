import axios from 'axios';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { noteState } from '@/pages/atom';
import { useRouter } from 'next/router';
import { userState, tokenState } from '@/pages/atom';

export const GetNote: FC = () => {
  const [note, setNote] = useRecoilState(noteState);
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (!token) {
          router.push('/');
        }

        const res = await axios.get('http://localhost:8080/private/ping', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNote(res.data.message);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    })();
  }, []);

  return (
    <>
      <p>{note}</p>
    </>
  );
};
