import axios from "axios";
import { LISTING_DATA } from "../Constant/Constant";
export const getlistingDataFinal =
  (pageNumber) => async (dispatch) => {

    
    await axios
      .get(
        `http://localhost:3000/API/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`
      )
      .then((res) => {
        const data =
          res.data && res.data.page
            ? res.data.page["content-items"].content
            : [];
        dispatch({
          type: LISTING_DATA,
          payload: data,
        });
      });
  };
