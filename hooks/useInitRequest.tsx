import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenState, resState, nextIdState } from '@/grobalState/atom';
import axios from 'axios';
import { useState } from 'react';
import { ResState } from '@/types/type';

export const useInitRequest = () => {
  const token = useRecoilValue<string>(tokenState);
  const [responce, setResponce] = useRecoilState<ResState>(resState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [nextId, setNextId] = useRecoilState<string>(nextIdState);

  const sentInitReq = async () => {
    setIsLoading(true);
    setIsLoading(false);
    axios
      .get('http://localhost:8080/init', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setResponce(result.data);
        setNextId(result.data.nextId);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, isError, sentInitReq };
};
