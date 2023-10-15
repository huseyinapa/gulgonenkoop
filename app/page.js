"use client";

// Home.js (Sayfa bileşeni olarak kullanılıyor)
import React, { useRef } from "react";
import Header from "@/components/home/header";
import Store from "@/components/home/store";
import Footer from "@/components/home/footer";

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

  return (
    <main data-theme="garden">
      {/* Header */}
      <Header onClick={handleScrollToSection} />
      {/* Bölüm 1 */}
      <section id="home">
        <Store />
      </section>

      {/* Bölüm 2 */}
      <section id="product">{/* <Store /> */}</section>
      <Footer />
    </main>
  );
}
