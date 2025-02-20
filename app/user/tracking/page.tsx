// app/user/tracking/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import React, { Suspense } from 'react';

const DynamicBusTracking = dynamic(() => import('@/components/BusTracking'), { ssr: false });

const BusTrackingPageContent = () => {
  const searchParams = useSearchParams(); // Access query parameters
  const busId = searchParams.get('busId'); // Get the busId from the query

  if (!busId) {
    return <div>Bus ID is missing in the URL.</div>; // Handle missing busId
  }

  return (
    <div>
      <h1>Bus Tracking</h1>
      <DynamicBusTracking busId={busId} /> {/* Pass busId as a prop */}
    </div>
  );
};

const BusTrackingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BusTrackingPageContent />
    </Suspense>
  );
};

export default BusTrackingPage;