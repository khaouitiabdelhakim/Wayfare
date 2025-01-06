"use client";

import "node_modules/react-modal-video/css/modal-video.css";
import "../../styles/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Providers>
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 h-screen z-100 bg-gray-800 text-white fixed lg:relative">
            <UserSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64 lg:ml-0 bg-gray-100">
            <UserHeader userId={1}/>
            <div className=" p-4" style={{paddingTop:90}}>{children}</div>
          </main>
        </div>
      </Providers>
    </div>
  );
}

import { Providers } from "./providers";
import AdminSidebar from "@/components/Admin/AdminSideBar";import AdminHeader from "@/components/Admin/AdminHeader";
import UserHeader from "@/components/User/UserHeader";
import UserSidebar from "@/components/User/UserSideBar";

