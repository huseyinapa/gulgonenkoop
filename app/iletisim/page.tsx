import React from "react";
import Header from "../_components/home/header";
import Footer from "../_components/home/footer";

const Contact = () => {
  return (
    <main data-theme="garden">
      <title>S.S. Gülgönen | İletişim</title>
      <Header />
      <h1 className="mt-3 text-center font-semibold text-2xl">İletişim</h1>

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
              <a href="" className="text-[#b64983]">Eklenecek</a>
            </li>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;
