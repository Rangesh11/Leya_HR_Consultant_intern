import { useState } from "react";
import { close, menu } from "../assets";
import { Link } from "react-router-dom";
import { vertexpixel } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex px-6 justify-between items-center navbar z-50">
      <img src={vertexpixel} alt="vertexpixel" className="w-[300px] h-[90px] -ml-10"/>
      {/* <p className="w-[124px] h-[32px] text-white text-4xl">Vertexpixel</p> */}

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active === "Home" ? "text-white" : "text-dimWhite"
          } mr-10`}
        >
          <Link to="/" onClick={() => setActive("Home")}>Home</Link>
        </li>
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active === "Works" ? "text-white" : "text-dimWhite"
          } mr-10`}
        >
          <Link to="/work" onClick={() => setActive("Works")}>Works</Link>
        </li>
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active === "Capabilities" ? "text-white" : "text-dimWhite"
          } mr-10`}
        >
          <Link to="/capabilities" onClick={() => setActive("Capabilities")}>Capabilities</Link>
        </li>
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active === "Contact" ? "text-white" : "text-dimWhite"
          } mr-0`}
        >
          <a href="#contact" onClick={() => setActive("Contact")}>Contact</a> {/* Update Link to "/contact" */}
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-10`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Home" ? "text-white" : "text-dimWhite"
              } mb-4`}
            >
              <Link to="/" onClick={() => setActive("Home")}>Home</Link>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Work" ? "text-white" : "text-dimWhite"
              } mb-4`}
            >
              <Link to="/work" onClick={() => setActive("Works")}>Works</Link>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Capabilities" ? "text-white" : "text-dimWhite"
              } mb-4`}
            >
              <Link to="/capabilities" onClick={() => setActive("Capabilities")}>Capabilities</Link>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Contact" ? "text-white" : "text-dimWhite"
              } mb-0`}
            >
              <a href="#contact" onClick={() => setActive("Contact")}>Contact</a> {/* Update Link to "/contact" */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
