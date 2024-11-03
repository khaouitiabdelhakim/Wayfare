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
          <AdminHeader />
          {children}
          <Footer />
        </Providers>
      </div>
  );
}

import { Providers } from "./providers";import AdminHeader from "@/components/Admin/AdminHeader";
import Footer from "@/components/Footer";

