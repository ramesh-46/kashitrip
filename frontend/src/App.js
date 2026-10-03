import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import Trip from "./Trip";
import Places from "./Places";
import Expenses from "./Expenses";
import Calculator from "./Calculator";
import Members from "./Members";

function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        KASHI <span>YATRA</span>
      </Link>

      <div style={styles.links}>
        <Link
          to="/"
          style={
            location.pathname === "/"
              ? styles.active
              : styles.link
          }
        >
          Home
        </Link>

        <Link
          to="/trip"
          style={
            location.pathname === "/trip"
              ? styles.active
              : styles.link
          }
        >
          Trip
        </Link>

        <Link
          to="/places"
          style={
            location.pathname === "/places"
              ? styles.active
              : styles.link
          }
        >
          Places
        </Link>

        <Link
          to="/expenses"
          style={
            location.pathname === "/expenses"
              ? styles.active
              : styles.link
          }
        >
          Expenses
        </Link>

        <Link
          to="/calculator"
          style={
            location.pathname === "/calculator"
              ? styles.active
              : styles.link
          }
        >
          Calculator
        </Link>

        <Link
          to="/members"
          style={
            location.pathname === "/members"
              ? styles.active
              : styles.link
          }
        >
          Members
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/places" element={<Places />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  navbar: {
    minHeight: "70px",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 6%",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "3px",
  },

  logoSpan: {
    fontWeight: "400",
  },

  links: {
    display: "flex",
    gap: "26px",
    alignItems: "center",
  },

  link: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "14px",
  },

  active: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
    borderBottom: "2px solid #fff",
    paddingBottom: "5px",
  },
};

export default App;