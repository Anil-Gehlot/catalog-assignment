import React, { useEffect } from "react";
import { useState } from "react";
import { getCoinsData } from "./helper";
import PriceDisplay from "./PriceDisplay";
import Summary from "./Summary";
import Statistics from "./Statistics";
import Chart from "./Chart";
import Analysis from "./Analysis";
import Settings from "./Settings";

const Tabs = () => {

  // React state variables to track the current open Tab and the coin data according to selected time
  const [currentTab, setCurrentTab] = useState("chart");
  const [coinData, setCoinData] = useState(null);

  // fetching coin data asynchronously and adding updating the coin data.
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoinsData(1);
      setCoinData(data);
    };
    fetchData();
  }, []);

  // If tab is changed, so update the current Tab.
  const handleClick = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <>
    {/* displaying the current Rate  */}
      <div className="price-container">
        {coinData && (
          <PriceDisplay
            currentPrice={coinData.currentPrice}
            priceDifference={coinData.priceDifference}
            percentageChange={coinData.percentageChange}
            sign={coinData.sign}
          />
        )}
      </div>

        {/* All The Tabs */}
      <div className="tab-container">
        <button
          className={`tab-btn ${currentTab === "summary" ? "active" : ""}  `}
          onClick={() => handleClick("summary")}
        >
          Summary
        </button>

        <button
          className={`tab-btn ${currentTab === "chart" ? "active" : ""}  `}
          onClick={() => handleClick("chart")}
        >
          Chart
        </button>

        <button
          className={`tab-btn ${currentTab === "statistics" ? "active" : ""}  `}
          onClick={() => handleClick("statistics")}
        >
          Statistics
        </button>

        <button
          className={`tab-btn ${currentTab === "analysis" ? "active" : ""}  `}
          onClick={() => handleClick("analysis")}
        >
          Analysis
        </button>

        <button
          className={`tab-btn ${currentTab === "settings" ? "active" : ""}  `}
          onClick={() => handleClick("settings")}
        >
          Settings
        </button>

        {/* displaying the line just below the Tabs. */}
        <div className="line"></div>


        {/* Showing the content according to the selected Tab. */}
        <div
          className={`${
            currentTab === "summary" ? "show-content" : "tab-content"
          }`}
        >
          {currentTab === "summary" && <Summary />}
        </div>
        <div
          className={`${
            currentTab === "chart" ? "show-content" : "tab-content"
          }`}
        >
          {currentTab === "chart" && <Chart setCoinData={setCoinData} />}
        </div>
        <div
          className={`${
            currentTab === "statistics" ? "show-content" : "tab-content"
          }`}
        >
          {currentTab === "statistics" && <Statistics />}
        </div>
        <div
          className={`${
            currentTab === "analysis" ? "show-content" : "tab-content"
          }`}
        >
          {currentTab === "analysis" && <Analysis />}
        </div>
        <div
          className={`${
            currentTab === "settings" ? "show-content" : "tab-content"
          }`}
        >
          {currentTab === "settings" && <Settings />}
          </div>
      </div>
    </>
  );
};

export default Tabs;
