"use client";


import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



export default function Home() {

  const { push } = useRouter();

  useEffect(() => {
    // Redirect to /main when the component mounts
    push('/main');
  }, [push ]);

  // This page will never be rendered, as it immediately redirects
  return null;
  
}
