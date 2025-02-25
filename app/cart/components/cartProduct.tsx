"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import { useRouter } from "next/navigation";
import { CartItem } from "@/app/types/cart";
import Image from "next/image";

type CartProductProps = {
  setLength: (length: number) => void;
  cartProducts: any[];
  selectedItems: CartItem[];
  setSelectedItems: Dispatch<SetStateAction<CartItem[]>>;
};

function CartProduct({
  setLength,
  cartProducts,
  selectedItems,
  setSelectedItems,
}: CartProductProps) {
  const router = useRouter();

  // Yerel state'leri oluştururken prop isimleriyle karışmaması için farklı isimler kullandık.
  const [localSelected, setLocalSelected] = useState<CartItem[]>(selectedItems);
  const [localCartItems, setLocalCartItems] =
    useState<CartItem[]>(cartProducts);

  const cartManager = new CartManager();
  const productManager = new ProductManager();

  const handleDecreaseAmount = (itemId: string) => {
    setLocalSelected((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.pid === itemId
          ? {
            ...item,
            amount:
              (item.amount ?? 1) > 1
                ? (item.amount ?? 1) - 1
                : item.amount ?? 1,
          }
          : item
      )
    );

    setSelectedItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.pid === itemId
          ? {
            ...item,
            amount:
              (item.amount ?? 1) > 1
                ? (item.amount ?? 1) - 1
                : item.amount ?? 1,
          }
          : item
      )
    );

    setLocalCartItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.pid === itemId
          ? {
            ...item,
            amount:
              (item.amount ?? 1) > 1
                ? (item.amount ?? 1) - 1
                : item.amount ?? 1,
          }
          : item
      )
    );
  };

  const handleIncreaseAmount = async (itemId: string) => {
    const product = await productManager.getProduct(itemId);

    console.log(localSelected);

    setLocalSelected((prevItems: any[]) =>
      prevItems.map((item: any) =>
        item.pid === itemId
          ? {
            ...item,
            amount:
              product && item.amount < product.stock
                ? item.amount + 1
                : item.amount,
          }
          : item
      )
    );

    setSelectedItems((prevItems: any[]) =>
      prevItems.map((item: any) =>
        item.pid === itemId
          ? {
            ...item,
            amount:
              product && item.amount < product.stock
                ? item.amount + 1
                : item.amount,
          }
          : item
      )
    );

    console.log(localSelected);

    setLocalCartItems((prevItems: any[]) =>
      prevItems.map((item: any) =>
        item.pid === itemId
          ? {
            ...item,
            amount:
              product && item.amount < product.stock
                ? item.amount + 1
                : item.amount,
          }
          : item
      )
    );
  };

  console.log(localCartItems);

  async function handleRemoveItem(pid: string) {
    const id = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("id", id as string);
    formData.append("pid", pid as string);

    try {
      const updatedCartItems = localCartItems.filter((x) => x.pid !== pid);
      const updatedSelectedItems = selectedItems.filter((x) => x.pid !== pid);
      const updatedSelected = localSelected.filter((x) => x.pid !== pid);

      setLocalCartItems(updatedCartItems);
      setSelectedItems(updatedSelectedItems);
      setLocalSelected(updatedSelected);

      if (localCartItems.length <= 1) setLength(9991);

      const response = await cartManager.remove(formData);

      if (response) {
        toast.success("Ürün sepetinizden kaldırıldı!");
      } else {
        toast.error("Ürün sepetinizden kaldırılamadı.");
      }
    } catch (error) {
      toast.error("Beklenmedik bir sorun oluştu. Kod: C-CP");
      console.log(error);
    }
  }

  console.log(localSelected);

  const totalPrice = localSelected.reduce((total, item) => {
    return total + item.price * (item.amount ?? 1);
  }, 0);

  return (
    <div className="mx-auto min-w-fit md:min-w-full h-auto">
      <div className="mx-auto min-h-[550px] justify-center px-0 md:px-4">
        <div className="flex flex-row justify-center md:justify-between items-center space-x-6 mt-6">
          {/* Sepetteki ürün listesi */}
          <div>
            <div className="flex flex-row h-20 items-center justify-between">
              <h1 className="text-lg lg:text-2xl font-bold text-secondary">
                Sepetim ({localSelected.length} Ürün)
              </h1>
              <div className="form-control mr-3 items-center">
                <label className="cursor-pointer label space-x-2">
                  <span className="label-text font-medium lg:text-md">
                    Tümünü seç
                  </span>
                  <input
                    type="checkbox"
                    checked={localCartItems.length === localSelected.length}
                    className="checkbox checkbox-lg checkbox-secondary"
                    onChange={() => {
                      if (localCartItems.length === localSelected.length) {
                        setSelectedItems([]);
                        setLocalSelected([]);
                        return;
                      }
                      const arr = [...localCartItems];
                      setLocalSelected(arr);
                      setSelectedItems(arr);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex-wrap justify-center items-end gap-4 grid grid-cols-1">
              {localCartItems.map((item) => (
                <ProductCard product={item} key={item.pid} />
              ))}
            </div>
          </div>
          {/* Ödeme Detay Kartı */}
          <div className="card hidden md:flex w-72 md:w-[250px] lg:w-[300px] md:h-[250px] lg:h-80 bg-white shadow-secondary shadow-[0_0_0_2px]">
            <div className="card-title text-lg md:text-lg lg:text-2xl py-5 justify-center">
              Seçilen Ürünler ({localSelected.length})
            </div>
            <div className="card-body justify-between items-center p-0">
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
            </div>
            <div className="card-actions justify-center p-4">
              <a
                className="btn btn-sm md:h-10 lg:btn-md bg-success text-white"
                onClick={() => {
                  if (localSelected.length > 0) {
                    const stringItems = JSON.stringify(localSelected);
                    localStorage.setItem("selected.items", stringItems);
                    router.push("/payment");
                  } else {
                    toast.error(
                      "Alışverişini tamamlamak için sepetindeki satın almak istediğin ürünleri seçebilirsin."
                    );
                  }
                }}
              >
                Alışverişi tamamla
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Ürün kartı fonksiyonunu JSX olarak çağırıyoruz.
  function ProductCard({ product }: { product: any }) {
    console.log(product);
    return (
      <div
        key={product.pid}
        className="relative mx-auto bg-white items-stretch lg:items-start w-[350px] md:w-[450px] lg:w-[500px] xl:w-[700px] h-[140px] md:h-48 lg:h-48 xl:h-48 flex md:flex-row p-3 space-x-3 shadow-secondary shadow-[0_0_10px] rounded-lg"
      >
        <figure className="relative">
          <Image
            src={product?.image || "/images/icons/shopping-bag.svg"}
            alt="Ürün görseli"
            className="w-auto md:w-36 h-[100px] md:h-40 object-contain rounded-lg"
            width={20}
            height={20}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/images/icons/shopping-bag.svg";
            }}
          />
          <div className="absolute bg-secondary w-14 md:w-16 h-7 lg:h-8 place-content-center bottom-3 left-0 rounded-r-xl">
            <span className="pl-1.5 text-xs md:text-sm lg:text-base text-white font-bold">
              {product.size} {product.type}
            </span>
          </div>
        </figure>

        <div className="flex flex-col justify-between w-full lg:h-full">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-md lg:text-xl text-secondary">
                {product.name}
              </h2>
              <div className="flex flex-col mt-1 md:mt-2 lg:mt-3 space-y-1">
                <a className="font-normal text-xs md:text-sm">
                  {product.description}
                </a>
                <a className="font-normal text-xs md:text-sm">
                  Kargo firması: PTT Kargo
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-2">
              <div
                className="btn btn-white btn-sm w-11"
                onClick={() => handleRemoveItem(product.pid)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  className="stroke-secondary fill-current"
                >
                  <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
                </svg>
              </div>
              <input
                type="checkbox"
                checked={localSelected
                  .map((item) => item.pid)
                  .includes(product.pid)}
                className="checkbox checkbox-md md:checkbox-lg checkbox-secondary"
                onChange={() => {
                  if (
                    localSelected.map((item) => item.pid).includes(product.pid)
                  ) {
                    setLocalSelected(
                      localSelected.filter((item) => item.pid !== product.pid)
                    );
                    setSelectedItems(
                      localSelected.filter((item) => item.pid !== product.pid)
                    );
                  } else {
                    setLocalSelected([...localSelected, product]);
                    setSelectedItems([...localSelected, product]);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="btn-group shadow-lg bg-secondary rounded-2xl space-x-1">
              <button
                className="btn btn-xs lg:btn-sm btn-ghost btn-circle bg-secondary text-white transition hover:opacity-75"
                onClick={() => handleDecreaseAmount(product.pid)}
              >
                &minus;
              </button>
              <span className="text-white font-bold">{product.amount}</span>
              <button
                className="btn btn-xs lg:btn-sm btn-ghost btn-circle bg-secondary text-white transition hover:opacity-75"
                onClick={() => handleIncreaseAmount(product.pid)}
              >
                +
              </button>
            </div>
            <span className="font-bold text-md lg:text-xl text-secondary">
              {product.price.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
