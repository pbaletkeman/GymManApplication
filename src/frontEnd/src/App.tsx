import React from "react";
import "./App.css";
import { Excerise } from "./components/exercise/Exercise";
import { StepsMain } from "./components/steps/StepsMain";
import ThemeController from "./components/ThemeController";

function App() {
  return (
    <>
      <ThemeController />
      {/* <StepsMain /> */}
      <Excerise />
    </>
  );
}

export default App;
