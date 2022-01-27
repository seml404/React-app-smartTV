import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstScreen from "../FirstScreen/FirstScreen";
import SecondScreen from "../SecondScreen/SecondScreen";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" exact element={<FirstScreen />}></Route>
          <Route path="/second" exact element={<SecondScreen />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
