import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getAllShopping,
  getShopping,
  createdShopping,
  editedShopping,
  deleteShopping,
  associateItem,
  deleteAssociation,
  addedQuantity,
  getShoppingActive,
} from '../services/endpointShopping';
import {Shopping} from '../../interface/Interface';

export const fetchAllShopping = createAsyncThunk(
  'shopping/load all shopping',
  async (): Promise<Shopping[]> => {
    try {
      const allShopping = await getAllShopping();
      return allShopping;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchShopping = createAsyncThunk(
  'shopping/load',
  async (shoppingId: number): Promise<Shopping> => {
    try {
      const shopping = await getShopping(shoppingId);
      return shopping;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchShoppingActive = createAsyncThunk(
  'shopping/isActive',
  async (): Promise<Shopping> => {
    try {
      const shoppingIsActive = await getShoppingActive();
      return shoppingIsActive;
    } catch (error) {
      throw error;
    }
  },
);

export const createShopping = createAsyncThunk(
  'shopping/create shopping',
  async (newShopping: Shopping): Promise<Shopping> => {
    try {
      const response = await createdShopping(newShopping);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const updateShopping = createAsyncThunk(
  'shopping/patch shopping',
  async (shoppingUdpated: Shopping): Promise<Shopping> => {
    try {
      const response = await editedShopping(shoppingUdpated);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const deletedShopping = createAsyncThunk<number>(
  'shopping/delete shopping',
  async (shoppingId: number): Promise<Shopping[]> => {
    try {
      const response = await deleteShopping(shoppingId);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const associationItem = createAsyncThunk<Shopping>(
  'shopping/associateItem',
  async ({
    shoppingId,
    itemId,
    quantity,
  }: {
    shoppingId: number;
    itemId: number;
    quantity: number;
  }): Promise<Shopping> => {
    try {
      const association = await associateItem(shoppingId, itemId, quantity);
      return association;
    } catch (error) {
      throw error;
    }
  },
);

export const updateQuantity = createAsyncThunk(
  'shopping/quantityitem',
  async ({
    shoppingId,
    itemId,
    updatedQuantity,
  }: {
    shoppingId: number;
    itemId: number;
    updatedQuantity: number;
  }): Promise<Shopping> => {
    try {
      const quantityItem = await addedQuantity(
        shoppingId,
        itemId,
        updatedQuantity,
      );
      return quantityItem;
    } catch (error) {
      throw error;
    }
  },
);

export const deletedAssociation = createAsyncThunk(
  'shopping/delete association',
  async ({
    shoppingId,
    itemId,
  }: {
    shoppingId: number;
    itemId: number;
  }): Promise<Shopping> => {
    try {
      const association = await deleteAssociation(shoppingId, itemId);
      return association;
    } catch (error) {
      throw error;
    }
  },
);
