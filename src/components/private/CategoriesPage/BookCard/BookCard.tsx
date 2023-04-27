import { Trash } from 'iconsax-react';
import type { FC } from 'react';
import styled, { css } from 'styled-components';

export interface BookCardProps {
  title: string;
  image: string;
  className?: string;
  onDeleteBook: () => void;
}

export const BookCard: FC<BookCardProps> = props => {
  const { title, image, className, onDeleteBook } = props;

  return (
    <Container className={className}>
      <DeleteButton onClick={onDeleteBook}>
        <Trash size={21} />
      </DeleteButton>
      <Image style={{ backgroundImage: `url(${image})` }} />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 300px;
  height: auto;
  ${({ theme }) => css`
    background-color: ${theme.palette.Neutral[700]};
  `}
`;

const DeleteButton = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    border-radius: 50%;
    padding: 6px;
    background-color: ${theme.palette.Status.Rose[50]};
    cursor: pointer;
    & > svg {
      color: ${theme.palette.Status.Rose[700]};
    }
  `}
`;

const Image = styled.div`
  background-color: ${({ theme }) => theme.palette.Neutral[900]};
  width: 100%;
  height: 260px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: fill;
`;

const Title = styled.span`
  ${({ theme }) => css`
    width: 100%;
    text-align: center;
    padding: 14px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.text.light.primary};
  `}
`;
