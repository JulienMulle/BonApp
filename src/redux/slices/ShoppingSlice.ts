import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item, ItemWithShop, Shopping} from '../../interface/Interface';
import {
  associationItem,
  createShopping,
  deletedAssociation,
  editShopping,
  fetchAllShopping,
  fetchShopping,
  updateQuantity,
} from '../actions/ShoppingActions';
import {RootState} from '../store';

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    activeShoppingList: {} as Shopping,
    shopping: [] as Shopping[],
    sortedAllShopping: [] as Shopping[],
    newShopping: {} as Shopping,
    shoppingDetails: {} as Shopping,
    editedShopping: {} as Shopping,
    refreshing: false,
    isFormVisible: false,
    isQuantityModalVisible: false,
    itemToQuantity: {} as ItemWithShop,
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
      console.log(action.payload, 'slice shopping');
      state.itemToQuantity = action.payload;
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
      state.activeShoppingList = action.payload;
      state.refreshing = false;
    });
    builder.addCase(fetchShopping.pending, state => {
      state.refreshing = true;
    });
    builder.addCase(fetchShopping.rejected, state => {
      state.refreshing = false;
    });
    builder.addCase(associationItem.fulfilled, (state, action) => {
      const {shopping_id, item_id, quantity} = action.payload;
      const activeShopping = state.shopping.find(
        shop => shop.isActive === true,
      );
      const item = state.itemToQuantity;
      if (activeShopping) {
        const existingItem = activeShopping.items.find(
          item => item.item_id === item_id,
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          activeShopping.items.push({
            name: item.name,
            shopping_id: shopping_id,
            item_id: item_id,
            quantity: quantity,
          });
        }
      }
      console.log(activeShopping.items);
    });
    builder
      .addCase(editShopping.fulfilled, (state, action) => {
        const updatedShopping = action.payload;

        // Mettre à jour la liste de courses dans le tableau shopping
        const index = state.shopping.findIndex(
          shop => shop.id === updatedShopping.id,
        );
        if (index !== -1) {
          state.shopping[index] = updatedShopping;
        }

        // Si la liste de courses n'est plus active, mettre activeShoppingList à undefined
        if (!updatedShopping.isActive) {
          state.activeShoppingList = undefined;
        } else {
          // Sinon, mettre à jour activeShoppingList
          state.activeShoppingList = updatedShopping;
        }
      })

      .addCase(editShopping.rejected, (state, action) => {
        console.error(
          'Échec de la modification de la liste de courses :',
          action.payload,
        );
      });
    builder.addCase(deletedAssociation.fulfilled, (state, action) => {
      const {shopping_id, item_id} = action.payload;
      const shoppingToUpdate = state.shopping.find(
        shop => shop.id === shopping_id,
      );
      if (shoppingToUpdate) {
        shoppingToUpdate.itemList = shoppingToUpdate.itemList.filter(
          item => item.id !== item_id,
        );
      }
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      const {shopping_id, itemId, quantity} = action.payload;
      console.log(action.payload);
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
          item => item.item_id === itemId,
        );
        if (itemTodelete) {
          itemTodelete.ShoppingItem.quantity = quantity;
        }
      }
    });
  },
});

export default shoppingSlice.reducer;
