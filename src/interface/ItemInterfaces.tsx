export interface Item {
  id: number;
  name: string;
  unit?: string;
  quantity?: number;
}

export interface Category {
  name: string;
}

export interface ItemAddFormProps {
  item: Item;
  onClose: () => void;
  isItemFormVisibile: boolean;
}
export interface ItemTileProps {
  item: Item;
  removeItem: () => void;
  openModal?: () => void;
}
export interface EditedItemModalProps {
  item: Item;
  isEditItemVisible: boolean;
  onClose: () => void;
}
