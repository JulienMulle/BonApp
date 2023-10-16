import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});
export type rootState = ReturnType<typeof store.getState>;

export default store;
