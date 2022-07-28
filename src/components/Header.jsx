import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed bg-white w-full">
      <div className="flex flex-row justify-center space-x-4 h-10 items-center text-red-800 font-bold text-lg">
        <Link to="/">Cars</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/report">Report</Link>
      </div>
    </div>
  );
};

export default Header;
