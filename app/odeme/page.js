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
import PaymentManager from "../utils/payment/payment";
import UserService from "../utils/services/userService";
import OrderManager from "../utils/order";
import CartManager from "../utils/cart";
import ProductManager from "../utils/product";

import { useRouter } from "next/navigation";
import OrderID from "../utils/id/createOrderID";

export default function Payment() {
  const router = useRouter();

  const [isChecked, setChecked] = useState(false);
  const [isCollapseChecked, setCollapseChecked] = useState(false);

  const [items, setItems] = useState([]);
  const [address, setAddress] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [userData, setUserData] = useState({});

  const [userIp, setUserIp] = useState("");

  const cartManager = new CartManager();
  const orderManager = new OrderManager();
  const productManager = new ProductManager();
  const paymentManager = new PaymentManager();

  const handleCheckboxChange = () => setChecked(!isChecked);

  useEffect(() => {
    getIP();
    checkAddress();

    const selectedItems = localStorage.getItem("selected.items");
    const convertedItems = JSON.parse(selectedItems) || [];

    setItems(convertedItems);

    console.log(convertedItems);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getIP = async () => {
    const ip = (await axios.get("https://api.ipify.org/?format=json")).data.ip;
    setUserIp(ip);

    return ip;
  };

  function checkAddress() {
    if (Object.keys(address).length !== 0) return;

    const deliveryAddress = localStorage.getItem("delivery.address");

    const convertedAddress = JSON.parse(deliveryAddress) || [];

    setAddress(convertedAddress);
    return convertedAddress;
  }

  async function getUserInfo() {
    try {
      const thisIP = await getIP();
      const thisAddress = checkAddress() ?? address;

      const email = localStorage.getItem("email");
      const userID = localStorage.getItem("id");
      const userLastLogin = localStorage.getItem("last_login");
      const userDate = localStorage.getItem("date");

      if (!email || !userID || !userLastLogin || !thisAddress || !userDate) {
        console.log("Gerekli veriler eksik!");
        return toast.error("Gerekli veriler eksik. Yeniden giriş yapınız!");
      }

      const lastLogin = new Functions().DateTime(userLastLogin);
      const date = new Functions().DateTime(userDate);

      console.log(thisAddress);

      const userData = {
        ip: thisIP,
        ...thisAddress,
        id: userID,
        email: email,
        last_login: lastLogin,
        date: date,
      };

      console.log(userData);

      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.log(error);
      toast.error(
        "Bir sorun oluştu! Hata kodu: P-GUI Eğer sorun çözülmez ise Instagram üzerinden bize ulaşınız."
      );
    }
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      setPaymentData({
        ...paymentData,
        [name]: value.replace(/\D/g, "").slice(0, 16),
      });
    } else if (name === "expiryDate") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/^(.{2})/, "$1/");
      }
      setPaymentData({ ...paymentData, [name]: formattedValue });
    } else {
      setPaymentData({ ...paymentData, [name]: value });
    }
    // console.log(paymentData);
  };

  console.log(userData);

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
          <div className="flex flex-col items-center justify-center gap-5 w-[350px] md:w-[470px] lg:w-[610px] xl:w-[700px] p-4">
            <div className="card p-2 w-[320px] md:w-[450px] lg:w-[550px] xl:w-[620px] h-[180px] md:h-48 lg:h-44 xl:h-44 shadow-secondary shadow-[0_0_10px]">
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
              w-[110%] md:w-[110%] lg:w-[100%]
              ${!isCollapseChecked ? "bg-secondary-content" : "bg-base-200"}
              `}
            >
              <input
                type="radio"
                name="my-accordion-2"
                //! defaultChecked
                checked={!isCollapseChecked ? "checked" : ""}
                onChange={(status) => {
                  // console.log(status.target.name);
                  // console.log(status.target.checked);
                  setCollapseChecked(false);
                }}
              />
              <div className="collapse-title md:text-lg lg:text-xl font-medium">
                Kartla Öde
              </div>
              <div className="collapse-content">
                <div className="card pt-3 w-[320px] md:w-[450px] lg:w-[500px] xl:w-[620px] h-[380px] md:h-[240px] lg:h-[260px] xl:h-[250px] shadow-secondary shadow-[0_0_10px]">
                  <div className="card-title px-3 text-secondary md:text-start text-base md:text-lg lg:text-xl">
                    Kredi veya Banka kartı (Taksit desteklenmiyor)
                  </div>
                  <div className="card-body form-control p-0 items-center justify-center">
                    <div className="grid grid-cols-1 gap-3 md:gap-x-6 items-center justify-center">
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className="max-w-xs">
                          <label htmlFor="cardHolderName" className="label">
                            <span className="label-text text-neutral font-semibold text-md">
                              Kart Sahibi
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="İsim Soyisim"
                            id="cardHolderName"
                            name="cardHolderName"
                            className="input input-bordered text-neutral md:w-[190px] lg:w-[210px] max-w-xs md:h-10 lg:h-12"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="max-w-xs">
                          <label htmlFor="cardNumber" className="label">
                            <span className="label-text text-neutral font-semibold text-md">
                              Kart Numarası
                            </span>
                          </label>
                          <input
                            type="number"
                            placeholder="••••  ••••  ••••  ••••"
                            className="input input-bordered text-neutral md:w-[190px] lg:w-[210px] max-w-xs md:h-10 lg:h-12"
                            id="cardNumber"
                            name="cardNumber"
                            maxLength="19"
                            value={paymentData.cardNumber || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-center gap-4">
                        <div className="max-w-xs">
                          <label
                            htmlFor="expiryDate"
                            className="label text-neutral"
                          >
                            <span className="label-text text-neutral font-semibold text-md">
                              Son Kullanma Tarihi
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ay / Yıl"
                            className="input input-bordered text-neutral w-[100px] md:w-[190px] lg:w-[210px] max-w-xs md:h-10 lg:h-12"
                            id="expiryDate"
                            name="expiryDate"
                            maxLength="5"
                            value={paymentData.expiryDate || ""}
                            onChange={handleChange}
                            // onFocus={() => setIsCardFlipped(false)}
                          />
                        </div>
                        <div className="max-w-xs">
                          <label htmlFor="cvv" className="label">
                            <span className="label-text text-neutral font-semibold text-md">
                              CVV
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="CVC/CVV"
                            id="cvv"
                            name="cvv"
                            maxLength={3}
                            className="input input-bordered text-neutral w-[100px] md:w-[190px] lg:w-[210px] max-w-xs md:h-10 lg:h-12"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`collapse collapse-arrow
              w-[110%] md:w-[110%] lg:w-[100%]
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
                onClick={async () => {
                  const userInfo = await getUserInfo();

                  if (!isChecked) {
                    return toast.error(
                      '"Mesafeli Satış Sözleşmesini" onaylamanız gerekmektedir.'
                    );
                  } else if (Object.keys(address).length === 0) {
                    return toast.error("Teslimat adresini doldurunuz.");
                  } else if (
                    !paymentData.cardHolderName ||
                    paymentData.cardHolderName.trim() === ""
                  ) {
                    // setEffect(true);
                    return toast.error(
                      "Kredi kartı sahibi adı boş bırakılamaz."
                    );
                  } else if (
                    !paymentData.cardNumber ||
                    paymentData.cardNumber.length < 16 ||
                    paymentData.cardNumber.trim() === ""
                  ) {
                    // setEffect(true);
                    return toast.error(
                      "Kredi kartı numarası eksik yada boş, kontrol ediniz."
                    );
                  } else if (
                    !paymentData.expiryDate ||
                    paymentData.expiryDate.trim() === ""
                  ) {
                    // setEffect(true);
                    return toast.error("Son kullanma tarihi boş bırakılamaz.");
                  } else if (
                    !paymentData.cvv ||
                    paymentData.cvv.trim() === ""
                  ) {
                    // setEffect(true);
                    return toast.error("Kredi kartı cvv boş bırakılamaz.");
                  }
                  // else if (paymentData) {
                  //   return toast.error("Kart bilgileri eksik yada boş bırakılmış!");
                  // }

                  console.log(userInfo);

                  if (userData.ip === undefined) getIP();
                  if (userInfo === null)
                    return toast.error(
                      "Beklenmedik bir sorun oluştu. Hata: P-FLN"
                    );

                  console.log(address);

                  console.log(paymentData);

                  console.log(userData);
                  // Siparis onaylanirken indicator dondur

                  const stockControl = await checkStock(items);
                  // router.push(`/home?userid=test&orderid=testt`);

                  if (!stockControl) return;

                  const cartItems = JSON.stringify(items);
                  console.log(cartItems);

                  var paymentProcess = await new PaymentManager().request(
                    userData,
                    cartItems,
                    paymentData
                  );

                  console.log(paymentProcess.pay.data.status);
                  if (paymentProcess.pay.data.status === "success") {
                    // await cartManager.
                    console.log(paymentProcess);
                    fallingOutofCart(paymentProcess, items);
                    //* İlk olarak stok kontrolu sonrasında ödeme yapılacak eğer başarılı olursa stoktan düşüp order table a ekleyecek
                  }
                }}
                //! -kontrol işlemi ve belirlenen- sayfaya veri gönderimi
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

  async function checkStock(items) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      // console.log("element:", element);

      let checkProductForm = new FormData();
      checkProductForm.append("id", element.pid);
      var checkProduct = await productManager.getProduct(checkProductForm);

      if (checkProduct.stock < element.amount) {
        toast.error(
          "Sepetinizdeki ürünlerden bir kısmı stoklarımızda kalmamış, lütfen tekrar kontrol ediniz.",
          { duration: 5000 }
        );
        return false;
      }
      return true;
    }
  }

  async function fallingOutofCart(payData) {
    const id = localStorage.getItem("id");

    console.log(payData);

    const customer = {
      id: id,
      email: address.email,
      phone: address.phone,
      address: `${address.address} ${address.district}/${address.city} ${address.zipCode}`,
      contactName: `${address.name} ${address.surname}`,
    };

    const payment = {
      paymentId: payData.data.paymentId,
      conversationId: payData.data.conversationId,
      cardType: payData.data.cardType,
      cardFamily: payData.data.cardFamily,
      cardAssociation: payData.data.cardAssociation,
    };

    const customerify = JSON.stringify(customer);
    const paymentify = JSON.stringify(payment);
    const itemsify = JSON.stringify(items);

    // console.log(itemsify);items
    // console.log(JSON.parse(items));

    try {
      const generateOrderID = await new OrderID().orderIdentifier();

      let addOrderForm = new FormData();
      addOrderForm.append("orderId", generateOrderID);
      addOrderForm.append("status", "0"); // 0: Onay Bekleniyor
      addOrderForm.append("totalPrice", payData.data.price);
      addOrderForm.append("customer", customerify);
      addOrderForm.append("payment", paymentify);
      addOrderForm.append("items", itemsify);
      addOrderForm.append("total", payData.data.basketItems.length);
      addOrderForm.append("date", Date.now().toString());

      const orderResult = await orderManager.add(addOrderForm);

      if (orderResult) {
        //! Custom toast yapılıp siparişlerim sayfasına yönlendiricez
        toast.success(
          "Sipariş verildi. Siparişinizin onay durumunu Siparişlerim sayfasından kontrol edebilirsiniz.",
          { duration: 5000 }
        );

        for (let index = 0; index < items.length; index++) {
          const element = items[index];

          let cartProductForm = new FormData();
          cartProductForm.append("id", id);
          cartProductForm.append("pid", element.pid);
          var cartProduct = await cartManager.remove(cartProductForm);
          console.log(cartProduct);

          const newStock = checkProduct.stock - element.amount;

          let productStockForm = new FormData();
          productStockForm.append("id", element.pid);
          productStockForm.append("stock", newStock);
          var productStock = await productManager.fallingOutofStock(
            productStockForm
          );
          console.log(productStock);
        }
      } else {
        toast.error("Sipariş verilemedi");
        // console.log(orderResult);
        return;
      }
    } catch (error) {
      toast.error(`Bilinmeyen hata: Hata kodu: P-323`);
      console.log(error);
      //! Mongoya hata eklenebilir.
      //? ---Her Manager için ayrı model açılacak.---
    }
  }
}
