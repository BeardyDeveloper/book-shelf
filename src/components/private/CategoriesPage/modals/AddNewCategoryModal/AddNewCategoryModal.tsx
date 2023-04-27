import { Button } from 'components/shared/Button/Button';
import { Input } from 'components/shared/Input/Input';
import { Modal } from 'components/shared/Modal/Modal';
import type { CategoryProps } from 'hooks/private/useCategories';
import type { FC } from 'react';
import { useState } from 'react';
import uuid from 'react-uuid';
import styled from 'styled-components';

interface AddNewCategoryModalProps {
  onAddCategory: (categoryInfo: CategoryProps) => void;
  onClose: () => void;
}

export const AddNewCategoryModal: FC<AddNewCategoryModalProps> = props => {
  const { onAddCategory, onClose } = props;

  const newCategoryid = uuid();
  const [title, setTitle] = useState('');

  const onSubmit = () => {
    const categoryInfo = {
      id: newCategoryid,
      title,
      books: [],
    };

    onAddCategory(categoryInfo);
  };

  return (
    <Modal title="Add New Category" alphaBg handleClose={onClose}>
      <Content>
        <Input
          placeholder="Category title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <StyledButton fullWidth disabled={!title} onClick={onSubmit}>
          Add
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

const StyledButton = styled(Button)`
  margin-top: 24px;
`;
