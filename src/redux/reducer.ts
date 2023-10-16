import {combineReducers} from '@reduxjs/toolkit';
import itemsReducer from './ItemsSlice';

const rootReducer = combineReducers({
  items: itemsReducer,
  //recipes: recipesReducer,
});
export default rootReducer;
