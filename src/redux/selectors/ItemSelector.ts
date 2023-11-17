import {rootState} from '../store';
import {Item} from '../../interface/Interface';
import {createAction, createSelector} from '@reduxjs/toolkit';

export const selectItems = (state: rootState) => state.items.items;
export const filterItemsByName = (items: Item[], name: string) => {
  if (name.trim() !== '') {
    return items.filter(item =>
      item.name?.toLowerCase().includes(name.toLowerCase()),
    );
  } else {
    return items;
  }
};
const alphaNumericSort = (a: Item, b: Item) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
};
export const selectSortedItems = createSelector([selectItems], items =>
  [...items].sort(alphaNumericSort),
);
export const selectRefreshing = (state: rootState) => state.items.refreshing;

export const editionItem = (state: rootState) => state.items.isEdit;
export const openedEdtionItem = createAction('items/openedEdtionItem');
export const closeEditionItem = createAction('items/closeEditionItem');
export const selectIsEditItemVisible = (state: rootState) =>
  state.items.isEditItemVisible;
export const openEditItemModal = createAction('items/openEditItemModal');
export const closeEditItemModal = createAction('items/closeEditItemModal');
export const selectIsItemFormVisible = (state: rootState) =>
  state.items.isItemFormVisible;
export const openItemFormModal = createAction('items/openItemFormModal');
export const closeItemFormModal = createAction('items/closeItemFormModal');
export const setSearch = createAction('items/setSearch');
export const setNewItem = createAction('items/setNewItem');
export const setEdition = createAction('items/setEdition');
export const setEditItem = createAction('items/setEditItem');
