"use client";

import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    
      <div>
        <Providers>
          <UserHeader />
          {children}
          <Footer />
        </Providers>
      </div>
  );
}

import { Providers } from "./providers";
import UserHeader from "@/components/Team/UserHeader";

