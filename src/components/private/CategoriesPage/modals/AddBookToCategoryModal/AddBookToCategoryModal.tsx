import { Button } from 'components/shared/Button/Button';
import { Input } from 'components/shared/Input/Input';
import { Modal } from 'components/shared/Modal/Modal';
import { SelectBox } from 'components/shared/SelectBox/SelectBox';
import type { BookProps } from 'hooks/private/useCategories';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface AddBookToCategoryModalProps {
  categoryName: string;
  booksList: BookProps[];
  onAddBook: (list: BookProps[]) => void;
  onClose: () => void;
}

export const AddBookToCategoryModal: FC<
  AddBookToCategoryModalProps
> = props => {
  const { categoryName, booksList, onAddBook, onClose } = props;

  const [searchValue, setSearchValue] = useState('');
  const [searchedBooksList, setSearchedBooksList] = useState(booksList);
  const [selectedBooksIds, setSelectedBooksIds] = useState<string[]>([]);

  useEffect(() => {
    const booksCopy = [...booksList] as BookProps[];
    const searchList = booksCopy.filter((book: BookProps) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setSearchedBooksList(searchList);
  }, [searchValue]);

  const onSubmit = () => {
    const booksCopy = [...booksList] as BookProps[];
    const filteredList = booksCopy.filter((book: BookProps) =>
      selectedBooksIds.includes(book.id),
    );
    onAddBook(filteredList);
  };

  const onSelectItem = (id: string) => {
    const selecteds = [...selectedBooksIds];

    if (selecteds.includes(id)) {
      const filteredSelecteds = selecteds.filter(item => item !== id);
      setSelectedBooksIds(filteredSelecteds);
    } else {
      setSelectedBooksIds(prev => [...prev, id]);
    }
  };

  return (
    <Modal
      title={`Add new Book to ${categoryName} Category!`}
      alphaBg
      handleClose={onClose}
    >
      <Content>
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <Selection>
          <SelectBox
            list={searchedBooksList}
            selectedIds={selectedBooksIds}
            onSelect={onSelectItem}
          />
        </Selection>
        <StyledButton fullWidth onClick={onSubmit}>
          Add Books
        </StyledButton>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 32px 0 32px;
`;

const Selection = styled.div`
  width: 100%;
  height: 300px;
  margin: 24px 0;
`;

const StyledButton = styled(Button)``;
