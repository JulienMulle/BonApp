import {RootState} from '../store';
import {createAction, createSelector} from '@reduxjs/toolkit';
import {Shopping} from '../../interface/Interface';

export const selectAllShopping = (state: RootState) => state.shopping.shopping;
export const filteredShoppingByTitle = (
  shopping: Shopping[],
  title: string,
) => {
  if (title.trim() !== '') {
    return shopping.filter(shop =>
      shop.title.toLowerCase().includes(title.toLowerCase()),
    );
  } else {
    return shopping;
  }
};
const alphaNumericSort = (a: Shopping, b: Shopping) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
};
export const selectSortedAllShopping = createSelector(
  [selectAllShopping],
  shopps => [...shopps].sort(alphaNumericSort),
);

export const selectShoppingIsActive = (state: RootState) => {
  return state.shopping.shopping.find(shop => shop.isActive === true);
};
export const selectRefreshing = (state: RootState) => state.shopping.refreshing;
export const selectIsQuantityVisible = (state: RootState) =>
  state.shopping.isQuantityModalVisible;
export const openQuantityModal = createAction('shopping/openModalToAdd');
export const closeQuantityModal = createAction('shopping/closeModallToAdd');
export const setItemToQuantity = createAction('shopping/setItemToQuantity');
