import { Button, ButtonVariant } from 'components/shared/Button/Button';
import { Input } from 'components/shared/Input/Input';
import type { FC } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export interface FormFieldProps {
  value: string;
  validationText: string;
}

interface LoginFormProps {
  onLogin: (userName: string, password: string) => void;
}

export const LoginForm: FC<LoginFormProps> = props => {
  const { onLogin } = props;

  const [userName, setUserName] = useState<FormFieldProps>({
    value: '',
    validationText: '',
  });
  const [password, setPassword] = useState<FormFieldProps>({
    value: '',
    validationText: '',
  });

  const onSubmit = () => {
    if (userName.value.trim() === '') {
      setUserName(prev => ({ ...prev, validationText: 'this is required' }));
    } else if (password.value.trim() === '') {
      setPassword(prev => ({ ...prev, validationText: 'this is required' }));
    } else {
      onLogin(userName.value, password.value);
    }
  };

  return (
    <Container>
      <Field>
        <Input
          value={userName.value}
          name="userName"
          label="User name"
          placeholder="John Doe"
          validationText={userName.validationText}
          onChange={e =>
            setUserName(prev => ({ ...prev, value: e.target.value }))
          }
        />
      </Field>
      <Field>
        <Input
          value={password.value}
          name="password"
          label="Password"
          placeholder="*****"
          validationText={password.validationText}
          onChange={e =>
            setPassword(prev => ({ ...prev, value: e.target.value }))
          }
        />
      </Field>
      <StyledButton
        variant={ButtonVariant.Primary}
        fullWidth
        onClick={onSubmit}
      >
        Log In
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Field = styled.div`
  width: 100%;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 48px;
`;
