import { useState } from "react";
import useSWR from "swr";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import CarsDropdown from "./CarsDropdown";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Average price of car models by brand",
    },
  },
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const BrandPrice = () => {
  const [brand, setBrand] = useState("Fiat");

  const { data, error } = useSWR(
    `http://127.0.0.1:8000/cars/brand/price/${brand}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const chartData = {
    labels: data.map((item) => {
      return item["_id"]["model"];
    }),
    datasets: [
      {
        label: brand,
        data: data.map((item) => Math.round(item.avgPrice)),
        hoverBackgroundColor: ["#FF9999"],
      },
    ],
  };

  return (
    <div className="w-full my-5 shadow-md">
      <h1 className=" text-red-700 font-bold text-center">
        Price by model for a given brand
      </h1>

      <div className=" w-full text-center">
        <CarsDropdown
          selectHandler={(event) => setBrand(event.target.value)}
          elValue={brand}
        />
      </div>

      <div className="p-5 min-w-full">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BrandPrice;
