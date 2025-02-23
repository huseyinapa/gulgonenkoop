"use client";

// Home.js (Sayfa bileşeni olarak kullanılıyor)
import React, { useEffect, useRef } from "react";
import Header from "./components/home/header";
import Store from "./components/home/store";
import Footer from "./components/home/footer";
import Product from "./components/home/product";

// Header component'i için interface ekleyelim
interface HeaderProps {
  onClick: (sectionId: string) => void;
}

// HeaderWrapper olarak yeniden adlandırıldı
const HeaderWrapper: React.FC<HeaderProps> = ({ onClick }) => {
  return <Header onClick={onClick} />;
};

export default function Home() {
  const scrollRef = useRef(null);

  const handleScrollToSection = (sectionId: string) => {
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
      <HeaderWrapper onClick={handleScrollToSection} />
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
