import React from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";

function LazyLoadingImage(props) {
  const { item } = props;
  const errorImage = (ev) => {
    return (ev.target.src = `/Slices/placeholder_for_missing_posters.png`);
  };
  return (
    <div className="listpageData_content" >
      <img
        src={`/Slices/${item["poster-image"]}`}
        loading="lazy"
        alt="…"
        style={{ height: "120px", width: "100%" }}
        onError={errorImage}
        className="listpageDataImg"
      ></img>
      <div className="listpageDataTitle">{item.name}</div>
    </div>
  );
}
export default LazyLoadingImage;
