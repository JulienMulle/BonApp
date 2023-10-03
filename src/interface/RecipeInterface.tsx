import {Category, Item} from './interfaces';

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  image?: string;
  items?: Item[];
  category?: Category[];
}

export interface RecipesCardProps {
  recipe: Recipe;
  //removeItem: () => void;
  //editItem: () => void;
  // addShoppingList: () => void;
}

export interface RecipeFormProps {
  recipe: Recipe;
  onClose: () => void;
  isRecipeFormVisible: boolean;
}
