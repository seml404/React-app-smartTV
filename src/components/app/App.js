import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstScreen from "../FirstScreen/FirstScreen";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" exact element={<FirstScreen />}></Route>
          {/* <Route path="/" exact element={<FirstScreen />}></Route>
          <Route path="/" exact element={<FirstScreen />}></Route> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
