import { toaster, ToastType } from 'components/shared/Toaster/Toaster';
import { useState } from 'react';

export interface BookProps {
  id: string;
  title: string;
  image: string;
}
export interface CategoryProps {
  id: string;
  title: string;
  books: BookProps[];
}

export interface CategoriesStoreProps {
  categories: CategoryProps[];
  onAddNewCategory: (category: CategoryProps) => void;
  onDeleteCategory: (id: string) => void;
  onAddNewBookToCategory: (categoryId: string, book: BookProps[]) => void;
  onAddDeleteBookFromCategory: (book: BookProps) => void;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>(
    JSON.parse(localStorage.getItem('categories') || '[]'),
  );

  const onAddNewCategory = (category: CategoryProps) => {
    const categoriesCopy = [...categories];
    const updatedSorageCategories = JSON.stringify([
      ...categoriesCopy,
      category,
    ]);

    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
      localStorage.setItem('categories', updatedSorageCategories);
      toaster(ToastType.Success, { title: 'Category added Succesfully!' });
    } else {
      toaster(ToastType.Error, { title: 'this category is already exist' });
    }
  };

  const onDeleteCategory = (id: string) => {
    const categoriesCopy = [...categories];
    const currentItemIndex = categoriesCopy.findIndex(item => item.id === id);
    categoriesCopy.splice(currentItemIndex, 1);

    setCategories(categoriesCopy);
    localStorage.setItem('categories', JSON.stringify(categoriesCopy));
  };

  const onAddNewBookToCategory = (categoryId: string, books: BookProps[]) => {
    const categoriesCopy = [...categories];
    const selectedCategoryIndex = categoriesCopy.findIndex(
      ctg => ctg.id === categoryId,
    )!;
    const selectedCategory = categoriesCopy.find(ctg => ctg.id === categoryId)!;
    const selectedCategoryBooks = selectedCategory?.books;

    const isBooksAddedBefore = selectedCategoryBooks.some(ctg =>
      books.includes(ctg),
    );

    if (!isBooksAddedBefore) {
      const updatedCategoryBooks = [...selectedCategoryBooks, ...books];
      selectedCategory.books = updatedCategoryBooks;
      categoriesCopy[selectedCategoryIndex] = selectedCategory;
      setCategories(categoriesCopy);
      localStorage.setItem('categories', JSON.stringify(categoriesCopy));
      toaster(ToastType.Success, { title: 'Category added Succesfully!' });
    } else {
      toaster(ToastType.Error, { title: 'this category is already exist' });
    }
  };

  const onAddDeleteBookFromCategory = (book: BookProps) => {
    const categoriesCopy = [...categories];
    const currentCategoryIndex = categoriesCopy.findIndex(ctg =>
      ctg.books.includes(book),
    )!;
    const currentCategory = categoriesCopy.find(ctg =>
      ctg.books.includes(book),
    )!;
    const updatedBooks = currentCategory.books.filter(
      item => item.id !== book.id,
    );
    currentCategory.books = updatedBooks;
    categoriesCopy[currentCategoryIndex] = currentCategory;

    setCategories(categoriesCopy);
    localStorage.setItem('categories', JSON.stringify(categoriesCopy));
  };

  const result = {
    categories,
    onAddNewCategory,
    onDeleteCategory,
    onAddNewBookToCategory,
    onAddDeleteBookFromCategory,
  } as const;

  return result;
};
