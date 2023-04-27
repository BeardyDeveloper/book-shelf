import type { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useMainStore } from 'store/mainStore';
import styled, { css } from 'styled-components';

import { Header } from '../Header/Header';

interface PageTemplateProps {
  children: any;
  headerTitle: string;
  headerTitleIcon?: JSX.Element;
  onClick?: () => void;
}

export const PageTemplate: FC<PageTemplateProps> = props => {
  const { children, headerTitle, headerTitleIcon, onClick } = props;

  const { auth } = useMainStore();
  const { logout } = auth;

  return (
    <Wrapper>
      <Header
        title={headerTitle}
        titleIcon={headerTitleIcon}
        onClick={onClick}
        onLogOut={logout}
      />
      <Main>
        <PerfectScrollbar>
          <Children>{children}</Children>
        </PerfectScrollbar>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
  z-index: 10;
  mix-blend-mode: normal;
  overflow: hidden;
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;
    background-color: ${theme.background.dark.primary};
  `}
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${({ theme }) => css`
    position: relative;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: ${theme.background.dark.primary};
  `}
`;

const Children = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0;
`;
