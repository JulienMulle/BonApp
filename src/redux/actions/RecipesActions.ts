import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getRecipes,
  createRecipe,
  editeRecipe,
  deleteRecipe,
  associateItemWithRecipe,
  deleteItemAssociationWithRecipe,
  getRecipe,
} from '../services/endpointRecipe';

export const fetchRecipes = createAsyncThunk('recipes/load', async () => {
  try {
    const recipes = await getRecipes();
    return recipes;
  } catch (error) {
    throw error;
  }
});
export const fetchRecipe = createAsyncThunk(
  'Recipe/load',
  async (recipeId: number) => {
    try {
      const recipe = await getRecipe(recipeId);
      return recipe;
    } catch (error) {
      throw error;
    }
  },
);
export const createdRecipe = createAsyncThunk(
  'recipe/createRecipe',
  async ({newRecipe}: {newRecipe: FormData}) => {
    try {
      const response = await createRecipe(newRecipe);
      return response;
    } catch (error) {
      throw error;
    }
  },
);
export const updatedRecipe = createAsyncThunk(
  'recipe/updatedRecipe',
  async ({id, recipeUpdated}: {id: number; recipeUpdated: FormData}) => {
    try {
      const response = editeRecipe(id, recipeUpdated);
      return response;
    } catch (error) {
      throw error;
    }
  },
);
export const deletedRecipe = createAsyncThunk(
  'recipe/deletedRecipe',
  async (recipeId: number) => {
    try {
      const response = await deleteRecipe(recipeId);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const associationItemToRecipe = createAsyncThunk(
  'recipe/association item',
  async ({itemId, recipeId}: {itemId: number; recipeId: number}) => {
    try {
      const association = await associateItemWithRecipe(itemId, recipeId);
      return association;
    } catch (error) {
      throw error;
    }
  },
);

export const removeAssociation = createAsyncThunk(
  'recipe/delete associaiton',
  async ({itemId, recipeId}: {itemId: number; recipeId: number}) => {
    try {
      const remove = await deleteItemAssociationWithRecipe(itemId, recipeId);
      return remove;
    } catch (error) {
      throw error;
    }
  },
);
