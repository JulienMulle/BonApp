import {createSlice} from '@reduxjs/toolkit';
import {Item, Shopping} from '../../interface/Interface';
import {
  associationItem,
  createShopping,
  deletedAssociation,
  deletedShopping,
  fetchAllShopping,
  fetchShopping,
  fetchShoppingActive,
  updateQuantity,
  updateShopping,
} from '../actions/ShoppingActions';
import {RootState} from '../store';

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    shoppingList: {} as Shopping,
    shopping: [] as Shopping[],
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
    updateShoppingList: (state, action) => {
      state.shoppingDetails.items = action.payload;
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
      const newShopping = action.payload;
      state.shopping.push(newShopping);
      state.shoppingDetails = newShopping;
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
    builder.addCase(fetchShoppingActive.fulfilled, (state, action) => {
      const newActiveShopping = action.payload;
      state.shoppingDetails = newActiveShopping;
    });
    builder.addCase(associationItem.fulfilled, (state, action) => {
      const shoppingActive = {...state.shoppingDetails};
      const shoppingList = action.payload;
      /*const index = state.shopping.findIndex(
        shop => shop.id === shoppingList.id,
      );
      if (index !== -1) {
        state.shopping[index] = shoppingList;
      }
      à garder pour une eventuelle evol des patch des anciennes listes
      */
      if (shoppingActive.id === shoppingList.id) {
        state.shoppingDetails = shoppingList;
      }
    });
    builder.addCase(deletedAssociation.fulfilled, (state, action) => {
      const newShoppingList = action.payload;
      const shoppingToUpdate = {...state.shoppingDetails};
      if (shoppingToUpdate.id === newShoppingList.id) {
        state.shoppingDetails = newShoppingList;
      }
    });
    builder.addCase(updateShopping.fulfilled, (state, action) => {
      const shoppingUpdated = action.payload;
      if (!shoppingUpdated.isActive) {
        state.shoppingDetails = {} as Shopping;
      }
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      const {shopping_id, item_id, quantity} = action.payload;
      const shoppingList = {...state.shoppingDetails};
      if (shoppingList.id === shopping_id) {
        const itemTodelete = shoppingList.items.find(
          item => item.id === item_id,
        );
        if (itemTodelete) {
          itemTodelete.ShoppingItem.quantity = quantity;
          state.shoppingDetails.items = shoppingList.items;
        }
      }
    });
    builder.addCase(deletedShopping.fulfilled, (state, action) => {
      const shoppingList = action.payload;
      state.shopping = shoppingList as unknown as Shopping[];
    });
  },
});

export default shoppingSlice.reducer;
