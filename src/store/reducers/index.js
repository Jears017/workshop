import {combineReducers} from "redux";
import {orderReducer} from "./order";
import {loginReducer} from "./login";

export const rootReducer = combineReducers({
    order: orderReducer,
    login: loginReducer
})