export interface Item {
  id: number;
  name: string;
  ShoppingItem?: ItemShop;
  ItemRecipe?: ItemShop;
}

export interface ItemShop {
  shopping_id: number;
  item_id: number;
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

export interface RecipeDeleteProps {
  recipe: Recipe;
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

export interface ShoppingItemTileProps {
  item?: Item;
  shopList?: Shopping;
  openModal?: () => void;
}

export interface Shopping {
  id: number;
  title: string;
  date: string | number;
  isActive: boolean;
  items: Item[];
}
