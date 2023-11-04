import {createSlice} from '@reduxjs/toolkit';
import {Recipe} from '../../interface/Interface';
import {
  associationItemToRecipe,
  createdRecipe,
  deletedRecipe,
  fetchRecipe,
  fetchRecipes,
  removeAssociation,
  updatedRecipe,
} from '../actions/RecipesActions';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipes: [] as Recipe[],
    sortedRecipes: [] as Recipe[],
    newRecipe: {} as Recipe,
    editedRecipe: {} as Recipe,
    recipeDetails: {} as Recipe,
    refreshing: false,
    isEdit: false,
    isFormVisible: false,
    isDeleteModalVisible: false,
    isAssociationModalVisible: false,
    search: '',
  },
  reducers: {
    openedIsEdit: state => {
      state.isEdit = true;
    },
    closedIsEdit: state => {
      state.isEdit = false;
    },
    openedDeleteModal: state => {
      state.isDeleteModalVisible = true;
    },
    closeDeleteModal: state => {
      state.isDeleteModalVisible = false;
    },
    openAssociationModal: state => {
      state.isAssociationModalVisible = true;
    },
    closeAssociationModal: state => {
      state.isAssociationModalVisible = false;
    },
    openFormModal: state => {
      state.isFormVisible = true;
    },
    closeFormModal: state => {
      state.isFormVisible = false;
    },
    searchRecipe: (state, action) => {
      state.search = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRecipe: (state, action) => {
      state.editedRecipe = action.payload;
    },
    clearEditedRecipe: state => {
      state.editedRecipe = {} as Recipe;
    },
    setNewRecipe: (state, action) => {
      state.newRecipe = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.refreshing = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.refreshing = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, state => {
        state.refreshing = false;
      })
      .addCase(fetchRecipe.pending, state => {
        state.refreshing = true;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.refreshing = false;
        state.recipeDetails = action.payload;
      })
      .addCase(createdRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(updatedRecipe.fulfilled, (state, action) => {
        const {id, updatedRecipe} = action.payload;
        const recipeIndex = state.recipes.findIndex(recipe => recipe.id === id);
        if (recipeIndex !== -1) {
          state.recipes[recipeIndex] = {
            ...state.recipes[recipeIndex],
            ...updatedRecipe,
          };
        }
      })
      .addCase(deletedRecipe.pending, state => {
        state.refreshing = true;
      })
      .addCase(deletedRecipe.fulfilled, (state, action) => {
        const recpeToDelete = action.payload;
        const recipeIndex = state.recipes.findIndex(
          recipe => recipe.id === recpeToDelete,
        );
        if (recipeIndex !== -1) {
          state.recipes.splice(recipeIndex, 1);
        }
      })
      .addCase(deletedRecipe.rejected, state => {
        state.refreshing = false;
      })
      .addCase(associationItemToRecipe.fulfilled, (state, action) => {
        const {recipeId, item} = action.payload;
        const recipeToUpdate = state.recipes.find(
          recipe => recipe.id === recipeId,
        );
        if (recipeToUpdate) {
          recipeToUpdate.items.push(item);
        }
      })
      .addCase(removeAssociation.fulfilled, (state, action) => {
        const {recipeId, item} = action.payload;
        const recipeToEdit = state.recipes.find(
          recipe => recipe.id === recipeId,
        );
        if (recipeToEdit) {
          recipeToEdit.items.splice(item);
        }
      });
  },
});

export default recipeSlice.reducer;
