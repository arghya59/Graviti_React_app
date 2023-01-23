import React from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: '100%',
  height: '100%'
};

// logo location
const logo = "./Graviti Logo 1.png"

function App() {
  return (
    <>
      <Navbar imgSrc={logo} />
      <Container />
    </>
  )
}

export default App;
