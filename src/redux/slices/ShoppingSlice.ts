import {createSlice} from '@reduxjs/toolkit';
import {Shopping} from '../../interface/Interface';
import {
  createShopping,
  deletedAssociation,
  fetchAllShopping,
  fetchShopping,
  fetchShoppingIsActive,
  updateQuantity,
} from '../actions/ShoppingActions';

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    shoppingList: {} as Shopping,
    shopping: [] as Shopping[],
    sortedAllShopping: [] as Shopping[],
    newShopping: {} as Shopping,
    editedShopping: {} as Shopping,
    refreshing: false,
    isFormVisible: false,
    search: '',
  },

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllShopping.fulfilled, (state, action) => {
        state.shopping = action.payload;
        state.refreshing = false;
      })
      .addCase(fetchAllShopping.pending, state => {
        state.refreshing = true;
      })
      .addCase(fetchAllShopping.rejected, state => {
        state.refreshing = false;
      })
      .addCase(createShopping.fulfilled, (state, action) => {
        state.shopping.push(action.payload);
      })
      .addCase(fetchShopping.fulfilled, (state, action) => {
        state.shoppingList = action.payload;
        state.refreshing = false;
      })
      .addCase(fetchShopping.pending, state => {
        state.refreshing = true;
      })
      .addCase(fetchShopping.rejected, state => {
        state.refreshing = false;
      })
      .addCase(fetchShoppingIsActive.pending, state => {
        state.refreshing = true;
      })
      .addCase(fetchShoppingIsActive.fulfilled, (state, action) => {
        state.shoppingList = action.payload;
        state.refreshing = false;
      })
      .addCase(fetchShoppingIsActive.rejected, state => {
        state.refreshing = false;
      })
      .addCase(deletedAssociation.pending, state => {
        state.refreshing = true;
      })
      .addCase(deletedAssociation.fulfilled, (state, action) => {
        const {shopping_id, item_id} = action.payload;
        const shoppingToUpdate = state.shopping.find(
          shop => shop.id === shopping_id,
        );
        if (shoppingToUpdate) {
          shoppingToUpdate.items = shoppingToUpdate.items.filter(
            item => item.id !== item_id,
          );
        }
        state.refreshing = false;
      })
      .addCase(deletedAssociation.rejected, state => {
        state.refreshing = false;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const {shopping_id, item_id, quantity} = action.payload;
        const shoppingToUpdate = state.shopping.find(shop => {
          if (shop.items && shop.items.length > 0) {
            return shop.items.some(
              item => item.ShoppingItem?.shopping_id === shopping_id,
            );
          }
          return false;
        });
        if (shoppingToUpdate) {
          const itemTodelete = shoppingToUpdate.items.find(
            item => item.id === item_id,
          );
          if (itemTodelete) {
            itemTodelete.ShoppingItem.quantity = quantity;
          }
        }
      });
  },
});

export default shoppingSlice.reducer;
