import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../Slice/index'

const store = configureStore({reducer : {products : productsReducer}});

export default store;