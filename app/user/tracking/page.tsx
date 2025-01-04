import BusTracking from "@/components/BusTracking";
import React from "react";

const App = () => {
  const busId = 'BC1234'; // Replace with the actual bus ID you want to track
  return (
    <div>
      <h1>Bus Tracking</h1>
      <BusTracking busId={busId} />
    </div>
  );
};

export default App;
