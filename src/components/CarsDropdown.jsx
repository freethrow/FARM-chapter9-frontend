import React from "react";

const CarsDropdown = ({ selectHandler, allCars }) => {
  return (
    <select
      onChange={selectHandler}
      className="px-2 py-1 my-2 mx-2 rounded-lg form-select w-1/6"
    >
      {allCars && <option value="">All brands</option>}
      <option value="Fiat">Fiat</option>
      <option value="Opel">Opel</option>
      <option value="Renault">Renault</option>
      <option value="VW">VolksWagen</option>
      <option value="Ford">Ford</option>
      <option value="Honda">Honda</option>
      <option value="Toyota">Toyota</option>
    </select>
  );
};

CarsDropdown.defaultProps = {
  allCars: false,
};
export default CarsDropdown;
