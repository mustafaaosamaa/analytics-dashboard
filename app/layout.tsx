import type { Metadata } from "next";

import { StoreProvider } from "@/store/provider";
import { AuthInitializer } from "@/components/auth/AuthInitializer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Sales and users analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthInitializer>
            {children}
          </AuthInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}