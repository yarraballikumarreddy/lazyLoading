import React, { Component, Suspense, lazy } from "react";
import "./ListingPage.css";
import {PAGE_2,PAGE_3} from "../Constant/Constant"

import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getlistingDataFinal } from "../Service/imageService";
const LazyLoadingImage = lazy(() => import("./Lazyloading/lazyLoadingImage"));

class Listingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: [],
      hasMore: true,
    };
    this.myscroll = React.createRef();
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.setState({ listingData: this.props.listingData });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listingData !== this.props.listingData) {
      console.log(this.props.listingData);
      this.setState({ listingData: this.props.listingData });
    }
  }
  fetchData() {
    const { listingData } = this.state;
    const dataLength = listingData.length;
    if (dataLength >= 20 && dataLength < 40) {
      this.props.getlistingDataFinal(PAGE_2);
    } else if (dataLength >= 40 && dataLength <= 54) {
      debugger;
      this.props.getlistingDataFinal(PAGE_3);
      this.setState({ hasMore: false });
    } else {
      this.setState({ hasMore: false });
    }
  }
  // renderFallBackImage() {
  //   return (
  //     <img src="/Slices/placeholder_for_missing_posters.png" alt="fallback"></img>
  //   )
  // }
  render() {
    const { listingData, hasMore } = this.state;
    return (
      <InfiniteScroll
        dataLength={listingData.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={hasMore}
        // loader={<h4>Loading...</h4>}
      >
        <div className="listpageDatacontainer" ref={this.myscroll}>
          <div className="listpageData_Wrapper">
            {listingData.map((item, i) => {
              return (
                <Suspense fallback={<img src="/Slices/placeholder_for_missing_posters.png" alt="fallback"></img>}  key={i}>
                <LazyLoadingImage item={item}></LazyLoadingImage>
                </Suspense>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
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
  return {
    listingData: state.listingData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps, null)(Listingpage);
