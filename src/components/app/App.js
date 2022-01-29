import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstScreen from "../FirstScreen/FirstScreen";
import SecondScreen from "../SecondScreen/SecondScreen";
import ThirdScreen from "../ThirdScreen/ThirdScreen";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" exact element={<FirstScreen />}></Route>
          <Route path="/second" element={<SecondScreen />}></Route>
          <Route path="/third" element={<ThirdScreen />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
