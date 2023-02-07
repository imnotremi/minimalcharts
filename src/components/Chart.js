/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState, useContext } from "react";
import { CryptoContext } from "./../context/CryptoContext";

import {
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const CustomTooltip = ({ active, payload, label, currency = "usd" }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="label text-sm text-black">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }

  return null;
};

const ChartComponent = ({ chartData, type, currency }) => {
  return (
    <ResponsiveContainer height="90%">
      <AreaChart data={chartData}>
        <defs >
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop  offset="0%" stopColor="#000000" stopOpacity={0.7}/>
              <stop  offset="100%" stopColor="#000000" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <Area
          type="category"
          dataKey={type}
          stroke="#000"
          strokeWidth={"2px"}
          legendType={"line"}
          dot={false}
          fill="url(#color)"
        />
        <XAxis dataKey="date" hide  />
        <YAxis dataKey={type} domain={["auto", "auto"]} hide />
        <Legend />
        <CartesianGrid stroke="" />
        <Tooltip
          cursor={false}
          content={<CustomTooltip />}
          wrapperStyle={{ outline: "none" }}
          currency={currency}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState(null);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(14);
  const { currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);

        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [`${type}`]: item[1],
          };
        });
        // console.log(data);
        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id);
  }, [id, type, days]);

  return (
    <div className="w-full  h-[60%]">
      <ChartComponent chartData={chartData} type={type} currency={currency} />
      <div className="flex md:flex-nowrap flex-wrap">
        <button
          onClick={() => setType("prices")}
          className={`text-sm py-0.5 px-1.5 ml-2 ${
            type === "prices"
              ? "bg-[#0dd7ff] text-[#00a2ff]"
              : "bg-gray-100 text-gray-100"
          } rounded bg-opacity-25`}
        >
          Price
        </button>
        <button
          onClick={() => setType("market_caps")}
          className={`text-sm py-0.5 px-1.5 ml-2 ${
            type === "market_caps"
              ? "bg-[#0dd7ff] text-[#00a2ff]"
              : "bg-gray-100 text-gray-100"
          } rounded bg-opacity-25`}
        >
          Market Cap
        </button>
        <button
          onClick={() => setType("total_volumes")}
          className={`text-sm py-0.5 px-1.5 ml-2 ${
            type === "total_volumes"
              ? "bg-[#0dd7ff] text-[#00a2ff]"
              : "bg-gray-100 text-gray-100"
          } rounded bg-opacity-25`}
        >
          Total Volumes
        </button>
        <button
          onClick={() => setDays(14)}
          className={`text-sm py-0.5 px-1.5 ml-2 ${
            days === 14 ? "bg-[#0dd7ff] text-[#00a2ff]" : "bg-gray-100 text-gray-100"
          } rounded bg-opacity-25 md:mt-0 mt-2`}
        >
          14d
        </button>
        <button
          onClick={() => setDays(30)}
          className={`text-sm py-0.5 px-1.5 ml-2 ${
            days === 30 ? "bg-[#0dd7ff] text-[#00a2ff]" : "bg-gray-100 text-gray-100"
          } rounded bg-opacity-25 md:mt-0 mt-2`}
        >
          30d
        </button>
        <button
          onClick={() => setDays(200)}
          className={`text-sm py-0.5 px-1.5 ml-2 ${
            days === 200 ? "bg-[#0dd7ff] text-[#00a2ff]" : "bg-gray-100 text-gray-100"
          } rounded bg-opacity-25 md:mt-0 mt-2`}
        >
          200d
        </button>
      </div>
    </div>
  );
};

export default Chart;
