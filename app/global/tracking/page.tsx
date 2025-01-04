'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicBusTracking = dynamic(() => import('@/components/BusTracking'), { ssr: false });

const App = () => {
  const busId = 'BC1234'; // Replace with the actual bus ID you want to track
  return (
    <div>
      <h1>Bus Tracking</h1>
      <DynamicBusTracking busId={busId} />
    </div>
  );
};

export default App;
