import { LISTING_DATA } from "../../Constant/Constant";
export default (state = [], action) => {
  switch (action.type) {
    case LISTING_DATA:
      const data = state ? [...state, ...action.payload] : action.payload;
      return data;
    default:
      return state;
  }
};
