import {RootState} from '../store';
import {createAction, createSelector} from '@reduxjs/toolkit';
import {Recipe} from '../../interface/Interface';

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const filteredRecipesByTitle = (recipes: Recipe[], title: string) => {
  if (title.trim() !== '') {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(title.toLowerCase()),
    );
  } else {
    return recipes;
  }
};
const alphaNumericSort = (a: Recipe, b: Recipe) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
};
export const selectSortedRecipes = createSelector([selectRecipes], recipes =>
  [...recipes].sort(alphaNumericSort),
);
export const selectRefreshing = (state: RootState) => state.recipe.refreshing;
export const selectIsdeleteModal = (state: RootState) =>
  state.recipe.isDeleteModalVisible;

export const selectIsAssociationModal = (state: RootState) =>
  state.recipe.isAssociationModalVisible;
export const selectIsFormVisible = (state: RootState) =>
  state.recipe.isFormVisible;
export const selectIsEdit = (state: RootState) => state.recipe.isEdit;
export const openedIsEdit = createAction('recipe/openedIsEdit');
export const closeIsEdit = createAction('recipe/closedIsEdit');
export const openAssociationModal = createAction('recipe/openAssociationModal');
export const closeAssociationModal = createAction(
  'recipe/closeAssociationModal',
);
export const openEditModal = createAction('recipe/openEditModal');
export const openFormModal = createAction('recipe/openFormModal');
export const closeFormModal = createAction('recipe/closeFormModal');
export const openDeleteModal = createAction('recipe/openedDeleteModal');
export const closedDeleteModal = createAction('recipe/closeDeleteModal');
export const setSearch = createAction<string>('recipe/setSearch');
export const setRecipeForEditing = createAction<Recipe>('recipe/setRecipe');
export const clearEditedRecipe = createAction('recipe/clearEditedRecipe');
export const setNewRecipe = createAction<Recipe>('recipe/setNewRecipe');
