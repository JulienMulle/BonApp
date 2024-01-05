import {combineReducers} from '@reduxjs/toolkit';
import itemsReducer from './slices/ItemSlice';
import recipesReducer from './slices/RecipeSlice';
import shoppingReducer from './slices/ShoppingSlice';

const rootReducer = combineReducers({
  items: itemsReducer,
  recipe: recipesReducer,
  shopping: shoppingReducer,
  //category: categoryReducer,
  //planning: planningReducer
});
export default rootReducer;
