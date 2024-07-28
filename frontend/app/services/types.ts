export interface Note {
  id?: number;
  title: string;
  description: string;
  archived: boolean;
  categoryId?: number;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: number;
  name: string;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}
