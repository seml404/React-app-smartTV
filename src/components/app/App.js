import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstScreen from "../FirstScreen/FirstScreen";
import SecondScreen from "../SecondScreen/SecondScreen";
import ThirdScreen from "../ThirdScreen/ThirdScreen";
import ThirdScreenSlider from "../ThirdScreenSlider/ThirdScreenSlider";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route exact path="/" element={<FirstScreen />}></Route>
          <Route path="/second/" element={<SecondScreen />}></Route>
          <Route path="/third/" element={<ThirdScreen />}></Route>
          <Route path="/third-slider/" element={<ThirdScreenSlider />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
