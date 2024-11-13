export type ICategoriesResponse = {
  categories: ICategory[];
};

export type ICategory = {
  id: string;
  leaf: boolean;
  name: string;
};
