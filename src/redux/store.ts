import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import productSlice from "./productSlice";
import authReducer from "./authSlice"; // Add the authSlice

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: authReducer, // Add the authReducer
    products: productSlice, // Add the authReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch