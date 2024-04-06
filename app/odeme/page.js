"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import PayHeader from "./components/header";
import Footer from "../components/home/footer";
import BottomNavBar from "../components/bottomNavBar";

import Functions from "../functions";
import Product from "./components/items";
import AddressModal from "./components/addressModal";
import axios from "axios";

export default function Payment() {
  const [isChecked, setChecked] = useState(false);
  const [isCollapseChecked, setCollapseChecked] = useState(false);

  const [items, setItems] = useState([]);

  const [address, setAddress] = useState({});

  const [userIp, setUserIp] = useState("");

  const handleCheckboxChange = () => setChecked(!isChecked);

  useEffect(() => {
    const selectedItems = localStorage.getItem("selected.items");
    const convertedItems = JSON.parse(selectedItems) || [];

    setItems(convertedItems);

    checkAddress();
    getIP();
  }, []);

  const getIP = async () =>
    setUserIp((await axios.get("https://api.ipify.org/?format=json")).data.ip);

  function checkAddress() {
    if (Object.keys(address).length !== 0) return;

    const deliveryAddress = localStorage.getItem("delivery.address");

    const convertedAddress = JSON.parse(deliveryAddress) || [];

    setAddress(convertedAddress);
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  // console.log(address);

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
            <div className="card p-2 w-[320px] md:w-[450px] lg:w-[500px] xl:w-[620px] h-[150px] md:h-48 lg:h-44 xl:h-44 shadow-secondary shadow-[0_0_10px]">
              <div className="card-title justify-center md:justify-start text-lg lg:text-xl text-secondary p-0 md:pl-2">
                Teslimat Adresim
              </div>
              <div className="card-body p-0 pt-1 md:pt-2 pl-3">
                {Object.keys(address).length === 0 ? (
                  <div className="text-sm lg:text-base">Adres girilmemiş.</div>
                ) : (
                  <>
                    <div className="flex flex-row gap-4">
                      <div className="text-sm lg:text-base">
                        Müşteri Adı:{" "}
                        {shortenText(
                          `${address["name"]} ${address["surname"]}`
                        )}
                      </div>
                      <div className="text-sm lg:text-base">
                        {shortenText(`${address["identityNumber"]}`)}
                      </div>
                    </div>
                    <div className="text-sm lg:text-base">
                      {shortenText(
                        address["address"] ?? "Adres bilgileri bulunmuyor"
                      )}
                    </div>
                    <div className="text-sm lg:text-base">
                      {shortenText(`${address["district"]}/${address["city"]}`)}
                    </div>
                  </>
                )}
              </div>
              <div className="card-actions justify-end pr-2 pb-2">
                {Object.keys(address).length !== 0 && (
                  <a
                    className={`btn btn-sm btn-error text-secondary-content`}
                    onClick={() => {
                      setAddress({});
                      localStorage.removeItem("delivery.address");
                    }}
                  >
                    Adresi temizle
                  </a>
                )}
                <a
                  className={`btn btn-sm 
                    transition ease-out delay-150 duration-200
                    ${
                      Object.keys(address).length === 0
                        ? "bg-secondary text-secondary-content"
                        : ""
                    }
                    `}
                  onClick={() => {
                    document.getElementById("address_modal").showModal();
                  }}
                >
                  Adres ekle/değiştir
                </a>
              </div>
            </div>

            <div
              className={`collapse collapse-arrow
              ${!isCollapseChecked ? "bg-secondary-content" : "bg-base-200"}
              `}
            >
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked
                checked={!isCollapseChecked ? "checked" : ""}
                onChange={(status) => {
                  // console.log(status.target.name);
                  // console.log(status.target.checked);
                  setCollapseChecked(false);
                }}
              />
              <div className="collapse-title text-xl font-medium">
                Kartla Öde
              </div>
              <div className="collapse-content">
                <div className="card pt-3 w-[320px] md:w-[450px] lg:w-[500px] xl:w-[620px] h-56 md:h-52 lg:h-[250px] xl:h-[250px] shadow-secondary shadow-[0_0_10px]">
                  <div className="card-title px-3 md:p-0 md:pl-5 text-secondary text-center md:text-start text-lg lg:text-xl">
                    Kredi veya Banka kartı (Taksit desteklenmiyor.)
                  </div>
                  <div className="card-body form-control pl-5 p-0 pt-3">
                    <div className="flex flex-col">
                      <div className="max-w-xs">
                        <label htmlFor="cardHolderName" className="label">
                          <span className="label-text text-neutral font-semibold text-md">
                            Kart Sahibi
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="••••  ••••  ••••  ••••"
                          className="input input-bordered text-neutral w-auto max-w-xs h-10"
                          id="cardHolderName"
                          name="holdecardHolderNamerName"
                          // value={paymentData.cardNumber || ""}
                          // onChange={handleChange}
                        />
                      </div>
                      <div className="max-w-xs">
                        <label htmlFor="cardNumber" className="label">
                          <span className="label-text text-neutral-content font-semibold text-md">
                            Kart Numarası
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="••••  ••••  ••••  ••••"
                          className="input input-bordered text-neutral w-auto max-w-xs h-10"
                          id="cardNumber"
                          name="cardNumber"
                          maxLength="19"
                          // value={paymentData.cardNumber || ""}
                          // onChange={handleChange}
                        />
                      </div>
                      <div className="max-w-xs">
                        <label htmlFor="cardNumber" className="label">
                          <span className="label-text text-neutral-content font-semibold text-md">
                            Kart Numarası
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="••••  ••••  ••••  ••••"
                          className="input input-bordered text-neutral w-full max-w-xs"
                          id="cardNumber"
                          name="cardNumber"
                          maxLength="19"
                          // value={paymentData.cardNumber || ""}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`collapse collapse-arrow 
              ${isCollapseChecked ? "bg-secondary-content" : "bg-base-200"}
            
            `}
            >
              <input
                type="radio"
                name="my-accordion-2"
                checked={isCollapseChecked ? "checked" : ""}
                onChange={(status) => {
                  setCollapseChecked(true);
                }}
              />
              <div className="collapse-title text-xl font-medium">
                Diğer Ödeme Seçenekleri
              </div>
              <div className="collapse-content">
                <div className="card pt-3 w-[320px] md:w-[450px] lg:w-[500px] xl:w-[620px] h-56 md:h-52 lg:h-48 xl:h-48 shadow-secondary shadow-[0_0_10px]">
                  <div className="card-title px-3 md:p-0 md:pl-5 text-secondary text-center md:text-start text-lg lg:text-xl">
                    Havale, Fast, EFT
                  </div>
                  <div className="card-body pl-5 p-0 pt-3">
                    <div className="flex flex-col">
                      {transfer(
                        "Alıcı İsim/Soyisim: Merve Pektaş",
                        "Merve Pektaş"
                      )}
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
            </div>

            <Product products={items} />
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
                  <a className="">{totalPrice} TL</a>
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
                  <a className="">{totalPrice} TL</a>
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
                onClick={() => {
                  if (!isChecked) {
                    return toast.error(
                      '"Mesafeli Satış Sözleşmesini" onaylamanız gerekmektedir.'
                    );
                  } else if (Object.keys(address).length === 0) {
                    return toast.error("Teslimat adresini doldurunuz.");
                  }
                }} //! kontrol işlemi ve belirlenen sayfaya veri gönderimi
              >
                Siparişi Onayla
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <BottomNavBar
        title={"Ödenecek Tutar"}
        agreement={true}
        items={items}
        address={address}
      />

      <AddressModal setAddress={setAddress} />
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
