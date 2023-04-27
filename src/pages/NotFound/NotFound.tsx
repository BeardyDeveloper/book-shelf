import { PageTemplate } from 'components/layout/PageTemplate/PageTemplate';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const NotFound: FC = () => (
  <PageTemplate headerTitle="NotFound">
    <Link to="/Categories">
      <Title>Go Home</Title>
    </Link>
  </PageTemplate>
);

export default NotFound;

const Title = styled.h1`
  text-align: center;
  padding: 48px 12px;
  ${({ theme }) => css`
    color: ${theme.palette.Brand[600]};
    font-size: ${theme.typography.fontSize.heading.M};
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;
