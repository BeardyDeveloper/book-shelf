import { LoginForm } from 'components/private/loginPage/LoginForm/LoginForm';
import type { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useMainStore } from 'store/mainStore';
import styled, { css } from 'styled-components';

const LoginPage: FC = () => {
  const { auth } = useMainStore();
  const { login } = auth;

  return (
    <Container>
      <PerfectScrollbar>
        <StepsWrapper>
          <Form>
            <Title>Log In</Title>
            <LoginForm
              onLogin={(userName, password) => login(userName, password)}
            />
          </Form>
        </StepsWrapper>
      </PerfectScrollbar>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${({ theme }) => ({
    backgroundColor: theme.background.light.primary,
  })}
`;

const StepsWrapper = styled.div`
  width: 90%;
  max-width: 724px;
  border-radius: 14px;
  height: 470px;
  max-height: 90vh;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0 36px;
  overflow: hidden;
  transform: translate(-50%, -50%);
  ${({ theme }) => ({
    backgroundColor: theme.background.dark.primary,
  })}
`;

const Form = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: left;
  margin-bottom: 48px;
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
    font-weight: ${theme.typography.fontWeight.semiBold};
    font-size: ${theme.typography.fontSize.heading.L};
  `}
`;
