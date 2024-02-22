"use client";

import { useState } from "react";
import Footer from "../components/home/footer";
import Header from "../components/home/header";
import Functions from "../functions";

export default function Payment() {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => setChecked(!isChecked);
  return (
    <div data-theme="garden">
      <Header />
      <div className="mx-auto min-w-fit min-h-96">
        <div className="flex flex-row items-center justify-center space-x-1">
          <img className="size-8" src="/images/icons/security-shield.png" />
          <span className="font-semibold">Güvenli Ödeme</span>
        </div>
        <div className="flex flex-row justify-between py-4 p-8 bg-slate-200">
          <div className="flex flex-col">
            <div className="flex flex-row gap-10 bg-slate-400">
              <div className="card card-compact p-2 w-[300px] lg:40 xl:h-44 shadow-secondary shadow-[0_0_10px]">
                <div className="card-title text-secondary pl-2">
                  Teslimat Adresim
                </div>
                <div className="card-body">
                  <div className="">
                    {shortenText(
                      "Bilmemne mahallesi aslgfkhalsşjkfh aslişfkhsaşlkfhas aslfşkhsaşlfkhsaşl aslşkhfaşslkfhsa şlaskhflşaskhf Kadıköy/İstanbul"
                    )}
                  </div>
                </div>
                <div className="card-actions justify-end pr-2 pb-2">
                  <div className="btn btn-sm">Adres ekle/değiştir</div>
                </div>
              </div>
              <div className="card card-compact p-2 w-[300px] lg:40 xl:h-44 shadow-secondary shadow-[0_0_10px]">
                <div className="card-title text-secondary pl-2">
                  Fatura Adresim
                </div>
                <div className="card-body">
                  <div className="">
                    {shortenText(
                      "Bilmemne mahallesi aslgfkhalsşjkfh Kadıköy/İstanbul"
                    )}
                  </div>
                </div>
                <div className="card-actions justify-end pr-2 pb-2">
                  <div className="btn btn-sm">Adres ekle/değiştir</div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* //? Ödeme Detay kartı */}
          <div className="card w-72 md:w-[300px] lg:w-[300px] lg:min-h-80 lg:h-80 bg-white shadow-secondary shadow-[0_0_0_2px]">
            <div className="card-title py-3 justify-center">Ödenecek Tutar</div>
            <div className="card-body justify-between items-center">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                  <a className="font-semibold">Ürünler:</a>
                  {/* //! Seçilen ürünlerin fiyatını anlık olarak güncelle */}
                  <a className="font-semibold">Kargo ücreti:</a>
                  <div className="divider divider-secondary h-0" />
                  <h1 className="font-semibold">Toplam tutar + KDV:</h1>
                </div>
                <div className="flex flex-col items-end">
                  <a className="">200 TL</a>
                  <a className="">Alıcı öder</a>
                  <div className="divider divider-secondary h-0" />
                  <h1 className="">200 TL</h1>
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className={`checkbox 
                    `}
                    // ${effect ? "checkbox-warning stroke-2" : "checkbox-primary"}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <a
                    onClick={() => {
                      // document
                      //   .getElementById("distance_selling_contract")
                      //   .showModal();
                    }}
                    className={`label-text`}
                    // ${effect && "text-red-400"}
                  >
                    Mesafeli Satış Sözleşmesini onaylıyorum.
                  </a>
                </label>
              </div>
              <div className="card-actions justify-center">
                <a
                  className="btn btn-sm lg:btn-md bg-purple-600 text-white"
                  onClick={() => {}} //! kontrol işlemi ve belirlenen sayfaya veri gönderimi
                  href="/odeme" //! daha sonra kaldırılacak
                >
                  Siparişi Onayla
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  function shortenText(input) {
    var output = new Functions().shortenText(input, 80);

    return output;
  }
}
