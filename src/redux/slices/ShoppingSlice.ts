import {createSlice} from '@reduxjs/toolkit';
import {Shopping} from '../../interface/Interface';
import {deletedAssociation, fetchAllShopping} from '../actions/ShoppingActions';

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
    builder.addCase(deletedAssociation.fulfilled, (state, action) => {
      const {shoppingId, item} = action.payload;
      const shoppingToUpdate = state.shopping.find(
        shop => shop.id === shoppingId,
      );
      if (shoppingToUpdate) {
        shoppingToUpdate.items.splice(item);
      }
    });
  },
});

export default shoppingSlice.reducer;
