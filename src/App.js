import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import { PAGE_1, LOADING_MSG } from "./Constant/Constant";

import { getlistingDataFinal } from "./Service/imageService";
import { connect } from "react-redux";
const Header = lazy(() => import("../src/Components/Header/Header.js"));
const Listingpage = lazy(() => import("../src/Components/ListingPage.js"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: [],
    };
  }

  componentDidMount() {
    this.props.getlistingDataFinal(PAGE_1);
  }

  render() {
    return (
      <div>
        <Suspense fallback={<h2>{LOADING_MSG}</h2>}>
          <Header></Header>
        </Suspense>
        <Suspense
          fallback={
            <img
              src="/Slices/placeholder_for_missing_posters.png"
              alt="fallback"
              style={{ height: "10px", width: "100%" }}
              className="listpageDataImg"
            ></img>
            // <h2>{ LOADING_MSG}</h2>
          }
        >
          <Listingpage></Listingpage>
        </Suspense>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getlistingDataFinal: (pageNumber) =>
      dispatch(getlistingDataFinal(pageNumber)),
  };
};
const mapStateToProps = (state) => {
  return { listingData: state.listingData };
};
export default connect(mapStateToProps, mapDispatchToProps, null)(App);
