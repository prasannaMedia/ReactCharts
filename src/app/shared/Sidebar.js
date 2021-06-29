import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/dashboard", state: "dashboard" },
      { path: "/profiles", state: "profiles" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    const admin = false;
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html">
            <img
              src={require("../../assets/images/Pronote.png")}
              style={{ height: "50px", width: "50px" }}
              alt="logo"
            />
          </a>
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <img src={require("../../assets/images/Pronote.png")} alt="logo" />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-category">
            <span className="nav-link">
              <a>Navigation</a>
            </span>
          </li>
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <a>Dashboard</a>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/profiles")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/profiles">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title">
                <a>profiles</a>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
