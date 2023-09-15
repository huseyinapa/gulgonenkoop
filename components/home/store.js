import React from "react";
import Image from "next/image";

const Store = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 z-10 p-6">
        <h1
          className="text-2xl font-semibold"
          style={{
            fontFamily: "The Mumbai Sticker",
            color: "white",
            textShadow: "0px 0px 10px #FF00D6",
          }}
        >
          GülGönen
        </h1>
      </div>
      <header className="container mx-auto px-6 text-center py-12 relative z-10">
        <h1 className="text-5xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Kooperatifimize Hoş Geldiniz!
        </h1>
        <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Kooperatifimizde birlikte çalışarak en iyi sonuçları elde edebiliriz.
          Size özel fırsatları kaçırmayın!
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center animate__animated animate__fadeIn animate__delay-3s">
          <a
            href="#"
            className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors duration-300"
          >
            Hemen Katılın
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-blue-500 hover:bg-indigo-600 border border-blue-500 rounded-lg transition-colors duration-300"
          >
            Bizimle İletişime Geçin
          </a>
        </div>
      </header>
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center filter blur-lg"
          style={{
            backgroundImage: "url('/images/koop.jfif')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Store;
