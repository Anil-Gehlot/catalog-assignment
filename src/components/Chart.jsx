import { useEffect, useState } from "react";
import { getCoinsData } from "./helper"; 
import {  Area, XAxis, YAxis, CartesianGrid, Bar,Tooltip, ComposedChart } from "recharts";
import fsi from "../assets/fullscreen-image.png";
import ci from "../assets/comparison-image.png";

function Chart({ setCoinData }) {

  // This function formats numbers to include commas as separators. For example, 120000 becomes 1,20,000.
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // React state variables.
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState(365); 
  const [currentPrice, setCurrentPrice] = useState(0);

  // This function is used to fetch the coin data according to the selected time, to show the graph.
  const fetchCoinData = async (days) => {
    try {
      const data = await getCoinsData(days);
      setCoinData(data);
      console.log('Fetched Data:', data); 
      if (data && data.prices && data.volume) {
        const formattedData = data.prices.map((item, index) => ({
          price: item[1],
          reduced: item[1] * 0.1,
          volumes: data.volume[index][1] 
        }));
        setCurrentPrice(formattedData.at(-1).price);
        setData(formattedData);
      } else {
        console.error('Data or required fields are undefined');
      }
      setActiveButton(days);
    } catch (error) {
      console.error(error);
    }
  };

  // fetching coin data for the first time,  default 1 year.
  useEffect(()=>{
    fetchCoinData(365);
  },[])
  
  

  return (
    <div>
      <div className="action-container">
        <div className='fs-comp'>
          <div className="action-item">
            <img src={fsi} width={24} height={24} className="img" alt="Full Screen Icon" />
            <button className="fsiLabel"> Full Screen</button>
          </div>
          <div className="action-item">
            <img src={ci} width={24} height={24} className="img" alt="Compare Icon" />
            <button className="compare-img"> Compare</button>
          </div>
        </div>
        <div className='days-cont'>
          <button className={`days-btn ${activeButton === 1 ? 'active' : ''}`} onClick={() => fetchCoinData(1)}>1d</button>
          <button className={`days-btn ${activeButton === 3 ? 'active' : ''}`} onClick={() => fetchCoinData(3)}>3d</button>
          <button className={`days-btn ${activeButton === 7 ? 'active' : ''}`} onClick={() => fetchCoinData(7)}>1w</button>
          <button className={`days-btn ${activeButton === 30 ? 'active' : ''}`} onClick={() => fetchCoinData(30)}>1m</button>
          <button className={`days-btn ${activeButton === 182 ? 'active' : ''}`} onClick={() => fetchCoinData(182)}>6m</button>
          <button className={`days-btn ${activeButton === 365 ? 'active' : ''}`} onClick={() => fetchCoinData(365)}>1y</button>
          <button className={`days-btn ${activeButton === 'max' ? 'active' : ''}`} onClick={() => fetchCoinData(365)}>max</button>
        </div>
      </div>


      {/* Showing the Graph */}
      <div className={`Chart-container`} style ={{marginLeft: '-4%'}} >
        <div style={{color:"#6F7177", padding:"2px", zIndex:9999, fontSize:"20px" , marginLeft: "60px"} }></div>
        {data.length > 0 && (
          
          <ComposedChart width={800} height={300} data={data}>
            <defs>

              {/* showing linear gradient color below the graph */}
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8E7FF" stopOpacity={1} />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity={1} />
              </linearGradient>
            </defs>


            <CartesianGrid stroke="none" strokeDasharray='none' />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00308F"
              strokeWidth={"1"}
              fillOpacity={1}
              fill="url(#areaColor)"
            />

            {/* Bar is showing the dark bars at the bottom of the graph. */}
            <Bar
              dataKey="reduced"
              fill='#E6E8EB'
              barSize={50}
              width={740} height={31.34}
            />

            {/* This both are tick as False, means we are not showing the measurement of X-axis and Y-axis */}
            <XAxis dataKey="volumes" tick={false} />
            <YAxis tick={false} />
            
            {/* to show cuurent price and selected price */}
            <Tooltip position={{ x:780, y:90 }} content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { price } = payload[0].payload;
                return (
                  <div className="custom-tooltip" >
                    <p style={{ color: "white", backgroundColor: "#1A243A", fontSize: 18, padding: "2px 8px", borderRadius: "5px" }}>{formatNumber(price)}</p>
                    <p style={{color:"white", backgroundColor:"#4B40EE", padding:"2px 8px", borderRadius:"5px", marginTop:"30%"}}>{formatNumber(currentPrice)}</p>
                  </div>
                );
              }
              return null;
            }} />
          </ComposedChart>
        )}
      </div>
    </div>
  );
}

export default Chart;
