import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'components/shared/Button/Button';
import { EmptyBoundary } from 'components/shared/EmptyBoundary/EmptyBoundary';
import type { BookProps } from 'hooks/private/useCategories';
import { Add, Dropbox, Trash } from 'iconsax-react';
import type { FC } from 'react';
import styled, { css } from 'styled-components';

import { BookCard } from '../BookCard/BookCard';

export interface CategorySectionProps {
  title: string;
  books: BookProps[];
  className?: string;
  onAddBook: () => void;
  onDeleteCategory: () => void;
  onDeleteBook: (book: BookProps) => void;
}

export const Category: FC<CategorySectionProps> = props => {
  const { title, className, books, onAddBook, onDeleteCategory, onDeleteBook } =
    props;

  return (
    <Container className={className}>
      <Header>
        <Title>{title}</Title>
        <Actions>
          <AddButton>
            <Button
              label="Add Book"
              fullWidth
              variant={ButtonVariant.Primary}
              buttonSize={ButtonSize.Small}
              endIcon={<Add />}
              onClick={onAddBook}
            />
          </AddButton>
          <DeleteButton>
            <Button
              label="Delete Book"
              fullWidth
              variant={ButtonVariant.Error}
              buttonSize={ButtonSize.Small}
              endIcon={<Trash />}
              onClick={onDeleteCategory}
            />
          </DeleteButton>
        </Actions>
      </Header>
      <Content>
        {books?.length > 0 ? (
          <Books>
            {books.map(book => (
              <StyledBookCard
                key={book.id}
                image={book.image}
                title={book.title}
                onDeleteBook={() => onDeleteBook(book)}
              />
            ))}
          </Books>
        ) : (
          <Empty>
            <EmptyBoundary
              icon={<Dropbox size={45} />}
              title="No Books found in this Category"
            />
          </Empty>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
  ${({ theme }) => css`
    background-color: ${theme.background.dark.secondary};
  `}
`;

const Header = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${`1px solid ${theme.palette.Neutral[700]}`};
    color: ${theme.text.light.primary};
  `}
`;

const Title = styled.h6`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.heading.M};
    color: ${theme.text.light.primary};
  `}
`;

const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${theme.text.light.primary};
  `}
`;

const AddButton = styled.div`
  ${({ theme }) => css`
    width: 160px;
    padding: 14px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.text.light.primary};
  `}
`;

const DeleteButton = styled.div`
  ${({ theme }) => css`
    width: 160px;
    padding: 14px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.text.light.primary};
  `}
`;

const Content = styled.div`
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
`;

const Empty = styled.div`
  width: 100%;
  padding: 36px 0;
`;

const Books = styled.div`
  width: auto;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  padding: 12px;
`;

const StyledBookCard = styled(BookCard)`
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;
