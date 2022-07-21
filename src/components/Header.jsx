import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border border-black flex flex-row justify-around">
      <Link to="/">Cars</Link>

      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Header;
