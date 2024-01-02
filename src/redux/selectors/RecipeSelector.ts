import {rootState} from '../store';
import {createAction, createSelector} from '@reduxjs/toolkit';
import {Recipe} from '../../interface/Interface';

export const selectRecipes = (state: rootState) => state.recipe.recipes;
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
export const selectRefreshing = (state: rootState) => state.recipe.refreshing;
export const selectIsdeleteModal = (state: rootState) =>
  state.recipe.isDeleteModalVisible;

export const selectIsAssociationModal = (state: rootState) =>
  state.recipe.isAssociationModalVisible;
export const selectIsFormVisible = (state: rootState) =>
  state.recipe.isFormVisible;
export const selectViewDetails = (state: rootState) =>
  state.recipe.isDetailVisible;

export const selectIsEdit = (state: rootState) => state.recipe.isEdit;
export const openedDeleteModal = createAction('recipe/openModalDetails');
export const closedDeleteModal = createAction('recipe/closeModalDetails');
export const openedIsEdit = createAction('recipe/openedIsEdit');
export const closeIsEdit = createAction('recipe/closedIsEdit');
export const openAssociationModal = createAction('recipe/openAssociationModal');
export const closeAssociationModal = createAction(
  'recipe/closeAssociationModal',
);
export const openFormModal = createAction('recipe/openFormModal');
export const closeFormModal = createAction('recipe/closeFormModal');
export const openModalDetails = createAction('recipe/openModalDetails');
export const closeModalDetails = createAction('recipe/closeModalDetails');
export const setSearch = createAction<string>('recipe/setSearch');
export const setRecipe = createAction<Recipe>('recipe/setRecipe');
export const clearEditedRecipe = createAction('recipe/clearEditedRecipe');
export const setNewRecipe = createAction<Recipe>('recipe/setNewRecipe');
