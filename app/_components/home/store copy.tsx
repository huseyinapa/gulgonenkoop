import Image from "next/image";
import React from "react";

const Store = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white min-h-screen flex flex-col relative">
      <div className="absolute top-1/2 left-10 z-10 p-6 text-white flex flex-col space-y-4 transform -translate-y-1/2">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-center">
            Kooperatifimizin Hikayesi
          </h2>
          <p className="text-lg">
            Kooperatifimiz 20 yıldan fazla bir süredir faaliyet göstermektedir.
            Amacımız çiftçilere destek sağlamak ve sürdürülebilir tarımı teşvik
            etmektir. Size özel fırsatlarımızı kaçırmayın!
          </p>
          <div className="space-y-4">
            <a
              href="#"
              className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors duration-300"
            >
              Daha Fazla Bilgi
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-blue-500 hover:bg-indigo-600 border border-blue-500 rounded-lg transition-colors duration-300"
            >
              Bizimle İletişime Geçin
            </a>
          </div>
        </div>
      </div>
      <div className="absolute top-10 right-20 z-10 p-6 text-white flex flex-col items-center space-y-4">
        <Image
          src="/images/ggkoop.png"
          alt="GG Koop"
          className="w-[450px] h-auto my-4 rounded-full object-contain"
          width={96}
          height={96}
        />
        <Image
          src="/images/ggkoop2.png"
          alt="GG Koop2"
          className="w-[450px] h-auto my-4 rounded-full object-contain"
          width={80}
          height={80}
        />
      </div>
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
