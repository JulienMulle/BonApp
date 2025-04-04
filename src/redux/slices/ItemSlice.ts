import {createSlice} from '@reduxjs/toolkit';
import {
  fetchItems,
  deletedItem,
  updatedItem,
  createdItem,
} from '../actions/ItemsActions';
import {Item} from '../../interface/Interface';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [] as Item[],
    sortedItems: [] as Item[],
    editedItem: {} as Item,
    itemToQuantity: {} as Item,
    search: '',
    newItem: '',
    refreshing: false,
    isEditItemVisible: false,
    isItemFormVisible: false,
    isEdit: false,
  },
  reducers: {
    openedEdtionItem: state => {
      state.isEdit = true;
    },
    closeEditionItem: state => {
      state.isEdit = false;
    },
    openEditItemModal: state => {
      state.isEditItemVisible = true;
    },
    closeEditItemModal: state => {
      state.isEditItemVisible = false;
    },
    openItemFormModal: state => {
      state.isItemFormVisible = true;
    },
    closeItemFormModal: state => {
      state.isItemFormVisible = false;
    },
    searchItem: (state, action) => {
      state.search = action.payload;
    },
    setItemToQuantity: (state, action) => {
      state.itemToQuantity = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setNewItem: (state, action) => {
      state.newItem = action.payload;
    },
    clearNewItem: state => {
      state.newItem = '';
    },
    setEdition: (state, action) => {
      state.editedItem.name = action.payload;
    },
    setEditItem: (state, action) => {
      state.editedItem = action.payload;
    },
    clearEditedItem: state => {
      state.editedItem = {} as Item;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.refreshing = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.refreshing = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, state => {
        state.refreshing = false;
      })
      .addCase(createdItem.fulfilled, (state, action) => {
        const newItem = action.payload;
        const itemExist = state.items.some(item => item.id === newItem.id);
        if (!itemExist) {
          state.items.push(newItem);
        }
      })
      .addCase(updatedItem.fulfilled, (state, action) => {
        const updatedItemData = action.payload;
        state.items = state.items.map(item =>
          item.id === updatedItemData.id ? updatedItemData : item,
        );
      })
      .addCase(deletedItem.fulfilled, (state, action) => {
        const itemIdToDelete = action.payload;
        state.items = state.items.filter(item => item.id !== itemIdToDelete);
      });
  },
});

export default itemSlice.reducer;
