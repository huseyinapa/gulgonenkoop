"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import PayHeader from "./components/header";
import Footer from "../components/home/footer";
import BottomNavBar from "../components/bottomNavBar";

import Functions from "../functions";

export default function Payment() {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => setChecked(!isChecked);
  return (
    <div data-theme="garden" className="min-w-fit min-h-[500px]">
      <Toaster position="top-center" reverseOrder={false} />

      <PayHeader />
      <div className="mx-auto">
        {/* <div className="flex flex-row items-center justify-center space-x-1">
          <img className="size-8" src="/images/icons/security-shield.png" />
          <span className="font-semibold">Güvenli Ödeme</span>
        </div> */}
        <div className="flex flex-row items-start justify-center md:justify-between py-4 px-3 md:p-3 lg:p-8">
          <div className="flex flex-col items-center gap-5 mr-5 w-[350px] md:w-[470px] lg:w-[610px] xl:w-[700px] p-4">
            <div className="flex flex-col items-center justify-center md:flex-row gap-4">
              <div className="card p-2 w-[320px] md:w-[220px] lg:w-[280px] xl:w-[300px] h-[150px] md:h-48 lg:h-44 xl:h-44 shadow-secondary shadow-[0_0_10px]">
                <div className="card-title justify-center md:justify-start text-lg lg:text-xl text-secondary p-0 md:pl-2">
                  Teslimat Adresim
                </div>
                <div className="card-body p-0 pt-1 md:pt-2 pl-3">
                  <div className="text-sm lg:text-base">
                    {shortenText(
                      "Bilmemne mahallesi aslgfkhalsşjkfh asdfghjkl asfasf asdasfsdfgh Kadıköy/İstanbul"
                    )}
                  </div>
                </div>
                <div className="card-actions justify-end pr-2 pb-2">
                  <div className="btn btn-sm">Adres ekle/değiştir</div>
                </div>
              </div>
              <div className="card p-2 w-[320px] md:w-[220px] lg:w-[280px] xl:w-[300px] h-[150px] md:h-48 lg:h-44 xl:h-44 shadow-secondary shadow-[0_0_10px]">
                <div className="card-title justify-center md:justify-start text-lg lg:text-xl text-secondary p-0 md:pl-2">
                  Fatura Adresim
                </div>
                <div className="card-body p-0 pt-1 md:pt-2 pl-3">
                  <div className="text-sm lg:text-base">
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

            <div className="card pt-3 w-[320px] md:w-[450px] lg:w-[500px] xl:w-[620px] h-56 md:h-52 lg:h-48 xl:h-48 shadow-secondary shadow-[0_0_10px]">
              <div className="card-title px-3 md:p-0 md:pl-5 text-secondary text-center md:text-start text-lg lg:text-xl">
                Diğer Ödeme Seçenekleri (Havale, EFT)
              </div>
              <div className="card-body pl-5 p-0 pt-3">
                <div className="flex flex-col">
                  {transfer("Alıcı İsim/Soyisim: Merve Pektaş", "Merve Pektaş")}
                  {transfer(
                    "Iban: TR3746 9884 3673 44378",
                    "TR3746 9884 3673 44378"
                  )}
                  {/* {transfer("Banka: QNB Finansbank", "QNB Finansbank")} */}
                  <span> Banka: QNB Finansbank </span>
                  {transfer("Açıklama: XUW", "XUW")}
                </div>
              </div>
              <div className="card-actions justify-center md:justify-end py-3 md:p-3">
                <a className="text-sm">
                  <span className="mr-1 text-secondary">XUW</span>
                  kodunu açıklama kısmına yazınız.
                </a>
              </div>
            </div>
          </div>

          {/* //? Ödeme Detay kartı */}
          <div className="card hidden md:flex w-[230px] md:w-[250px] lg:w-[300px] md:h-[300px] lg:h-80 shadow-secondary shadow-[0_0_0_2px]">
            <div className="card-title md:text-lg pt-3 justify-center">
              Ödenecek Tutar
            </div>
            <div className="card-body p-0 px-1 lg:px-3 pt-2 justify-start items-center">
              {/* //! Seçilen ürünlerin fiyatını anlık olarak güncelle */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                  <a className="font-medium lg:font-semibold">Ürünler:</a>
                  <a className="">200 TL</a>
                </div>
                <div className="flex flex-row justify-between">
                  <a className="font-medium lg:font-semibold">Kargo ücreti:</a>
                  <a className="">Alıcı öder</a>
                </div>
                <div className="divider divider-secondary h-0" />
                <div className="flex flex-row justify-between">
                  <h1 className="font-medium lg:font-semibold">
                    Toplam tutar + KDV:
                  </h1>
                  <a className="">200 TL</a>
                </div>
              </div>
              {/* <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                  <a className="font-medium lg:font-semibold">Ürünler:</a>
                  <a className="font-medium lg:font-semibold">Kargo ücreti:</a>
                  <div className="divider divider-secondary h-0" />
                  <h1 className="font-medium lg:font-semibold">
                    Toplam tutar + KDV:
                  </h1>
                </div>
                <div className="flex flex-col items-end">
                  <a className="">200 TL</a>
                  <a className="">Alıcı öder</a>
                  <div className="divider divider-secondary h-0" />
                  <h1 className="">200 TL</h1>
                </div>
              </div> */}
              <div className="form-control">
                <label className="label cursor-pointer space-x-2">
                  <input
                    type="checkbox"
                    className={`checkbox 
                    `}
                    // ${effect ? "checkbox-warning stroke-2" : "checkbox-primary"}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <a
                    className={`label-text flex flex-col`}
                    // ${effect && "text-red-400"}
                  >
                    <span
                      className="text-secondary"
                      onClick={() => {
                        // document
                        //   .getElementById("distance_selling_contract")
                        //   .showModal();
                      }}
                    >
                      Mesafeli Satış Sözleşmesini
                    </span>
                    onaylıyorum.
                  </a>
                </label>
              </div>
            </div>
            <div className="card-actions justify-center p-4">
              <a
                className="btn btn-sm md:h-10 lg:btn-md bg-purple-600 text-white"
                onClick={() => {}} //! kontrol işlemi ve belirlenen sayfaya veri gönderimi
                href="/odeme" //! daha sonra kaldırılacak
              >
                Siparişi Onayla
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <BottomNavBar title={"Ödenecek Tutar"} sozlesme={true} />
    </div>
  );

  function shortenText(input) {
    var output = new Functions().shortenText(input, 75);

    return output;
  }
  function transfer(text, copyData) {
    return (
      <div className="flex flex-row items-center gap-2">
        <span> {text} </span>
        <img
          className="link size-5"
          src="images/icons/copy.png"
          onClick={() => {
            navigator.clipboard.writeText(copyData).then(() => {
              toast.success("Panoya kopyalandı.", {
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#8e4162",
                },
                iconTheme: {
                  primary: "#8e4162",
                  secondary: "#FFFAEE",
                },
              });
            });
          }}
        />
      </div>
    );
  }
}
