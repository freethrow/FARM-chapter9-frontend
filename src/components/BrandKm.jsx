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
import { Bar } from "react-chartjs-2";
import CarsDropdown from "./CarsDropdown";

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
      text: "Average km of car models by brand",
    },
  },
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const BrandKm = () => {
  const [brand, setBrand] = useState("Fiat");

  const { data, error } = useSWR(
    `http://127.0.0.1:8000/cars/brand/km/${brand}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const chartData = {
    labels: data.map((item) => {
      return item["_id"]["model"];
    }),
    datasets: [
      { label: brand, data: data.map((item) => Math.round(item.avgKm)) },
    ],
  };

  return (
    <div className="w-full shadow-md my-5">
      <h1 className=" text-red-700 font-bold text-center">
        Km by model for a given brand
      </h1>
      <div className=" w-full text-center">
        <CarsDropdown selectHandler={(event) => setBrand(event.target.value)} />
      </div>
      <div className="p-5 min-w-full">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BrandKm;
