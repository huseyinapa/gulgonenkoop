"use client";

import OrderManager from "@/app/utils/order";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function OrderDetails({ order: initialOrder }: { order: any }) {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    setOrder(initialOrder);
  }, [initialOrder]);

  const cancelOrder = async (orderId: any) => {
    try {
      let cancelOrderForm = new FormData();
      cancelOrderForm.append("orderId", order.orderId);
      cancelOrderForm.append("status", "4");
      const cancelledOrder = await new OrderManager().cancelOrder(
        cancelOrderForm as any
      );

      if (cancelledOrder) {
        toast.success(`${order.orderId} siparişiniz iptal edilmiştir!`);
        setOrder((prevOrder: any) => ({ ...prevOrder, status: "4" }));
      } else {
        toast.error("İptal işlemi gerçekleştirilemedi.");
      }
    } catch (error) {
      toast.error("Beklenmedik bir sorun oluştur. Hata kodu: CO-8");
    }
  };

  function padZero(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  const date = new Date(parseInt(order.date));

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  let status = "";

  switch (order.status) {
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

  return (
    <div
      key={order.orderId}
      className="card flex flex-col mx-auto p-4 md:px-2 lg:px-0 justify-center items-center w-[400px] md:w-[400px] lg:w-[400px] h-[560px] md:h-[530px] lg:h-[530px] space-x-4 shadow-neutral shadow-[0_0_10px] rounded-lg"
    >
      <figure className="relative my-2">
        <Image
          src="/images/icons/shopping-bag.svg"
          alt="Ürün görseli"
          className="w-[370px] h-40 object-contain"
          width={20}
          height={20}
        />
        <a className="absolute top-0 right-0 btn btn-glass">
          Sipariş Detayları
        </a>
      </figure>
      <div className="card-body p-0 px-6 gap-0 flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-bold text-sm md:text-base">Sipariş Tarihi</h2>
            <a className="text-sm md:text-base">{formattedDate}</a>
          </div>
          <div className="divider md:w-auto divider-horizontal h-14"></div>

          <div className="flex flex-col">
            <h2 className="font-bold text-sm md:text-base">Ürün Detayları</h2>
            <a className="btn-link font-normal cursor-pointer text-sm md:text-base">
              Görmek için tıklayın
            </a>
          </div>
        </div>

        <div className="divider md:w-auto divider-vertical h-0" />

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-bold text-sm md:text-base">Kargo Firması</h2>
            <a className="font-normal text-sm md:text-base">Yurtiçi Kargo</a>
          </div>

          <div className="divider md:w-auto divider-horizontal h-14"></div>

          <div className="flex flex-col">
            <h2 className="font-bold text-sm md:text-base">Tutar</h2>
            <a className="font-normal text-sm md:text-base">
              {order.totalPrice}₺ (KDV Dahil)
            </a>
          </div>
        </div>

        <div className="divider md:w-auto h-0 divider-vertical" />

        <div className="mb-0">
          <h2 className="font-bold text-sm md:text-base">Teslimat Adresi</h2>
          <a className="font-normal text-sm md:text-base">
            {order.customer.address}
          </a>
        </div>
      </div>
      <div className="card-actions flex flex-row w-full justify-around">
        <div
          className={`btn
            ${order.status === "0" ? "" : "hidden"}
            rounded-md btn-error`}
          onClick={() => cancelOrder(order.orderId)}
        >
          İptal Et
        </div>
        <div
          className={`btn rounded-md pointer-events-none
          ${order.status === "0"
              ? "bg-gray-300"
              : order.status === "1"
                ? "bg-purple-400"
                : order.status === "2"
                  ? "bg-button-rose"
                  : order.status === "3"
                    ? "bg-green-500 text-white"
                    : "bg-red-600"
            }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
