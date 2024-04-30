"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/home/header";
import Footer from "../components/home/footer";

import OrderManager from "../utils/order";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);

  const orderManager = new OrderManager();

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    // orders değiştiğinde yapılacak işlemler
    // toast(orders.length);
  }, [orders]);

  async function getOrders() {
    try {
      const id = localStorage.getItem("id");
      console.log(id);

      let getOrderForm = new FormData();
      getOrderForm.append("customerId", id);
      const orderData = await orderManager.getOrder(getOrderForm);

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

  if (!orders && orders.length === 0)
    return (
      <div className="mx-auto w-96 text-center h-32">
        Siparişiniz bulunmamaktadır.
      </div>
    );

  return (
    <main data-theme="garden" className="min-w-fit">
      <title>Kleopatra - Siparişlerim</title>

      <Toaster position="bottom-right" reverseOrder={false} />

      <Header />
      <div className="min-h-96">
        <h1 className="ml-10 mb-4 text-start font-bold text-2xl">
          Siparişlerim
        </h1>
        <div>
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
}

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

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return (
    <div
      key={data.orderId}
      className="relative mx-auto items-center lg:items-start mb-4 w-72 md:w-2/4 lg:w-5/6 flex flex-col lg:flex-row p-4 space-x-4 shadow-neutral shadow-[0_0_10px] rounded-lg"
    >
      <figure className="relative">
        <img
          src="/images/icons/shopping-bag.svg"
          alt="Ürün görseli"
          className="md:w-40 h-36 object-cover" //rounded-lg rounded-br-[80px]
        />
      </figure>
      {/* <div className="flex flex-col w-52">
        <div className="space-y-5">
          <h2 className="font-bold text-xl">Gül Reçeli</h2>
          <a className="font-normal">Gül Reçeli için uzun bir açıklama</a>
        </div>
      </div> */}
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col justify-between">
            <div className="">
              <h2 className="font-bold text-md">Sipariş Tarihi</h2>
              <a className="font-normal">{formattedDate}</a>
            </div>
          </div>
          <div className="divider w-40 md:w-auto md:divider-horizontal h-0 md:h-14"></div>
          <div className="flex flex-col justify-between">
            <div className="">
              <h2 className="font-bold text-md">Sipariş Detayları</h2>
              <a
                className="btn-link font-normal cursor-pointer"
                onClick={() => {
                  setDetails(data.items);

                  document.getElementById("my_modal_5").showModal();
                }}
              >
                Görmek için tıklayın
              </a>
            </div>
          </div>
          <div className="divider w-40 md:w-auto md:divider-horizontal h-0 md:h-14"></div>
          <div className="flex flex-col justify-between">
            <div className="">
              <h2 className="font-bold text-md">Kargo Detayları</h2>
              <a className="font-normal">PTT Kargo</a>
            </div>
          </div>
          <div className="divider w-40 md:w-auto md:divider-horizontal h-0 md:h-14"></div>
          <div className="flex flex-col justify-between">
            <div className="">
              <h2 className="font-bold text-md">Tutar</h2>
              <a className="font-normal">{data.totalPrice}₺ (KDV Dahil)</a>
            </div>
          </div>
        </div>
        <div className="divider w-40 md:w-auto h-0 md:h-14 md:divider-vertical"></div>
        <div className="mb-3 md:mb-0">
          <h2 className="font-bold text-md">Teslimat Adresi</h2>
          <a className="font-normal">{data.customer.address}</a>
        </div>
      </div>
      <div className="md:absolute md:bottom-0 right-4 space-x-3">
        <div
          className={`btn
            ${data.status === "0" ? "" : "hidden"}
            rounded-md md:rounded-t-md md:rounded-b-none btn-error`}
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
          className={`btn rounded-md md:rounded-t-md md:rounded-b-none
          ${
            data.status === "0"
              ? "bg-purple-300"
              : data.status === "1"
              ? "bg-purple-400"
              : data.status === "2"
              ? "bg-button-rose"
              : data.status === "3"
              ? "bg-neutral"
              : "bg-error"
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
