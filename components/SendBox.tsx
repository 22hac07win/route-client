import React, { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inputState, resState, nextIdState } from '@/grobalState/atom';
import { ResState, Req, InputState, Input } from '@/types/type';
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

  const { isLoading, isError, sentReq } = usePostRequest();

  const chageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickOption = (id: string) => {
    const req: Req = {
      nextId: id,
    };
    sentReq(req);
  };

  const onClickNextId = (res: ResState) => {
    if (res?.nextId !== undefined) {
      if (res?.inputKey != null) {
        const data: Input = {
          key: res.inputKey,
          body: input,
        };

        const req: Req = {
          nextId: res.nextId,
          input: data,
        };

        sentReq(req);
        setInput('');
      } else {
        const req: Req = {
          nextId: res.nextId,
        };

        sentReq(req);
        setInput('');
      }
    }
  };

  return (
    <>
      <Pane display="flex" flexDirection="column">
        {res?.options != null ? (
          res?.options?.map((option) => {
            return (
              <>
                <Button
                  onClick={() => {
                    onClickOption(option.nextBlockId);
                  }}
                >
                  {option.optionText} ({option.nextBlockId})
                </Button>
              </>
            );
          })
        ) : (
          <Pane display="flex">
            {res?.inputKey != '' ? (
              <TextInput onChange={chageInput} value={input} />
            ) : (
              <TextInput disabled value={input} />
            )}
            <IconButton
              icon={ArrowRightIcon}
              onClick={() => {
                onClickNextId(res);
              }}
            />
          </Pane>
        )}
      </Pane>
    </>
  );
};

export default SendBox;
