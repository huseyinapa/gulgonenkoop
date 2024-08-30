"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/home/header";
import Footer from "../components/home/footer";

import OrderManager from "../utils/order";
import { useRouter } from "next/navigation";

export default function Order() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const orderManager = new OrderManager();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    getOrders();
    if (storedEmail) setIsLoggedIn(true);
    else router.push("/");
  }, []);

  // useEffect(() => {
  // orders değiştiğinde yapılacak işlemler

  // toast(typeof orders.length);
  // }, [orders]);

  async function getOrders() {
    try {
      const id = localStorage.getItem("id");
      console.log(id);

      let getOrderForm = new FormData();
      getOrderForm.append("customerId", id);
      const orderData = await orderManager.getOrder(getOrderForm);
      console.log(orderData);

      if (orderData === null) return;

      const orderArray = [];

      for (let i = 0; i < orderData.length; i++) {
        const order = orderData[i];

        let status = "";

        switch (order["status"]) {
          case "0":
            status = "Onay bekliyor";
            break;
          case "1":
            status = "Onaylandı";
            break;
          case "2":
            status = "Kargoda";
            break;
          case "3":
            status = "Teslim edildi";
            break;
          case "4":
            status = "İptal Edildi!";
            break;
          default:
            status = "Onay bekleniyor..";
            break;
        }

        orderArray.push({
          ...order,
          status: order["status"],
          statusText: status,
          payment: JSON.parse(order["payment"]),
          items: JSON.parse(order["items"]),
        });
      }

      orderArray.sort((a, b) => b.date - a.date);

      setOrders(orderArray);
    } catch (error) {
      console.log(error);
      toast.error("Beklenmedik bir sorun oluştur. Hata kodu: O-25");
    }
  }

  async function cancelOrder(orderId) {
    try {
      let cancelOrderForm = new FormData();
      cancelOrderForm.append("orderId", orderId);
      cancelOrderForm.append("status", "4");
      const cancelledOrder = await orderManager.cancelOrder(cancelOrderForm);

      if (cancelledOrder) getOrders();
      cancelledOrder
        ? toast.success(`${orderId} siparişiniz iptal edilmiştir!`)
        : toast.error("İptal işlemi gerçekleştirilemedi.");
      return cancelledOrder ? true : false;
    } catch (error) {
      toast.error("Beklenmedik bir sorun oluştur. Hata kodu: CO-8");
      return false;
    }
  }

  // if (orders.toString().includes("[]")) console.log("asd");

  return (
    <main data-theme="garden" className="min-w-fit">
      <title>GülGönen - Siparişlerim</title>

      <Header />
      <div className="min-h-screen">
        <div className="mx-auto w-[95%] h-20 m-4">
          <div className="text-lg breadcrumbs">
            <ul>
              <li>
                <a href="/">Ana Sayfa</a>
              </li>
              <li>
                <a className="font-semibold">Siparişlerim</a>
              </li>
            </ul>
          </div>
          <h1 className="text-start font-bold text-2xl">Siparişlerim</h1>
        </div>

        <div className="flex flex-wrap mx-auto px-8 justify-center sm:items-center md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              data={order}
              setDetails={setDetails}
              cancelOrder={cancelOrder}
            />
          ))}
        </div>
      </div>
      <Footer />

      <ModalDetails details={details} />
    </main>
  );

  function padZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  function OrderCard({ data, setDetails, cancelOrder }) {
    const date = new Date(parseInt(data.date));

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return (
      <div
        key={data.orderId}
        className="card flex flex-col mx-auto p-4 md:px-2 lg:px-0 justify-center items-center w-[400px] md:w-[400px] lg:w-[400px] h-[560px] md:h-[530px] lg:h-[530px] space-x-4 shadow-neutral shadow-[0_0_10px] rounded-lg"
      >
        <figure className="relative my-2">
          <img
            src="/images/icons/shopping-bag.svg"
            alt="Ürün görseli"
            className="w-[370px] h-40 object-contain" //rounded-lg rounded-br-[80px]
          />
          <a
            className="absolute top-0 right-0 btn btn-glass"
            href={`/orders/${data.orderId}`}
          >
            Sipariş Detayları
          </a>
        </figure>
        {/* <div className="flex flex-col w-52">
          <div className="space-y-5">
            <h2 className="font-bold text-xl">Gül Reçeli</h2>
            <a className="font-normal">Gül Reçeli için uzun bir açıklama</a>
          </div>
        </div> */}
        <div className="card-body p-0 px-6 gap-0 flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h2 className="font-bold text-sm md:text-base">Sipariş Tarihi</h2>
              <a className="text-sm md:text-base">{formattedDate}</a>
            </div>
            <div className="divider md:w-auto divider-horizontal h-14"></div>

            <div className="flex flex-col">
              <h2 className="font-bold text-sm md:text-base">Ürün Detayları</h2>
              <a
                className="btn-link font-normal cursor-pointer text-sm md:text-base"
                onClick={() => {
                  setDetails(data.items);

                  // router.push(`/orders/${data.orderId}`);
                  document.getElementById("my_modal_5").showModal();
                }}
              >
                Görmek için tıklayın
              </a>
            </div>
          </div>

          <div className="divider md:w-auto divider-vertical h-0" />

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h2 className="font-bold text-sm md:text-base">Kargo Firması</h2>
              <a className="font-normal text-sm md:text-base">PTT Kargo</a>
            </div>

            <div className="divider md:w-auto divider-horizontal h-14"></div>

            <div className="flex flex-col">
              <h2 className="font-bold text-sm md:text-base">Tutar</h2>
              <a className="font-normal text-sm md:text-base">
                {data.totalPrice}₺ (KDV Dahil)
              </a>
            </div>
          </div>

          <div className="divider md:w-auto h-0 divider-vertical" />

          <div className="mb-0">
            <h2 className="font-bold text-sm md:text-base">Teslimat Adresi</h2>
            <a className="font-normal text-sm md:text-base">
              {data.customer.address}
            </a>
          </div>
        </div>
        <div className="card-actions flex flex-row w-full justify-around">
          <div
            className={`btn
            ${data.status === "0" ? "" : "hidden"}
            rounded-md btn-error`}
            onClick={() => {
              cancelOrder(data.orderId);
            }}
            //! Modal açılacak emin misiniz falan filan (bu işlem geri alınamaz falan)
            //! Daha sonra bildirim gidecek işte
            //! Satıcıya da bildirmeyi unutma
          >
            İptal Et
          </div>
          <div
            className={`btn rounded-md
          ${
            data.status === "0"
              ? "bg-gray-300"
              : data.status === "1"
              ? "bg-purple-400"
              : data.status === "2"
              ? "bg-button-rose"
              : data.status === "3"
              ? "bg-green-500 text-white"
              : "bg-red-600"
          }
          pointer-events-none`}
            onClick={() => {}}
          >
            {data.statusText}
          </div>
        </div>
      </div>
    );
  }
}

function ModalDetails({ details }) {
  function multiplication(detail) {
    const total = detail.price * detail.amount;
    return total;
  }

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Ürünler</h3>

        <div className="py-4 h-auto space-y-4">
          {details.map((detail) => (
            <div className="flex flex-row space-x-4">
              <figure>
                <img src={detail.image} className="w-28 h-auto" />
              </figure>
              <div className="flex flex-col justify-between">
                <div className="">
                  <h2 className="font-bold text-lg">{detail.name}</h2>
                  <a className="font-normal">{detail.description}</a>
                </div>
                <h2 className="font-semibold text-md">
                  {`${detail.price}₺ x ${detail.amount} = 
                  ${multiplication(detail)}₺`}
                </h2>
              </div>
            </div>
          ))}
          {/* <div className="flex flex-row w-auto h-28 p-4 shadow-lg shadow-neutral rounded-lg">
              <figure>
                <img src={detail.image} className="w-20 h-20" />
              </figure>
              <div className="flex flex-row">
                <div>{detail.name}</div>
              </div> */}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Kapat</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
