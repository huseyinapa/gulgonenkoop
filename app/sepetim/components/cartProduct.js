"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import toast, { Toaster } from "react-hot-toast";

function CartProduct({ cartProducts, setCartItem, setCompleted }) {
  const [check, setCheck] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: "12",
      pid: "kle13",
      amount: 12,
      stock: 12,
      image: "12",
      name: "Gül Reçeli",
      description: "250 ML cam şişede sunulan doğal gül reçeli.",
      price: "300",
      gram: "100", //!
    },
    {
      id: "12",
      pid: "kle13",
      amount: 12,
      stock: 12,
      image: "12",
      name: "Gül Reçeli",
      description: "250 ML cam şişede sunulan doğal gül reçeli.",
      price: "300",
      gram: "250", //!
    },
  ]);
  const [length, setLength] = useState(3333333333333);

  useEffect(() => {
    // setCartItems(cartProducts);
    setLength(cartProducts.length);
    // fetchCartItems();
    // console.log(cartItems.map((e) => e).join(", "));
  }, []);

  const fetchCartItems = async () => {
    try {
      const id = localStorage.getItem("id");

      const formData = new FormData();
      formData.append("id", id);

      const response = await cartManager.fetchCart(formData);

      // console.log(`RESPONSEİ: ${response}`);

      if (response !== null) {
        // console.log("cart items: ", response);
        const products = [];

        for (let i = 0; i < response.length; i++) {
          // console.log(response[i].pid);
          const formPData = new FormData();
          formPData.append("id", response[i].pid);
          let product = await productManager.getProduct(formPData);

          products.push({
            ...product,

            // id: product.id,
            // name: product.name,
            // description: product.description,
            // price: product.price,
            // stock: product.stock,
            // featured: product.featured,
            // image: product.image,

            pid: response[i].pid, // kaldırılabilir, yerine id kullanılır.
            amount: response[i].amount,
          });
        }

        // for (let ix = 0; ix < products.length; ix++) {
        //   const element = products[ix];
        //   console.log(`PRODUCTS: ${element}`);
        // }
        setCartItem(products);
        setCartItems(products);
        // setLength(products.length);
        // const totalPrice = products.reduce(
        //   (total, item) => total + item.price * item.amount,
        //   0
        // );
        // console.log(products);

        setCompleted((prevCompleted) => ({
          ...prevCompleted,
          product: true,
        }));
      } else {
        // console.log(response);
        setCompleted((prevCompleted) => ({
          ...prevCompleted,
          product: false,
        }));
        setLength(0);
        // alert("Bilinmeyen sorun oluştu!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Bilinmeyen hata: " + error);
    }
  };

  const handleDecreaseAmount = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.pid === itemId
          ? { ...item, amount: item.amount > 1 ? item.amount - 1 : item.amount }
          : item
      )
    );
  };

  const handleIncreaseAmount = async (itemId) => {
    const form = new FormData();
    form.append("id", itemId);
    const product = await productManager.getProduct(form);

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.pid === itemId
          ? {
              ...item,
              amount:
                item.amount < product.stock ? item.amount + 1 : item.amount,
            }
          : item
      )
    );
  };

  const handleUpdateCart = async () => {
    try {
      const url = `https://www.gonenkleopatra.com/api_kleopatra/cart/aupdate.php`;

      for (let i = 0; i < cartItems.length; i++) {
        var id = localStorage.getItem("id");

        const item = cartItems[i];
        // console.log(item);

        const formData = new FormData();
        formData.append("id", id);
        formData.append("pid", item.pid);
        formData.append("amount", item.amount);

        const response = await axios.post(url, formData);

        if (response.product.success) {
          if (i + 1 === cartItems.length) {
            fetchCartItems();
            toast.success("Sepetiniz güncellendi!");
          }
        } else {
          toast.error("Sepet güncellenirken bir hata oluştu.");
          return;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu!");
    }
  };

  async function handleRemoveItem(pid) {
    const id = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("pid", pid);

    // alert(`${id} ${pid}`);

    const response = await cartManager.removeCart(formData);
    // alert(response);
    if (response) {
      fetchCartItems();
      toast.success("Ürün sepetinizden kaldırıldı!");
    } else toast.error("Ürün sepetinizden kaldırılamadı.");
  }

  return (
    <div className="mx-auto min-w-fit md:min-w-full h-auto">
      <Toaster position="bottom-right" reverseOrder={false} />

      {length === 0 ? (
        <div className="container mx-auto h-52 w-auto justify-center items-center">
          <div className="flex flex-col space-y-4 w-60 mt-5 justify-center items-center">
            <Image
              alt="sepetboş"
              src="/images/icons/cart-2.png"
              width={64}
              height={64}
            />
            <p className="text-center text-gray-600">Sepetiniz boş.</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto min-h-[550px] justify-center px-0 md:px-4">
          <div className="flex flex-row justify-between items-center space-x-6">
            {/* // ? Sepetteki ürün listesi */}
            <div>
              <div className="flex flex-row h-20 items-center justify-between bg-red-100">
                <h1 className="text-lg lg:text-2xl font-bold text-secondary">
                  Sepetim ({cartItems.length} Ürün)
                </h1>
                <div className="form-control mr-3 items-center">
                  <label className="cursor-pointer label  space-x-2">
                    <span className="label-text font-medium lg:text-md">
                      Tümünü seç
                    </span>
                    <input
                      type="checkbox"
                      checked={check ? "checked" : ""}
                      className="checkbox checkbox-lg checkbox-secondary"
                      onChange={() => {
                        setCheck(!check); // sepet listesine  ekleme işlemi burada
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="flex-wrap justify-center items-end gap-4 grid grid-cols-1">
                {cartItems.map((item) =>
                  ProductCard({ key: item.pid, product: item })
                )}
              </div>
            </div>
            {/* //? Ödeme Detay kartı */}
            <div className="card hidden md:flex w-72 md:w-[200px] lg:w-[300px] md:h-[250px] lg:h-80 bg-white shadow-secondary shadow-[0_0_0_2px]">
              <div className="card-title text-lg md:text-lg lg:text-2xl py-3 justify-center">
                Seçilen Ürünler ({cartItems.length})
              </div>
              <div className="card-body justify-between items-center p-0 px-3">
                {/* //! Seçilen ürünlerin fiyatını anlık olarak güncelle */}
                <div className="flex flex-col justify-between">
                  <div className="flex flex-row justify-between">
                    <a className="font-medium lg:font-semibold">Ürünler:</a>
                    <a className="">200 TL</a>
                  </div>
                  <div className="flex flex-row justify-between">
                    <a className="font-medium lg:font-semibold">
                      Kargo ücreti:
                    </a>
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
              </div>
              <div className="card-actions justify-center p-4">
                <a
                  className="btn btn-sm md:h-10 lg:btn-md bg-success text-white"
                  onClick={() => {}} //! kontrol işlemi ve belirlenen sayfaya veri gönderimi
                  href="/odeme" //! daha sonra kaldırılacak
                >
                  Alışverişi tamamla
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function ProductCard({ key, product }) {
    return (
      <div
        key={key}
        className="relative mx-auto bg-white items-stretch lg:items-start w-[350px] md:w-[450px] lg:w-[500px] xl:w-[700px] h-[150px] md:h-48 lg:h-48 xl:h-48 flex md:flex-row p-3 space-x-3 shadow-secondary shadow-[0_0_10px] rounded-lg"
      >
        <figure className="relative">
          <img
            src="/images/icons/shopping-bag.svg"
            alt="Ürün görseli"
            className="w-auto md:w-36 h-[100px] md:h-40 object-contain bg-red-400" //rounded-lg rounded-br-[80px]
          />
          <div className="absolute bg-secondary w-16 h-8 lg:h-8 p-0 pt-[2px] bottom-3 left-0 rounded-r-xl">
            <span className="pl-1.5 text-xs md:text-sm lg:text-base text-white font-bold">
              {product.gram} gr
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
                <a className="font-normal text-xs md:text-sm">{product.description}</a>
                <a className="font-normal text-xs md:text-sm">Kargo firması: PTT Kargo</a>
                {/* <a className="font-normal">Kargo ücreti: Alıcı öder</a> */}
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-2">
              <div className="btn btn-white btn-sm w-11">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  className="stroke-secondary fill-current"
                >
                  <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z" />
                </svg>
              </div>
              <input
                type="checkbox"
                checked={check ? "checked" : ""}
                className="checkbox checkbox-md md:checkbox-lg checkbox-secondary"
                onChange={() => {
                  setCheck(!check); // sepet listesine  ekleme işlemi burada
                }}
              />
            </div>
          </div>
          {/* <div className="divider w-0 md:w-auto h-0 md:h-5 md:divider-vertical"></div> */}
          <div className="flex flex-row items-center justify-between">
            <div className="btn-group shadow-lg bg-secondary rounded-2xl space-x-1">
              <button
                className="btn btn-xs lg:btn-sm btn-ghost btn-circle bg-secondary text-white"
                // onClick={() => handleDecreaseAmount(item.pid)}
              >
                -
              </button>
              <span className="text-xs text-white justify-center">
                {product.amount}
              </span>
              <button
                className="btn btn-xs lg:btn-sm btn-ghost btn-circle bg-secondary text-white"
                // onClick={() => handleIncreaseAmount(item.id)}
              >
                +
              </button>
            </div>
            <div className="">
              <a className="text-sm md:text-base font-semibold text-secondary">
                Toplam: {product.price} TL
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
