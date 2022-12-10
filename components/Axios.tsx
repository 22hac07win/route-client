import axios from 'axios';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { noteState } from '@/pages/atom';

type Props = {
  token: string;
};

const GetNote: FC<Props> = (props: Props) => {
  const { token } = props;
  const [note, setNote] = useRecoilState(noteState);

  axios
    .get('http://localhost:8080/ping', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      setNote(res.data.message);
    })
    .catch((err) => {
      console.error(err);
    });

  return (
    <>
      <p>{note}</p>
    </>
  );
};
