import { createStore,applyMiddleware  } from "redux";
import reducers from "../Redux/Reducer/index";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(
  reducers,{},
  composedEnhancer
);

export default store;
