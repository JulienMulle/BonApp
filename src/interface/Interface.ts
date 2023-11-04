export interface Item {
  id: number;
  name: string;
  unit?: string;
  quantity?: number;
}

export interface Category {
  name: string;
}
export interface ItemTileProps {
  item: Item;
  removeItem?: () => void;
  openModal?: () => void;
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  picture?: string;
  items: Item[];
  category?: Category[];
}

export interface RecipesCardProps {
  recipe: Recipe;
}

export interface Shopping {
  id: number;
  title: string;
  date: Date;
  items: Item[];
  isActive: boolean;
}
