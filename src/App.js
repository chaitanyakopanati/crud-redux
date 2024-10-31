import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Country from "./component/Country/Country";
import State from "./component/Stste/State";
import City from "./component/City/City";
import "./style.css";
import Country_Form from "./component/Country/Country_Form";
import State_Form from "./component/Stste/State_Form";
import City_Form from "./component/City/City_Form";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/country" element={<Country />} />
            <Route path="/state" element={<State />} />
            <Route path="/city" element={<City />} />
            <Route path="/country_form" element={<Country_Form />} />
            <Route path="/country_form/:id" element={<Country_Form />} />
            <Route path="/state_form" element={<State_Form />} />
            <Route path="/state_form/:id" element={<State_Form />} />
            <Route path="/city_form" element={<City_Form />} />
            <Route path="/city_form/:id" element={<City_Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
