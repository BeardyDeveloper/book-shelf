import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'components/shared/Button/Button';
import { AddCircle, Logout } from 'iconsax-react';
import type { FC } from 'react';
import styled, { css } from 'styled-components';

interface HeaderProps {
  title: string;
  titleIcon?: JSX.Element;
  onClick?: () => void;
  onLogOut: () => void;
}

export const Header: FC<HeaderProps> = props => {
  const { title, titleIcon, onClick, onLogOut } = props;

  return (
    <Container>
      <TitleBox>
        {titleIcon}
        <Ttitle>{title}</Ttitle>
      </TitleBox>
      <Actions>
        {onClick != null ? (
          <Button
            label="New Category"
            variant={ButtonVariant.Success}
            buttonSize={ButtonSize.Medium}
            endIcon={<AddCircle />}
            onClick={onClick}
          />
        ) : null}
        <StyledButton
          label="Out"
          variant={ButtonVariant.Error}
          buttonSize={ButtonSize.Medium}
          endIcon={<Logout />}
          onClick={onLogOut}
        />
      </Actions>
    </Container>
  );
};

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  ${({ theme }) => css`
    background-color: ${theme.RGBA.layout};
  `}
  z-index: 99;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
`;

const Ttitle = styled.h1`
  margin-left: 18px;
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
    font-size: ${theme.typography.fontSize.heading.M};
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
`;

const StyledButton = styled(Button)`
  margin-left: 12px;
`;
