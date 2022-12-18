import Login from '@/components/Login';
import { Heading, Pane, Text } from 'evergreen-ui';

const Top = () => {
  return (
    <>
      <Pane
        textAlign="center"
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={100}
      >
        <Heading is="h1" padding={30}>
          Route
        </Heading>
        <Login />
      </Pane>
    </>
  );
};

export default Top;
