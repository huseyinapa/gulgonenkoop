import React from "react";

export default function Store() {
  return (
    <div className="relative justify-center">
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
        <div className="blur-[106px] h-72 bg-gradient-to-br from-[#d82685c2] to-[#d8268557]"></div>
        <div className="blur-[106px] h-48 bg-gradient-to-r from-[#d82685c2] to-[#d8268557]"></div>
      </div>
      <div className="mx-auto py-5 max-w-3xl px-6 md:px-12 xl:px-6">
        <h1 className="mt-5 text-5xl text-center tracking-wide">
          <span className="animate-text bg-gradient-to-r from-[#a0155f] via-[#d82685c2] to-[#d8268539] bg-clip-text text-transparent font-bold">
            GülGönen Tarımsal Kalkınma
          </span>
        </h1>
        <h1 className="mt-4 mb-10 text-4xl text-center text-[#bc4c81] font-semibold">
          <span>Kooperatifi</span>
        </h1>
        <h1 className="text-center">
          <span>
            Doğal kaynakların ve topraklarımızın verimini en üst düzeye çıkarmak
            amacıyla bir araya gelen çiftçilerin birliğidir. Biz,
            topraklarımızın bereketini sizinle paylaşıyor ve bu topraklardan
            elde edilen ürünlerimizi gurur ve sevgiyle sunuyoruz.
          </span>
        </h1>
        <div className="divider my-16"></div>
        <h1 className="text-xl text-center">
          <span className="font-medium">Kooperatifimize bir göz atalım!</span>
        </h1>
      </div>
      <div className="mx-auto mt-5 bg-pink-100 justify-center items-center max-w-xs md:max-w-3xl xl:max-w-6xl h-96"></div>
    </div>
  );
}
