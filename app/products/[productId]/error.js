"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section class="h-screen relative z-10 bg-primary py-[120px] flex justify-center items-center">
      <div class="container mx-auto">
        <div class="-mx-4 flex">
          <div class="w-full px-4">
            <div class="mx-auto max-w-[400px] text-center">
              <h2 class="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                404
              </h2>
              <h4 class="mb-3 text-[22px] font-semibold leading-tight text-white">
                Oops! Ürün bulunamadı.
              </h4>
              <p class="mb-8 text-lg text-white">
                Aradığınız ürün belki kaldırılmış olabilir. Sayfayı yenilemeyi deneyin.
              </p>
              <a
                href="/products"
                class="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary"
              >
                Diğer ürünlere dön
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
        <div class="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
        <div class="flex h-full w-1/3">
          <div class="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div class="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
        <div class="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
      </div>
    </section>
  );
}
