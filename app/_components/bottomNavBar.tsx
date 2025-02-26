import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// interface’leri ve tipleri dilediğiniz gibi güncelleyebilirsiniz
interface CardItem {
  price: number;
  amount: number;
  [key: string]: any;
}

interface BottomNavBarProps {
  title: string;
  agreement: boolean;
  items: CardItem[];
  address: any;
  // Parent’tan prop olarak gelecek
  isChecked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  handlePayment: () => Promise<void>;
  orderProgress: boolean;
}

export default function BottomNavBar({
  title,
  agreement,
  items,
  address,
  isChecked,
  setChecked,
  handlePayment,
  orderProgress
}: BottomNavBarProps) {
  const router = useRouter();

  // Eyaleti parent’tan devraldık; local state yerine parent’ın isChecked değerini kullanıyoruz.
  const handleCheckboxChange = () => setChecked(!isChecked);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  // Mobil alt bara tıklandığında tetiklenecek ödeme akışı
  const handleMobilePayment = async () => {
    if (!isChecked) {
      return toast.error(
        '"Mesafeli Satış Sözleşmesini" onaylamanız gerekmektedir.'
      );
    }
    if (Object.keys(address).length === 0) {
      return toast.error("Teslimat adresini doldurunuz.");
    }
    // Kart bilgilerinin kontrolü Payment component’indeki paymentProgress içinden yapılıyorsa,
    // direkt handlePayment() diyerek oradaki akışı çalıştırabiliriz:
    await handlePayment();
  };

  return (
    <div className="sticky bottom-0 md:hidden">
      <div
        className={`btm-nav ${agreement ? "h-[220px]" : "h-[190px]"}
            items-start bg-white shadow-[0_0_10px] shadow-black`}
      >
        <div
          className={`flex flex-col ${agreement ? "h-[140px]" : "h-[110px]"}
            justify-center px-4 w-full
          `}
        >
          <div className="flex flex-row justify-between w-full">
            <div>
              <div className="text-lg font-bold">{title}</div>
              <div className="mt-2 space-y-1">
                <div className="flex flex-row gap-2">
                  <div className="text-sm font-semibold">Toplam (KDV dahil):</div>
                  <div className="text-sm font-semibold">{totalPrice} TL</div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="text-sm font-semibold">Kargo ücreti:</div>
                  <div className="text-sm font-semibold">Alıcı öder</div>
                </div>
              </div>
            </div>

            {/* Eger "agreement" true ise bu demektir ki "Mesafeli Satış Sözleşmesini" onaylıyoruz. */}
            {agreement ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  className="btn btn-sm h-10 bg-purple-600 text-white"
                  onClick={handleMobilePayment}
                  disabled={orderProgress}
                >
                  {orderProgress ? "İşlem yapılıyor..." : "Siparişi Onayla"}
                </button>
                <button
                  className="btn btn-sm bg-gray-300 text-white"
                  onClick={() => router.push("/cart")}
                >
                  Geri Dön
                </button>
              </div>
            ) : (
              // Örneğin ödeme sayfasına gitmek vs.
              <button
                className="btn btn-sm h-10 bg-success text-white"
                onClick={() => {
                  if (items.length > 0) {
                    const stringItems = JSON.stringify(items);
                    localStorage.setItem("selected.items", stringItems);
                    router.push("/payment");
                  } else {
                    toast.error("Sepette ürün bulunmuyor.");
                  }
                }}
              >
                Alışverişi tamamla
              </button>
            )}
          </div>

          {/* Sözleşme checkbox */}
          {agreement && (
            <div className="form-control items-center">
              <label className="label cursor-pointer space-x-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="label-text text-secondary">
                  Mesafeli Satış Sözleşmesini onaylıyorum.
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Alttaki navigasyon ikonları vs. */}
      <div className="btm-nav btm-nav-lg">
        <button> {/* icon */} </button>
        <button className="active"> {/* icon */} </button>
        <button> {/* icon */} </button>
      </div>
    </div>
  );
}
