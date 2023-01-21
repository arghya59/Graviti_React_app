import React from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";


// logo location
const logo = "./Graviti Logo 1.png"

function App() {
  return <>
    <Navbar imgSrc={logo}/>
    <Container/>
  </>
}

export default App;
