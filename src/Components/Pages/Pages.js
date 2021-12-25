import React, { useState } from "react";
import "./Pages.css";
import Card from "../Card/Card";
import axios from "axios";

const getCardData = (data, pageNo, maxRecords) => {
  const start = pageNo;
  const end = pageNo + (maxRecords - 1);
  return data.filter((elem, idx) => idx >= start && idx <= end);
};

const Pages = (props) => {
  const { search_data, query, keywords } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const pageinatedCardData = getCardData(search_data, currentPage, 3);

  const onPreviousHandler = () => {
    setCurrentPage((prevValue) => {
      return prevValue - 1;
    });
  };

  const onNextHandler = () => {
    setCurrentPage((nextValue) => {
      return nextValue + 1;
    });
  };

  return (
    <>
      <div className="page-container">
        <h2 data-testid="search-query">Search Results for {query}</h2>
        {pageinatedCardData.map((data) => {
          return <Card card_data={data} />;
        })}
        <button onClick={onPreviousHandler} disabled={currentPage === 0}>
          {"< Previous"}
        </button>
        <button
          disabled={currentPage === search_data.length}
          onClick={onNextHandler}
        >
          {"Next >"}
        </button>
        <h5>Related Searches</h5>
        <div className="keywords-section">
          {keywords
            .filter((e, idx) => idx < 10)
            .map((keyword) => {
              return <span>{keyword}</span>;
            })}
        </div>
      </div>
    </>
  );
};
export default Pages;
