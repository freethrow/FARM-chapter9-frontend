// fetcher for SWR
import { useState } from "react";
import useSWR from "swr";
import Card from "./Card";
import CarsDropdown from "./CarsDropdown";

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
    <div className="w-full p-8 my-10">
      <h1 className="font-bold text-lg text-center p-8 border border-gray-500">
        Explore Cars
      </h1>
      <div className="">
        <CarsDropdown
          selectHandler={(event) => {
            setBrand(event.target.value);
            setPageIndex(1);
          }}
          allCars={true}
        />

        {pageIndex > 1 ? (
          <button
            className=" bg-green-600 text-white font-bold p-3 m-1 rounded-md"
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Previous
          </button>
        ) : (
          <></>
        )}
        <button
          className=" bg-green-600 text-white font-bold p-3 m-1 rounded-md"
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <div className="flex flex-row justify-center items-center">
          Brand:{" "}
          <span className=" font-bold text-lg mx-2 text-gray-500">
            {brand ? brand : "All brands"}
          </span>
          Page:{" "}
          <span className=" font-bold text-lg mx-2 text-gray-500">
            {pageIndex}
          </span>
        </div>
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
