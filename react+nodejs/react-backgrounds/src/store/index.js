/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-01 17:37:01
 * @LastEditors: peng
 * @LastEditTime: 2021-07-01 17:37:02
 */
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(reduxThunk));

export default store;
