// fetcher for SWR
import { useState } from "react";
import useSWR from "swr";
import Card from "./Card";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [brand, setBrand] = useState("");

  const { data, error } = useSWR(
    `http://127.0.0.1:8000/cars?page=${pageIndex}&brand=${brand}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <select
        onChange={(event) => {
          setBrand(event.target.value);
          setPageIndex(1);
        }}
      >
        <option value="">All cars</option>
        <option value="Fiat">Fiat</option>
        <option value="Opel">Opel</option>
        <option value="Renault">Renault</option>
        <option value="VW">VolksWagen</option>
        <option value="Ford">Ford</option>
      </select>
      <div>
        {pageIndex > 1 ? (
          <button
            className=" bg-green-600 text-white font-bold p-3 m-3"
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Previous
          </button>
        ) : (
          <></>
        )}
        <button
          className=" bg-green-600 text-white font-bold p-3 m-3"
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {data.map((car) => (
          <Card car={car} key={car._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
