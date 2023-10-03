
export interface Item {
  id?: number;
  name?: string;
  unit?: string;
  quantity?: number;
}

export interface Category {
  name: string;
}

export interface ShoppingList {
  items: Item[];
}

export interface ItemAddFormProps extends Item {
  item: Item;
  onClose: () => void;
  isItemFormVisibile: boolean;
}
export interface ItemTileProps extends Item {
  item: Item;
  removeItem: () => void;
  openModal: () => void;
}
export interface EditedItemModalProps extends Item {
  item: Item;
  isEditItemVisible: boolean;
  onClose: () => void;
}
