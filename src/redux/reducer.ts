import {combineReducers} from '@reduxjs/toolkit';
import itemsReducer from './slices/ItemSlice';
import recipesReducer from './slices/RecipeSlice';

const rootReducer = combineReducers({
  items: itemsReducer,
  recipe: recipesReducer,
});
export default rootReducer;
