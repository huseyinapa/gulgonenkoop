"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/home/header";

import CartProduct from "./components/cartProduct";

import Footer from "../components/home/footer";
import BottomNavBar from "../components/bottomNavBar";

// import CartManager from "../utils/cart";
// import ProductManager from "../utils/product";

const steps = ["Sepetim", "Adres", "Ödeme", "Sipariş Tamamlandı"];

function Cart() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState([
    {
      id: "12",
      pid: "kle13",
      amount: 12,
      stock: 12,
      image: "12",
      name: "12",
      description: "12",
      price: "12",
    },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [length, setLength] = useState(cartItems.length); //3333333333333

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    // fetchCartItems();
    if (storedEmail) {
      setIsLoggedIn(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  function isStockAvailable() {
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];

      if (item.stock === 0) {
        return false;
      }
    }

    return true;
  }

  function isAmountMoreThanStock() {
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];

      if (item.stock < item.amount) {
        return true;
      }
    }

    return false; // true false değiştirilme sebebi miktar stoktan fazla mı diyor cevap belirli zaten
  }

  const handleContinue = () => {
    const checkStock = isStockAvailable();
    const checkAmount = isAmountMoreThanStock();

    if (!checkStock)
      return toast.error("Sepetinizdeki ürün stoklarımızda bulunmamaktadır.");
    else if (checkAmount)
      return toast.error(
        "Sepetinizdeki ürün miktarı stoktan fazla, tekrar kontrol ediniz!"
      );
    else if (currentStep === 0 && !completed.product)
      return toast.error("Sepetiniz boş görünüyor.");
    else if (currentStep === 1 && !completed.address)
      return toast.error(
        "Adres bilgileri eksik görünüyor. Onayla düğmesine tıklamayı deneyin!"
      );

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // alert("Siparişi tamamla:", addressData, paymentData);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (currentStep === 3) return;

    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const fetchCartItems = async () => {
    try {
      const id = localStorage.getItem("id");

      const formData = new FormData();
      formData.append("id", id);

      const response = await cartManager.fetchCart(formData);

      if (response !== null) {
        const products = [];

        for (let i = 0; i < response.length; i++) {
          // console.log(response[i].pid);
          const formPData = new FormData();
          formPData.append("id", response[i].pid);

          let product = await productManager.getProduct(formPData);

          products.push({
            ...product,
            pid: response[i].pid, // kaldırılabilir, yerine id kullanılır.
            amount: response[i].amount,
            stockStatus: product.stock !== 0,
          });
        }

        setCartItems(products);
        setLength(products.length);

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

  return (
    //bg-[#f0a2f041]
    <main data-theme="garden" className="min-w-fit">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header />
      {length === 3333333333333 ? (
        <div className="mx-auto h-60 justify-center">
          <div className="flex flex-col items-center space-y-2">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="text-center">Yükleniyor..</span>
          </div>
        </div>
      ) : length === 0 ? (
        <div className="mx-auto h-72 justify-center">
          <div className="flex flex-col items-center space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h1 className="font-bold text-4xl">Sepetiniz şuan boş</h1>
            <a className="pt-2 text-center">
              <span>
                Doğal ürünlerimizden dilediğini sepetine ekleyebilir dilediğin
                zaman
              </span>
              <br />
              <span>ödemeni gerçekleştirebilirsin.</span>
            </a>
            <a className="btn btn-primary" href="/all-products">
              Hemen Göz Atın!
            </a>
          </div>
        </div>
      ) : (
        <div className="px-4">
          <CartProduct
            cartProducts={cartItems}
            setCartItem={setCartItems}
            //   setCompleted={setCompleted}
          />
        </div>
      )}
      <Footer />
      
      <BottomNavBar />
    </main>
  );
}

export default Cart;
