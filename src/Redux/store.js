import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { postApi } from './getPosts'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(postApi.middleware),
});
export default store;