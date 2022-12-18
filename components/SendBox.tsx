import React, { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inputState, resState, nextIdState } from '@/grobalState/atom';
import { ResState } from '@/types/type';
import {
  TextInput,
  Button,
  Pane,
  IconButton,
  ArrowRightIcon,
} from 'evergreen-ui';
import { usePostRequest } from '@/hooks/usePostRequest';

const SendBox: FC = () => {
  const [input, setInput] = useRecoilState<string>(inputState);
  const res = useRecoilValue<ResState>(resState);
  const [nextId, setNextId] = useRecoilState<string>(nextIdState);
  const chageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const { isLoading, isError, sentReq } = usePostRequest();
  console.log(res?.options);

  return (
    <>
      <Pane display="flex" flexDirection="column">
        {res?.options?.map((option) => {
          return (
            <>
              <Button
                onClick={() => {
                  sentReq(option.nextBlockId);
                }}
              >
                {option.optionText} ({option.nextBlockId})
              </Button>
            </>
          );
        })}

        <Pane display="flex">
          {res?.input != null ? (
            <TextInput onChange={chageInput} value={input} />
          ) : (
            <TextInput disabled />
          )}
          <IconButton
            icon={ArrowRightIcon}
            onClick={() => {
              sentReq(nextId);
            }}
          />
        </Pane>
      </Pane>
    </>
  );
};

export default SendBox;
