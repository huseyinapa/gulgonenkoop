import React from "react";
import Header from "../components/home/header";
import Footer from "../components/home/footer";

const Contact = () => {
  return (
    <main data-theme="garden">
      <title>S.S. Gülgönen | İletişim</title>
      <Header />
      <h1 className="mt-3 text-center font-semibold text-2xl">İletişim</h1>



      {/* İçerik */}
      <div className="relative px-4 mx-auto lg:max-w-5xl mt-6 mb-6 space-y-2">
        <div>
          <h2 className="font-semibold mb-2">Kooperatif Bilgileri:</h2>
          <div className="space-y-2">
            <li>
              E-Mail:{" "}
              <a href="mailto:gulgonenkoop32@gmail.com" className="text-[#b64983]">
                gulgonenkoop32@gmail.com
              </a>
            </li>
            <li>Adres: Kasap, Cemal Paşa Cd. No:4, 32090 Gönen/Isparta</li>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Kooperatif Yetkili Kişileri:</h2>
          <div className="space-y-2">
            <li>Nazire Özsu:</li>
            <li>
              Telefon:{" "}
              <a href="tel:+905432872470" className="text-[#b64983]">
                +90 (543) 287 24 70
              </a>
            </li>
            <li>Zübeyde Kutlu:</li>
            <li>
              Telefon:{" "}
              <a href="tel:+905" className="text-[#b64983]">Eklenecek</a>
            </li>
          </div>
        </div>
      </div>
      {/* Arka Plan */}
      <div className="relative">
        <div className="absolute inset-0 z-10">
          <div className="grid grid-cols-2 -space-x-52">
            {/* Arka plan renkleri daha belirgin hale getirildi */}
            <div className="blur-[106px] h-72 bg-gradient-to-br from-[#d82685] to-[#d82685]/50"></div>
            <div className="blur-[106px] h-48 bg-gradient-to-r from-[#d82685] to-[#d82685]/20"></div>
          </div>
        </div>
        <div className="px-4 lg:max-w-5xl mx-auto my-3 text-left space-y-5">
          <p className="my-4">Son Güncelleme Tarihi: 4 Aralık 2024</p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
