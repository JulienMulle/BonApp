import {rootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {Shopping} from '../../interface/Interface';

export const selectAllShopping = (state: rootState) => state.shopping.shopping;
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

export const selectShoppingIsActive = (state: rootState) => {
  return state.shopping.shopping.find(shop => shop.isActive === true);
};
export const selectRefreshing = (state: rootState) => state.shopping.refreshing;
