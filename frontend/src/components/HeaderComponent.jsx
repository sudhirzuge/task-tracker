import React from "react";

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="http://localhost:3000/tasks">
            Task Tracker Application
          </a>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
