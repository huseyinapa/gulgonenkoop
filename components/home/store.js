import React from "react";

const Store = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white min-h-screen flex flex-col justify-center py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Hoş Geldiniz, En İyi Alışveriş Deneyimi Sizi Bekliyor!
        </h1>
        <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Mağazamızda en yeni ve kaliteli ürünleri bulabilirsiniz. Size özel
          indirimlerimizi kaçırmayın!
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center animate__animated animate__fadeIn animate__delay-3s">
          <a
            href="#"
            className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors duration-300"
          >
            Mağazamızı Keşfet
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-blue-500 hover:bg-blue-600 border border-blue-500 rounded-lg transition-colors duration-300"
          >
            Sosyal Medyada Takip Et
          </a>
        </div>
        <div className="mt-8 animate__animated animate__fadeIn animate__delay-4s">
          <img
            src="/images/koop.jfif"
            alt="Mağaza Görseli"
            className="rounded-lg shadow-xl max-w-lg mx-auto"
          />
        </div>
      </div>
      <footer className="bg-blue-600 py-4 text-center">
        <p>&copy; 2023 E-Ticaret Mağazası</p>
      </footer>
    </div>
  );
};

export default Store;
