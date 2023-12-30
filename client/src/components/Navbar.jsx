import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    if (localStorage.getItem("apnavirsatoken") !== null) {
      localStorage.removeItem("apnavirsatoken");
    }
    navigate("/");
    // setIsLoggedIn(false);
  };

  let path;
  if (localStorage.getItem("apnavirsatoken") !== null) {
    path = "/admindashboard"
  } else {
    path = "/"
  }


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`border-2  bg-slate-400  sticky top-0 ${isScrolled ? "bg-blue-500 bg-opacity-80" : ""}`}
         style={{ fontFamily: "Roboto, sans-serif", zIndex: "100", transition: "background-color 0.3s ease-in-out" }}
      >
      <nav
        className={`min-h-[70px] min-w-screen flex justify-between  items-center bg-slate-700 sticky top-0 m-2 rounded-3xl ${isScrolled ? "bg-blue-500 bg-opacity-80" : ""
          }`}
        style={{ fontFamily: "Roboto, sans-serif", zIndex: "100", transition: "background-color 0.3s ease-in-out" }}
      >
        <Link to={`${path}`} className="text-white text-3xl font-extrabold ">
          {/* <img src={logo} alt="LOGO" className="h-14 w-60" /> */}
          LOGO
        </Link>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul
          className={`flex items-center text-white ${menuOpen ? "open" : "hidden"}`}
          style={{ fontSize: 18, fontWeight: 400 }}
        >
          <li className="p-3 rounded-[12px]">
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </NavLink>
          </li>
          <li className="p-3 rounded-[6px]">
            <NavLink to="/Services" onClick={() => setMenuOpen(false)}>
              Services
            </NavLink>
          </li>
          <li className="p-3 rounded-[6px]">
            <NavLink to="/Contact" onClick={() => setMenuOpen(false)}>
              Contacts
            </NavLink>
          </li>

          {(localStorage.getItem("apnavirsatoken") !== null) && (
            <li className="px-3 ">
              <button
                className=" bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded "
                onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        <style>
        {`
          .active {
            color: white;
            font-size: 1.1rem;
            font-weight: bold;
          }

          li:hover {
            font-weight: bold;
          }

          nav .menu {
            display: none;
            position: absolute;
            top: 1.25rem;
            right: 0.5rem;
            flex-direction: column;
            justify-content: space-between;
            width: 2.25rem;
            height: 2rem;
          }

          nav .menu span {
            height: 0.4rem;
            width: 100%;
            background-color: #fff;
            border-radius: 0.2rem;
          }

          .hidden,
          .open {
            display: flex;
          }

          @media (max-width: 650px) {
            nav .menu {
              display: flex;
  
            }

            nav {
              flex-direction: column;
              align-items: flex-start;
              // border:2px solid red;
              // padding-bottom:15px;
            }

            .hidden {
              display: none;
            }

            .open {
              display: flex;
              flex-direction: column;
            }

            nav ul li {
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>

      </nav>
    </div>
  );
};

export default Navbar;
