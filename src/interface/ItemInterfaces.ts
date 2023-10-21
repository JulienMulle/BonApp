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
