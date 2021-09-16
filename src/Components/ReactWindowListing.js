import React from "react";
import { FixedSizeList as List } from "react-window";
import { VariableSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
function ReactWindowListing(props) {
  const { hasNextPage, isNextPageLoading, loadNextPage, listingData } = props;
  const itemCount = hasNextPage ? listingData.length + 1 : listingData.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index) => !hasNextPage || index < listingData.length;

  // Render an item or a loading indicator.

  const Item = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "";
    } else {
      content = listingData[index];
    }

    return (
      <div style={style}>
        {content && (
          <div className="listpageData_content" key={index}>
            <img src={content.thumbnailUrl} className="listpageDataImg"></img>
            <div className="listpageDataTitle">{content.title}</div>
          </div>
        )}
      </div>
    );
  };

  const columnWidths = new Array(listingData.length)
  .fill(true)
    .map(() => 75 + Math.round(Math.random() * 50));
  
const rowHeights = new Array(listingData.length)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        // <List
        //   className="List"
        //   height={1000}
        //   itemCount={listingData.length}
        //   itemSize={150}
        //   onItemsRendered={onItemsRendered}
        //   ref={ref}
        //   width={"100%"}
        // >
        //   {Item}
        // </List>

        <Grid
          columnWidth={index => columnWidths[index]}
          rowHeight={index => rowHeights[index]}
          height={1000}
          width={300}
          columnCount={3}
          rowCount={listingData.length}
          // rowCount={4}
          ref={ref}
          // onItemsRendered={onItemsRendered}
        >
          
          {Item}
    
        </Grid>
      )}
    </InfiniteLoader>
  );
}

export default ReactWindowListing;
