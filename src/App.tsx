import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./component/Menu";
import { MyRouter } from "./router/MyRouter";
import "./App.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
