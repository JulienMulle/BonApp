import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item, Shopping} from '../../interface/Interface';
import {
  createShopping,
  deletedAssociation,
  fetchAllShopping,
  fetchShopping,
  updateQuantity,
} from '../actions/ShoppingActions';

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    shoppingList: {} as Shopping,
    shopping: [] as Shopping[],
    sortedAllShopping: [] as Shopping[],
    newShopping: {} as Shopping,
    shoppingDetails: {} as Shopping,
    editedShopping: {} as Shopping,
    refreshing: false,
    isFormVisible: false,
    isQuantityModalVisible: false,
    itemToQuantity: {} as Item,
    search: '',
  },
  reducers: {
    openModalToAdd: state => {
      state.isQuantityModalVisible = true;
    },
    closeModallToAdd: state => {
      state.isQuantityModalVisible = false;
    },
    setItemToQuantity: (state, action) => {
      state.itemToQuantity = action.payload;
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{itemId: number; quantity: number}>,
    ) => {
      const {itemId, quantity} = action.payload;
      const item = state.shoppingList.items.find(item => item.id === itemId);
      if (item) {
        item.ShoppingItem.quantity = quantity;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllShopping.fulfilled, (state, action) => {
      state.shopping = action.payload;
      state.refreshing = false;
    });
    builder.addCase(fetchAllShopping.pending, state => {
      state.refreshing = true;
    });
    builder.addCase(fetchAllShopping.rejected, state => {
      state.refreshing = false;
    });
    builder.addCase(createShopping.fulfilled, (state, action) => {
      state.shopping.push(action.payload);
    });
    builder.addCase(fetchShopping.fulfilled, (state, action) => {
      state.shoppingList = action.payload;
      state.refreshing = false;
    });
    builder.addCase(fetchShopping.pending, state => {
      state.refreshing = true;
    });
    builder.addCase(fetchShopping.rejected, state => {
      state.refreshing = false;
    });
    builder.addCase(deletedAssociation.fulfilled, (state, action) => {
      const {shopping_id, item_id} = action.payload;
      const shoppingToUpdate = state.shopping.find(
        shop => shop.id === shopping_id,
      );
      if (shoppingToUpdate) {
        shoppingToUpdate.items = shoppingToUpdate.items.filter(
          item => item.id !== item_id,
        );
      }
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
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
