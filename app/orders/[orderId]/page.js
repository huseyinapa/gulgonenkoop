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

  const getStatusText = () => {
    let status = "";

    switch (order.status) {
      case "0":
        status = "onay bekliyor.";
        break;
      case "1":
        status = "onaylandı.";
        break;
      case "2":
        status = "kargoya verildi.";
        break;
      case "3":
        status = "teslim edildi.";
        break;
      case "4":
        status = "iptal edildi!";
        break;
      default:
        status = "Onay bekleniyor..";
        break;
    }
    return status;
  };

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
          <div className="flex flex-col w-[80%] lg:w-[70%] max-w-[1000px] min-h-[550px] md:h-96 lg:h-96 justify-start items-center bg-white border-2 border-rose-800 rounded-lg">
            {/* Sipariş Bilgi Bölümü */}
            <div className="w-[100%] lg:w-[100%] h-44 md:h-20 border-b-2 border-rose-800">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                {/* Sipariş Bilgi Bölümü */}
                <div className="flex w-[90%] lg:w-[65%] p-2 mt-2 md:mt-0 md:h-20 justify-around items-center">{/* border-r-2 border-rose-800 */}
                  <div className="flex flex-col items-center">
                    <span className="font-semibold md:text-base lg:text-md">
                      Sipariş Tarihi
                    </span>
                    <span className="font-normal md:text-sm lg:text-md">
                      {order.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold md:text-base lg:text-md">
                      Sipariş Kodu
                    </span>
                    <span className="font-normal md:text-sm lg:text-md">
                      {order.orderId}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold md:text-base lg:text-md">
                      Tahmini Teslimat
                    </span>
                    <span className="font-normal md:text-sm lg:text-md">
                      {order.date}
                    </span>
                  </div>
                </div>
                <div className="divider divider-vertical md:divider-horizontal w-[100%] md:w-[1.5px] h-[1.5px] md:h-20 bg-rose-800" />
                {/* Kargo Bölümü */}
                <div className="flex w-[30%] lg:w-[35%] md:h-20 justify-around items-center">
                  {/* <div className="flex flex-col items-center">
                      <span className="font-semibold">Tahmini Teslimat</span>
                      <span className="font-normal">{order.date}</span>
                    </div> */}
                  <div className="flex flex-col items-center">
                    <span className="font-semibold md:text-base lg:text-md">
                      Kargo Firması
                    </span>
                    <span className="font-normal md:text-sm lg:text-md">
                      Yurtiçi Kargo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-[95%] lg:w-[90%] justify-around md:justify-end items-center m-4 gap-2">
              <div className="btn btn-sm h-10 border-2 bg-rose-800 text-white">
                İade Talebi
              </div>
              <div className="btn btn-sm h-10 border-2 bg-rose-800 text-white">
                Fatura Görüntüle
              </div>
            </div>
            {/* Ürün Bölümü */}
            {order.items.map((item) => (
              <div
                key={item.id}
                className="relative flex w-[60%] md:w-[90%] h-[350px] md:h-36 justify-center md:justify-between items-start md:items-center pt-4 md:pt-0 pl-4 pr-4 mb-4 bg-pink-100 border-2 border-rose-800 rounded-lg"
              >
                {/* Ürün Bilgileri */}
                <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-4">
                  <div className="flex">
                    <img
                      src={item.image}
                      alt="gül"
                      className="size-36 md:size-28 object-cover rounded-lg bg-pink-300"
                    />
                  </div>
                  <div className="flex flex-col items-center md:items-start md:justify-between">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 justify-between">
                      <span className="font-normal">{item.amount} Adet</span>
                      <span className="font-normal md:hidden">|</span>
                      <span className="font-normal">
                        {item.size} {item.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row absolute md:right-10 bottom-3 items-end gap-4">
                  <div className="btn btn-sm w-32 border-2 bg-white border-rose-800">
                    <span className="font-semibold">Ürüne git</span>
                  </div>
                  <div className="btn btn-sm pointer-events-none w-32 border-2 bg-white border-rose-800">
                    <span className="font-semibold">
                      {item.price.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex w-[90%] lg:w-[90%] justify-end items-center m-4 gap-2">
              <span className="">
                Ürün islem_tarihi tarihinde{" "}
                <span className="font-semibold">{getStatusText()}</span>
              </span>
            </div>
          </div>

          {/* <OrderDetails order={order} /> */}
        </div>
      </div>
    </div>
  );
}
