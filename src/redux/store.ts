import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});

//export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type rootState = ReturnType<typeof store.getState>;

export default store;
