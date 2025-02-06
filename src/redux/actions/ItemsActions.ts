import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  deleteItem,
  getItems,
  editItem,
  createItem,
} from '../../api/endpointItem';
import {Item} from '../../interface/Interface';

export const fetchItems = createAsyncThunk('items/load', async () => {
  const items = await getItems();
  return items;
});
export const createdItem = createAsyncThunk(
  'items/createItem',
  async (name: string): Promise<Item> => {
    try {
      const response = await createItem(name);
      return response;
    } catch (error) {
      throw error;
    }
  },
);
export const updatedItem = createAsyncThunk(
  'items/updateItem',
  async (newItem: Item) => {
    try {
      const response = editItem(newItem);
      return response;
    } catch (error) {
      throw error;
    }
  },
);
export const deletedItem = createAsyncThunk(
  'items/deleteItem',
  async (itemId: number) => {
    try {
      const response = await deleteItem(itemId);
      if (response === 204) {
        return itemId;
      }
    } catch (error) {
      throw error;
    }
  },
);
