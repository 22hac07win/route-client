import { resState } from '@/grobalState/atom';
import { usePostRequest } from '@/hooks/usePostRequest';
import { ResState } from '@/types/type';
import { Card, Pane, Text } from 'evergreen-ui';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {
  body: string | undefined;
};
const TextBox: FC<Props> = ({ body }) => {
  return (
    <>
      <Card
        elevation={1}
        float="left"
        maxWidth={2 / 3}
        minWidth={500}
        height={120}
        margin={24}
        white-space="normal"
      >
        <Text size={300}>{body}</Text>
      </Card>
    </>
  );
};

const ViewText: FC = () => {
  const { isLoading, isError } = usePostRequest();
  const res = useRecoilValue<ResState>(resState);

  return <>{isLoading ? <TextBox body="" /> : <TextBox body={res?.text} />}</>;
};

export default ViewText;
