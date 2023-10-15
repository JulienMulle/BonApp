import {Category, Item} from './ItemInterfaces';

export interface Recipe {
  id: number;
  title?: string;
  description?: string;
  picture?: string;
  items: Item[];
  category?: Category[];
}

export interface BasicRecipeProps {
  recipe: Recipe;
  onClose: () => void;
}

export interface RecipesCardProps {
  recipe: Recipe;
  openDeleteModal: () => void;
}

export interface RecipeFormProps {
  onClose: () => void;
  isRecipeFormVisible: boolean;
  onUpdateRecipes?: () => void;
  recipeToEdit?: Recipe;
}

export interface RecipeDetailProps {
  recipe: Recipe;
  route: {
    params: {
      recipe: Recipe;
    };
  };
}

export interface RecipePreviewProps extends BasicRecipeProps{
  isRecipePreviewVisible: boolean;
}

export interface AssociationWithItemProps extends BasicRecipeProps{
  isAssociationVisible: boolean;
}

export interface DeleteModalProps extends BasicRecipeProps{
  isDeleteModalVisible: boolean;
}
