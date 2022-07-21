import React from "react";

const Card = ({ car }) => {
  const { make, brand, km, cm3, price, year } = car;

  return (
    <div className=" shadow-md rounded-md flex flex-col justify-center p-5">
      <div>
        {brand} - {make}
      </div>
      <div>{km} Km</div>
      <div>Price: {price} eur</div>
    </div>
  );
};

export default Card;
