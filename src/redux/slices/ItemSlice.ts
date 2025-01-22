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
        state.items.push(action.payload);
      })
      .addCase(updatedItem.fulfilled, (state, action) => {
        const {id, updatedItemData} = action.payload;
        const itemIndex = state.items.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
          state.items[itemIndex] = {
            ...state.items[itemIndex],
            ...updatedItemData,
          };
        }
      })
      .addCase(deletedItem.fulfilled, (state, action) => {
        const itemIdToDelete = action.payload;
        const itemIndex = state.items.findIndex(
          item => item.id === itemIdToDelete,
        );
        if (itemIndex !== -1) {
          state.items.splice(itemIndex, 1);
        }
      });
  },
});

export default itemSlice.reducer;
