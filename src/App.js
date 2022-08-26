import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreateUser from "./CreateUser";
import ViewUser from "./ViewUser";
import MainHeader from "./MainHeader";

function App() {
  return (
    <div className="App">
      <Router>
        <MainHeader />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/viewUser" element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
