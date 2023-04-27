import axios from 'axios';
import { toaster, ToastType } from 'components/shared/Toaster/Toaster';
import { useState } from 'react';

export interface BooksStoreProps {
  booksList: any[] | [];
  getBooks: () => void;
}

export const useBooks = () => {
  const [booksList, setBooksList] = useState<any[] | []>([]);

  const getBooks = () => {
    axios
      .get('books')
      .then(res => {
        if (res.status === 200) {
          const books = res.data.payload.map((book: any) => ({
            image: book.thumbnail,
            ...book,
          }));
          setBooksList(books);
        } else {
          toaster(ToastType.Error, { title: 'Failed to fetch Books!' });
        }
      })
      .catch(err => {
        toaster(ToastType.Error, { title: err.response.data.message });
      });
  };

  const result = {
    booksList,
    getBooks,
  } as const;

  return result;
};
