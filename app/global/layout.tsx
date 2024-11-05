"use client";

import "node_modules/react-modal-video/css/modal-video.css";
import "../../styles/index.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </div>
  );
}

import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

