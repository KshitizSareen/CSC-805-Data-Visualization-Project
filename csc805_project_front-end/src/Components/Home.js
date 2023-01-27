import React from "react";
import MapComponent from "./MapComponent";
import FiltersComponent from "./FiltersComponent";
// Set your mapbox access token here

// Viewport settings

// Data to be used by the LineLayer

function Home() {

  return (
    <div>
      <MapComponent />
      <FiltersComponent />
    </div>
  )
}

export default Home;