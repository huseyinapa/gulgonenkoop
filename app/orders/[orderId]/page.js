import OrderManager from "@/app/utils/order";
import OrderDetails from "./OrderDetails";

export function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

async function getOrderProduct(orderId) {
  try {
    const orderData = await new OrderManager().getOrderWithID(orderId);

    let order = {};

    const date = new Date(parseInt(orderData.date));

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    order = {
      orderId: orderData.orderId,
      status: orderData.status,
      totalPrice: orderData.totalPrice,
      customer: JSON.parse(orderData.customer),
      payment: JSON.parse(orderData.payment),
      items: JSON.parse(orderData.items),
      total: orderData.total,
      date: formattedDate,
    };

    console.log(order);

    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function Product({ params: { orderId } }) {
  console.log(orderId);

  const order = await getOrderProduct(orderId);

  if (order === null)
    return (
      <div className="min-h-screen">
        <div className="flex justify-center items-center h-screen">
          Geçersiz sipariş kimliği.
        </div>
      </div>
    );
  else
    return (
      <div className="min-h-screen">
        <title>GülGönen - Sipariş Detayı</title>

        <div className="mx-auto w-[96%] pt-5 text-lg breadcrumbs">
          <ul>
            <li>
              <a href="/">Ana Sayfa</a>
            </li>
            <li>
              <a href="/orders">Siparişlerim</a>
            </li>
            <li>
              <a className="font-semibold">{order.orderId}</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center items-center">
            <div className="flex lg:w-[70%] py-4 justify-start font-semibold text-xl text-rose-800">
              Sipariş Detayı
            </div>
            <div className="flex flex-col lg:w-[70%] lg:min-h-96 justify-start items-center bg-white border-2 border-rose-800 rounded-lg">
              {/* Sipariş Bilgi Bölümü */}
              <div className="lg:w-[100%] lg:min-h-20 border-b-2 border-rose-800">
                <div className="flex">
                  {/* Sipariş Bilgi Bölümü */}
                  <div className="flex lg:w-[65%] lg:min-h-20 justify-around items-center border-r-2 border-rose-800">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Sipariş Tarihi</span>
                      <span className="font-normal">{order.date}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Sipariş Kodu</span>
                      <span className="font-normal">{order.orderId}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Tahmini Teslimat</span>
                      <span className="font-normal">{order.date}</span>
                    </div>
                  </div>

                  {/* Kargo Bölümü */}
                  <div className="flex lg:w-[35%] lg:min-h-20 justify-around items-center">
                    {/* <div className="flex flex-col items-center">
                      <span className="font-semibold">Tahmini Teslimat</span>
                      <span className="font-normal">{order.date}</span>
                    </div> */}
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Kargo Firması</span>
                      <span className="font-normal">Yurtiçi Kargo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex lg:w-[90%] justify-end items-center m-4 gap-2">
                <div className="btn btn-sm h-10 border-2 bg-rose-800 text-white">
                  İade Talebi
                </div>
                <div className="btn btn-sm h-10 border-2 bg-rose-800 text-white">
                  Fatura Görüntüle
                </div>
              </div>
              {/* Ürün Bölümü */}
              <div className="relative flex lg:w-[90%] lg:min-h-36 justify-between items-center pl-4 pr-4 border-2 border-rose-800 rounded-lg">
                {/* Ürün Bilgileri */}
                <div className="flex justify-center gap-4">
                  <div className="flex">
                    <img
                      src={order.items[0].image}
                      alt="gül"
                      className="size-28 object-cover rounded-lg bg-pink-300"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="font-medium">{order.items[0].name}</span>
                    <div className="flex flex-col space-y-2 justify-between">
                      <span className="font-normal">
                        {order.items[0].amount} Adet
                      </span>
                      <span className="font-normal">
                        {order.items[0].size} {order.items[0].type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex absolute right-10 bottom-3 items-end gap-4">
                  <div className="btn btn-sm w-32 border-2 bg-white border-rose-800">
                    <span className="font-semibold">Ürüne git</span>
                  </div>
                  <div className="btn btn-sm pointer-events-none w-32 border-2 bg-white border-rose-800">
                    <span className="font-semibold">
                      {order.items[0].price.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <OrderDetails order={order} /> */}
          </div>
        </div>
      </div>
    );
}
