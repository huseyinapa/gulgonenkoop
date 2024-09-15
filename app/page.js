"use client";

// Home.js (Sayfa bileşeni olarak kullanılıyor)
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/home/header";
import Store from "./components/home/store";
import Footer from "./components/home/footer";
import Product from "./components/home/product";

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

  useEffect(() => { }, []);

  return (
    <main data-theme="garden" className="min-w-fit">
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
