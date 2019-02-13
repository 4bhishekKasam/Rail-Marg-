import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <img
            className="navbar-brand"
            alt=""
            src="data:image/png;base64,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"
          />
          <a className="navbar-brand active" href="/">
            <h2>
              {" "}
              Rail
              <i>Marg</i>
            </h2>
          </a>
        </div>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <a className="text-dark nav-link" href="/searchtrain">
              SearchTrain
            </a>
          </li>
          <li className="nav-item">
            <a className="text-dark nav-link" href="/trainroute">
              Train Route
            </a>
          </li>
        </ul>
      </div>
      {/* <div
          class="container "
          style={{ border: "1px solid red" }}
        >
          <ul className="list-inline">
            <li className="list-inline-item align-bottom" >
              <a href="/" className="">
                Train Info
              </a>
            </li>
            <li className="list-inline-item align-bottom">
              <a href="/" className="">
                Train Route
              </a>
            </li>
          </ul>
        </div> */}
    </nav>
  );
}