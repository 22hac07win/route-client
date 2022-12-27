import {
  reqState,
  resState,
  tokenState,
  nextIdState,
} from '@/grobalState/atom';
import { ResState, ReqState, Req } from '@/types/type';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const usePostRequest = () => {
  const [request, setRequest] = useRecoilState<ReqState>(reqState);
  const [responce, setResponce] = useRecoilState<ResState>(resState);
  const [nextId, setNextId] = useRecoilState<string>(nextIdState);
  const token = useRecoilValue<string>(tokenState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const sentReq = async (req: Req) => {
    setIsLoading(true);
    setIsLoading(false);

    console.log('sentReq');

    axios
      .post('http://localhost:8080/message', {
        /*
        headers: {
          Authorization: `Bearer ${token}`,
        },
        */
        nextId: req?.nextId,
        input: req?.input,
      })
      .then((result) => {
        console.log(result);
        setResponce(result.data);
        console.log(responce);
        setNextId(result.data.nextId);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setRequest(null);
        setIsLoading(false);
      });
  };

  return { isLoading, isError, sentReq };
};
