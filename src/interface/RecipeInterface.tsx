import {Category, Item} from './interfaces';

export interface Recipe {
  id?: number;
  title?: string;
  description?: string;
  picture?: File;
  items?: Item[];
  category?: Category[];
}

export interface RecipesCardProps {
  recipe: Recipe;
  openModal: () => void;
  onClose: () => void;
  //removeItem: () => void;
  //editItem: () => void;
  // addShoppingList: () => void;
}

export interface RecipeFormProps {
  recipe: Recipe;
  onClose: () => void;
  isRecipeFormVisible: boolean;
}
