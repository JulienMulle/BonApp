import {createSlice} from '@reduxjs/toolkit';
import {Shopping} from '../../interface/Interface';
import {
  createShopping,
  deletedAssociation,
  fetchAllShopping,
} from '../actions/ShoppingActions';

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    shopping: [] as Shopping[],
    sortedAllShopping: [] as Shopping[],
    newShopping: {} as Shopping,
    shoppingDetails: {} as Shopping,
    editedShopping: {} as Shopping,
    refreshing: false,
    isFormVisible: false,
    search: '',
  },
  reducers: {},
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
    builder.addCase(deletedAssociation.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {shoppping_id, item_id} = action.payload;
      const shoppingToUpdate = state.shopping.findIndex(
        shop => shop.id === shoppping_id,
      );
      if (shoppingToUpdate !== -1) {
        state.shopping[shoppingToUpdate].items = state.shopping[
          shoppingToUpdate
        ].items.filter(item => item.id !== item_id);
      }
    });
  },
});

export default shoppingSlice.reducer;
