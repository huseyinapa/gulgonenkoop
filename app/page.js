"use client";

// Home.js (Sayfa bileşeni olarak kullanılıyor)
import React, { useRef } from "react";
import Header from "./components/home/header";
import Store from "./components/home/store";
import Footer from "./components/home/footer";
import Product from "./components/home/product";
import RegistrationModal from "./components/home/modals/register";
import LoginModal from "./components/home/modals/login";
import { Toaster } from "react-hot-toast";

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
    <main data-theme="garden" className="min-w-fit">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header onClick={handleScrollToSection} />
      {/* Bölüm 1 */}
      <section id="home">
        <Store />
      </section>

      <section id="products">
        <Product />
      </section>

      <Footer />

      <RegistrationModal />
      <LoginModal />
    </main>
  );
}
