"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import CartHeader from "./components/header";
import CartProduct from "./components/cartProduct";
import Footer from "../components/home/footer";
import BottomNavBar from "../components/bottomNavBar";
import CartManager from "../utils/cart";
import ProductManager from "../utils/product";

// import CartManager from "../utils/cart";
// import ProductManager from "../utils/product";

const steps = ["Sepetim", "Adres", "Ödeme", "Sipariş Tamamlandı"];

export default function Cart() {
  const [currentStep, setCurrentStep] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [length, setLength] = useState(1999); //3333333333333

  const cartManager = new CartManager();
  const productManager = new ProductManager();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    fetchCart();
    if (storedEmail) setIsLoggedIn(true);
    else window.location.href = "/";
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

  return (
    //bg-[#f0a2f041]
    <main data-theme="garden" className="min-w-fit">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#8e4162",
            },
            iconTheme: {
              primary: "#8e4162",
              secondary: "#FFFAEE",
            },
          },
          error: {
            style: {
              border: "1px solid #cc060f",
              padding: "16px",
              color: "#000000",
            },
            iconTheme: {
              primary: "#cc060f",
              secondary: "#FFFAEE",
            },
          },
        }}
      />

      <CartHeader />

      {length === 1999 ? (
        <div className="mx-auto">
          <div className="flex h-60 flex-col justify-center items-center space-y-2">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="text-center">Yükleniyor..</span>
          </div>
        </div>
      ) : length === 9991 ? (
        <div className="mx-auto">
          <div className="flex flex-col h-80 justify-center items-center space-y-4">
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
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
              Sepetiniz şuan boş
            </h1>
            <a className="pt-2 text-center text-sm md:text-base">
              <span>
                Doğal ürünlerimizden dilediğini sepetine ekleyebilir dilediğin
                zaman
              </span>
              <br />
              <span>ödemeni gerçekleştirebilirsin.</span>
            </a>
            <a
              className="btn btn-primary btn-sm h-10 md:btn-md"
              href="/all-products"
            >
              Hemen Göz Atın!
            </a>
          </div>
        </div>
      ) : (
        <div className="px-4">
          <CartProduct
            cartProducts={cartItems}
            setCartItem={setCartItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            //   setCompleted={setCompleted}
          />
        </div>
      )}
      <Footer />

      <BottomNavBar
        data={selectedItems}
        title={`Seçilen Ürünler (${cartItems.length})`}
        agreement={false}
      />
    </main>
  );

  async function fetchCart() {
    try {
      const userID = localStorage.getItem("id");

      const cartForm = new FormData();
      cartForm.append("id", userID);

      const productInCart = await cartManager.fetchCart(cartForm);
      if (productInCart === null) return setLength(9991); //! sepette ürün yok

      const products = [];
      // const arr = [];
      console.log(productInCart);

      for (let i = 0; i < productInCart.length; i++) {
        const productForm = new FormData();
        productForm.append("id", productInCart[i].pid);

        const product = await productManager.getProduct(productForm);

        products.push({
          ...product,
          pid: productInCart[i].pid, // kaldırılabilir, yerine id kullanılır.
          amount: productInCart[i].amount,
        });

        // arr.push(productInCart[i].pid);
      }

      // console.log(products);

      setCartItems(products);
      setSelectedItems(products);
      setLength(products.length);
    } catch (error) {
      console.log(error);
      toast.error("Bilinmeyen hata: C-FC");
    }
  }
}

// export async function getServerSideProps(ctx) {
//   const res = await fetch("https://jsonplaceholder.typicode.com/comments");
//   const post = await res.json();

//   return {
//     props: {
//       data: null,
//     },
//   };
// }
