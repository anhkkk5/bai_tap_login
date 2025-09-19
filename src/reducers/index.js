// Import function để kết hợp các reducers
import { combineReducers } from "redux";

// Import reducer quản lý đăng nhập
import loginReducer from "./authen";

// Kết hợp tất cả reducers thành một root reducer
const allReducers = combineReducers({
  loginReducer,
});

export default allReducers;
