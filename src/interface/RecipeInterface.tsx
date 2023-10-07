import {Category, Item} from './ItemInterfaces';

export interface Recipe {
  id: number;
  title?: string;
  description?: string;
  picture?: string;
  items: Item[];
  category?: Category[];
}

export interface RecipesCardProps {
  recipe: Recipe;
  openDeleteModal: () => void;
  //onClose: () => void;
  //removeItem: () => void;
  //editItem: () => void;
  // addShoppingList: () => void;
}

export interface RecipeFormProps {
  onClose: () => void;
  isRecipeFormVisible: boolean;
  onUpdateRecipes: () => void;
}

export interface RecipeDetailProps {
  recipe: Recipe;
  route: {
    params: {
      recipe: Recipe;
    };
  };
}

export interface RecipePreviewProps {
  recipe: Recipe;
  onClose: () => void;
  isRecipePreviewVisible: boolean;
}

export interface AssociationWithItemProps {
  recipe: Recipe;
  isAssociationVisible: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  recipe: Recipe;
  onClose: () => void;
  isDeleteModalVisible: boolean;
}
