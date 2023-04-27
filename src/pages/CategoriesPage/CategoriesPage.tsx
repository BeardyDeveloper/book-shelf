import { PageTemplate } from 'components/layout/PageTemplate/PageTemplate';
import { Category } from 'components/private/CategoriesPage/Category/Category';
import { AddBookToCategoryModal } from 'components/private/CategoriesPage/modals/AddBookToCategoryModal/AddBookToCategoryModal';
import { AddNewCategoryModal } from 'components/private/CategoriesPage/modals/AddNewCategoryModal/AddNewCategoryModal';
import { EmptyBoundary } from 'components/shared/EmptyBoundary/EmptyBoundary';
import { AnimatePresence } from 'framer-motion';
import type { CategoryProps } from 'hooks/private/useCategories';
import { MenuBoard, NoteRemove } from 'iconsax-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useMainStore } from 'store/mainStore';
import styled from 'styled-components';

const CategoriesPage: FC = () => {
  const { category, books } = useMainStore();
  const {
    categories,
    onAddNewCategory,
    onDeleteCategory,
    onAddNewBookToCategory,
    onAddDeleteBookFromCategory,
  } = category;
  const { booksList, getBooks } = books;

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);
  const [isAddNewCategoryModalOpen, setIsAddNewCategoryModalOpen] =
    useState(false);
  const [isAddBookToCategoryModalOpen, setIsAddBookToCategoryModalOpen] =
    useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <PageTemplate
        headerTitle="Categories"
        headerTitleIcon={<MenuBoard />}
        onClick={() => setIsAddNewCategoryModalOpen(true)}
      >
        <Container>
          {categories?.length > 0 ? (
            <CategoriesList>
              {categories.map(item => (
                <Category
                  key={item.id}
                  title={item.title}
                  books={item.books}
                  onAddBook={() => {
                    setSelectedCategory(item);
                    setIsAddBookToCategoryModalOpen(true);
                  }}
                  onDeleteBook={book => onAddDeleteBookFromCategory(book)}
                  onDeleteCategory={() => onDeleteCategory(item.id)}
                />
              ))}
            </CategoriesList>
          ) : (
            <Empty>
              <EmptyBoundary
                icon={<NoteRemove size={45} />}
                title="No Categories found"
              />
            </Empty>
          )}
        </Container>
      </PageTemplate>

      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => null}
      >
        {isAddNewCategoryModalOpen ? (
          <AddNewCategoryModal
            onAddCategory={categoryInfo => {
              onAddNewCategory(categoryInfo);
              setIsAddNewCategoryModalOpen(false);
            }}
            onClose={() => setIsAddNewCategoryModalOpen(false)}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => null}
      >
        {isAddBookToCategoryModalOpen && selectedCategory ? (
          <AddBookToCategoryModal
            categoryName={selectedCategory?.title}
            booksList={booksList}
            onAddBook={booksData => {
              onAddNewBookToCategory(selectedCategory.id, booksData);
              setIsAddBookToCategoryModalOpen(false);
            }}
            onClose={() => setIsAddBookToCategoryModalOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default CategoriesPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 12px;
`;

const CategoriesList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Empty = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
