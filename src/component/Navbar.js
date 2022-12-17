import React from 'react'
import {
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";


const Navbar = () => {
 
  const location = useLocation();
  const history = useNavigate()
  console.log(location.pathname);
  const hangleLogout = ()=>{
    console.log("I am is logout");
    localStorage.clear('token');
    history("/");
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      CloudBook
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">
            About
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/">
                Action
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Another action
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Something else here
              </Link>
            </li>
          </ul>
        </li>
        
      </ul>
     { !localStorage.getItem("token")?<form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
       
        <Link className="btn btn-outline-primary mx-2" to={"/login"} type="submit">
          Login
        </Link>
        <Link className="btn btn-outline-primary" to={"/sign"} type="submit">
          Sign
        </Link>
      </form>: <button className="btn btn-outline-danger" onClick={hangleLogout} type="submit">
          Logout
        </button> }
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
