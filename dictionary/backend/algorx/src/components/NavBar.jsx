import React from "react";
import AlgorxLogo from "../Assets/images/svg/AlgoRX_logo.svg";

export default function NavBar() {
  return (
    <div>
      <nav className="w-full bg-white flex h-20">
        <div className="w-full max-w-xs flex justify-between items-center p-3 ml-0 sm:ml-10">
          <img src={AlgorxLogo} height={20} width={150} alt="Algorx_Logo" />
        </div>
      </nav>
    </div>
  );
}
