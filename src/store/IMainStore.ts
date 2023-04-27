import type { AuthStoreProps } from 'hooks/api/useAuth';
import type { BooksStoreProps } from 'hooks/api/useBooks';
import type { CategoriesStoreProps } from 'hooks/private/useCategories';

export interface MainStoreProps {
  auth: AuthStoreProps;
  books: BooksStoreProps;
  category: CategoriesStoreProps;
}
