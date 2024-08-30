"use client";

import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/home/header";
import { removeProduct } from "@/actions/product/remove";

export default function Products() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const productManager = new ProductManager();
  const cartManager = new CartManager();

  useEffect(() => {
    checkIsAdmin();
    getProducts();
  }, []);

  function checkIsAdmin() {
    const getPermission = parseInt(localStorage.getItem("permission")) ?? 0;
    setIsAdmin(getPermission === 1);
  }

  async function getProducts() {
    try {
      const products = await productManager.fetchProducts();
      if (products !== null) {
        setProducts(products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveProduct(pid, path) {
    setLoading(true); // Loading durumunu başlat
    try {
      await removeProduct(pid, path);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== pid)
      ); // Ürünü state'den çıkar
      toast.success("Ürün başarıyla kaldırıldı.");
    } catch (error) {
      toast.error("Ürün kaldırılırken bir hata oluştu.");
    } finally {
      setLoading(false); // Loading durumunu bitir
    }
  }

  return (
    <div data-theme="garden" className="min-w-fit min-h-screen">
      <Header />
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div
        className={`flex flex-wrap mx-auto my-8 p-4 justify-center sm:items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10 ${
          loading ? "opacity-50" : ""
        }`}
      >
        {products.length === 0 ? (
          <div></div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );

  function ProductCard({ product }) {
    const [image, setImage] = useState(product.image);

    return (
      <div
        key={product.id}
        className="card bg-white text-neutral-content w-[180px] md:w-[260px] lg:w-72 h-[330px] md:h-[400px] lg:h-[450px] shadow-[#FFA4D5] shadow-[0_0_40px_3px]"
      >
        <figure className="relative">
          <img
            src={image || product.webpath}
            alt={product.name}
            className="h-[180px] md:h-[200px] lg:h-[260px] w-72 object-cover rounded-t-lg"
            onError={() => {
              setImage(product.webpath);
            }}
          />
          {isAdmin && (
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle lg:btn-md shadow-sm"
              onClick={() => handleRemoveProduct(product.id, product.image)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
              </svg>
            </button>
          )}
          <div className="absolute bg-secondary w-20 lg:w-24 h-8 md:h-10 lg:h-11 place-content-center bottom-3 right-0 rounded-l-xl">
            <span className="pl-4 text-sm md:text-md lg:text-lg font-bold">
              {product.size} {product.type}
            </span>
          </div>
        </figure>
        <div className="card-body relative mx-auto p-0 pt-3 px-1">
          <h1 className="card-title text-base md:text-lg justify-center text-[#8a4269] font-bold">
            {product.name}
          </h1>
          <div className="divider bg-[#e2a9c8] h-[1px] w-36 md:w-48 lg:w-52 m-auto"></div>
          <p className="text-xs md:text-lg text-[#8a4269]">
            {product.description}
          </p>
        </div>
        <div className="card-actions justify-between items-center p-3">
          <button
            className="btn btn-xs md:btn-sm lg:btn-md h-8 bg-secondary text-white"
            onClick={() => handleAddCart(product)}
          >
            Sepete Ekle
          </button>
          <div className="text-[#8a4269] font-semibold text-base lg:text-lg">
            {product.price}₺
          </div>
        </div>
      </div>
    );
  }

  async function handleAddCart(data) {
    var id = localStorage.getItem("id") ?? null;
    if (id === null) {
      toast.error(
        "Sepete ürün eklemek için kayıt olmanız/giriş yapmanız gerekir."
      );
      return;
    }

    try {
      const productData = await productManager.getProduct(data.id);

      const productInCartForm = new FormData();
      productInCartForm.append("id", id);
      productInCartForm.append("pid", data.id);

      const cartProductData = await cartManager.getProductInCart(
        productInCartForm
      );

      if (productData !== null && productData.stock < 1) {
        return toast.error("Ürün stokta bulunmuyor.");
      } else if (
        cartProductData !== null &&
        cartProductData.amount >= productData.stock
      ) {
        return toast.error(`Stoktaki tutardan fazlası sepete eklenemez.`);
      }

      const formData = new FormData();
      formData.append("id", id); // Müşteri kimliği
      formData.append("pid", data.id);
      formData.append("amount", "1");
      formData.append("date", Date.now().toString());

      await toast.promise(cartManager.add(formData), {
        loading: "Ekleniyor...",
        success: "Ürün sepete eklendi!",
        error: "Ürün sepete eklenemedi.",
      });
    } catch (error) {
      toast.error("Bilinmeyen hata. Kod: PC-HAC");
      console.log(error);
    }
  }
}
