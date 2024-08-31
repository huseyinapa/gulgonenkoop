"use client";

// Home.js (Sayfa bileşeni olarak kullanılıyor)
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/home/header";
import Store from "./components/home/store";
import Footer from "./components/home/footer";
import Product from "./components/home/product";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const scrollRef = useRef(null);

  const handleScrollToSection = (sectionId) => {
    if (typeof document !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <main data-theme="garden" className="min-w-fit">
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

      <Header onClick={handleScrollToSection} />
      {/* Bölüm 1 */}
      <section id="home">
        <Store />
      </section>

      <section id="products">
        <Product />
      </section>

      <Footer />
    </main>
  );
}
