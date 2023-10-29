import {Category, Item} from './ItemInterfaces';

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
