import { useState } from "react";
import useSWR from "swr";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { interpolateGnBu } from "d3-scale-chromatic";

ChartJS.register(ArcElement, Tooltip, Legend);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ModelCount = () => {
  const [brand, setBrand] = useState("Fiat");
  const { data, error } = useSWR(
    `http://127.0.0.1:8000/cars/make/count/${brand}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const chartData = {
    labels: data.map((item) => {
      return item["_id"];
    }),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: data
          .map((item, index) => interpolateGnBu(index / data.length))
          .sort(() => 0.5 - Math.random()),
        borderWidth: 3,
      },
    ],
  };

  console.log(chartData);

  return (
    <div className="w-full my-5 shadow-md">
      <h1 className=" text-red-700 font-bold text-center">
        Number of vehicles by model for a given brand
      </h1>
      <select onChange={(event) => setBrand(event.target.value)}>
        <option value="Fiat">Fiat</option>
        <option value="Opel">Opel</option>
        <option value="Renault">Renault</option>
        <option value="VW">VolksWagen</option>
        <option value="Ford">Ford</option>
      </select>

      <div className="p-5 min-w-full">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ModelCount;
