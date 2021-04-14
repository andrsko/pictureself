import React from "react";
import { api } from "./api";

function App() {
  api.get("/").then((data) => {
    alert(data.message);
  });
  return <div></div>;
}

export default App;
