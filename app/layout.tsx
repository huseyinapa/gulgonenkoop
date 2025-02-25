import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LoginModal from "./_components/modals/login";
import RegisterModal from "./_components/modals/register";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "S.S. Gülgönen Koop.",
  description: "S.S. Gülgönen Tarımsal Kalkınma Kooperatifi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <body data-theme="garden">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#8e4162",
              },
              iconTheme: {
                primary: "#8e4162",
                secondary: "#FFFAEE",
              },
            },
            error: {
              style: {
                border: "1px solid #cc060f",
                padding: "16px",
                color: "#000000",
              },
              iconTheme: {
                primary: "#cc060f",
                secondary: "#FFFAEE",
              },
            },
          }}
        />
        {children}
        <LoginModal />
        <RegisterModal />
      </body>
    </html>
  );
}
