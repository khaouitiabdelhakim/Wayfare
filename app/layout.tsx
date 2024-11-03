import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: 'WayFare',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html suppressHydrationWarning lang="en">
      
      <head>
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black `}>
        <Providers>
          {children}
        </Providers>

        <Analytics/>
      </body>
    </html>
  );
}

import { Providers } from "./providers";import { Metadata } from "next";

