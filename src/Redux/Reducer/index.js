import { combineReducers } from "redux";
import LISTING_DATA from "../Reducer/listingReducer"
const reducers = combineReducers({
    listingData:LISTING_DATA
 });
  
 export default reducers