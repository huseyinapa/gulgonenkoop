"use client";

import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../_components/home/header";
import removeProduct from "@/actions/product/remove";
import Footer from "../_components/home/footer";
import Link from "next/link";
import Image from "next/image";

// Ürün tipini tanımlıyoruz.
export interface Product {
  id: string;
  stock: number;
  amount?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  webpath: string;
  size: string;
  type: string;
  date: string;
}

// Sepet için dönüş değeri örneğinde "amount" alanını kullandığımızı varsayalım.
interface CartProduct {
  amount: number;
}

interface ProductCardProps {
  product: Product;
}

export default function Products(): JSX.Element {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const productManager = new ProductManager();
  const cartManager = new CartManager();

  useEffect(() => {
    checkIsAdmin();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkIsAdmin(): void {
    const permissionStr = localStorage.getItem("permission") || "0";
    const getPermission = parseInt(permissionStr, 10);
    setIsAdmin(getPermission === 1);
  }

  async function getProducts(): Promise<void> {
    try {
      const fetchedProducts = await productManager.fetchProducts();
      if (fetchedProducts !== null) {
        setProducts(fetchedProducts);
      } else {
        setProducts([]);
        toast.error("Stoğumuzda ürün bulunmuyor.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ürünler getirilirken bir hata oluştu.");
    }
  }

  async function handleRemoveProduct(pid: string, path: string): Promise<void> {
    setLoading(true);
    try {
      await removeProduct(pid, path);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== pid)
      );
      toast.success("Ürün başarıyla kaldırıldı.");
    } catch (error) {
      toast.error("Ürün kaldırılırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  function slugify(text: string): string {
    const turkishMap: { [key: string]: string } = {
      ç: "c",
      Ç: "C",
      ğ: "g",
      Ğ: "G",
      ı: "i",
      İ: "I",
      ö: "o",
      Ö: "O",
      ş: "s",
      Ş: "S",
      ü: "u",
      Ü: "U",
    };

    return text
      .toLowerCase()
      .replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => turkishMap[match] || match)
      .replace(/[^a-z0-9\-]/g, "-") // Alfanümerik olmayan karakterleri "-" ile değiştir
      .replace(/-+/g, "-") // Tekrarlayan "-" karakterlerini indirger
      .replace(/^-|-$/g, ""); // Başlangıç ve bitiş "-" karakterlerini kaldırır
  }

  async function handleAddCart(data: Product): Promise<void | string> {
    const id = localStorage.getItem("id") ?? null;
    if (id === null) {
      toast.error("Sepete ürün eklemek için kayıt olmanız/giriş yapmanız gerekir.");
      return;
    }

    try {
      // Ürün detaylarını getirirken tipi belirtiyoruz.
      const productData = (await productManager.getProduct(data.id)) as Product | null;
      if (!productData) {
        toast.error("Ürün bilgileri alınamadı.");
        return;
      }

      if (productData.stock !== undefined && productData.stock < 1) {
        toast.error("Ürün stokta bulunmuyor.");
        return
      }

      const productInCartForm = new FormData();
      productInCartForm.append("id", id);
      productInCartForm.append("pid", data.id);

      // Sepetteki ürün bilgisini beklerken, dönüş tipini belirtiyoruz.
      const cartProductData = (await cartManager.getProductInCart(
        productInCartForm
      )) as CartProduct | null;

      if (
        cartProductData !== null &&
        productData.stock !== undefined &&
        cartProductData.amount >= productData.stock
      ) {
        return toast.error("Stoktaki tutardan fazlası sepete eklenemez.");
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
      console.error(error);
    }
  }

  // Ürün kartı bileşeni
  function ProductCard({ product }: ProductCardProps): JSX.Element {
    const [image, setImage] = useState<string>(product.image);

    return (
      <div
        className="card bg-white text-neutral-content w-[170px] sm:w-[180px] md:w-[260px] lg:w-72 h-[330px] md:h-[400px] lg:h-[450px] shadow-[#FFA4D5] shadow-[0_0_40px_3px]"
      >
        <figure className="relative">
          <Link href={`/products/${slugify(product.name)}-${product.id.toLowerCase()}`}>
            <Image
              src={image || product.webpath}
              alt={product.name}
              className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[260px] w-72 object-cover rounded-t-lg"
              onError={() => setImage(product.webpath)}
              width={20}
              height={20}
            />
          </Link>
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

          <div className="absolute bg-secondary w-14 sm:w-20 lg:w-24 h-6 sm:h-8 md:h-10 lg:h-11 place-content-center bottom-3 right-0 rounded-l-xl">
            <span className="pl-4 text-xs sm:text-sm md:text-md lg:text-lg font-bold">
              {product.size} {product.type}
            </span>
          </div>
        </figure>
        <div className="card-body relative mx-auto p-0 pt-3 px-1">
          <h1 className="card-title text-base md:text-lg justify-center text-[#8a4269] font-bold">
            {product.name}
          </h1>
          <div className="divider bg-[#e2a9c8] h-[1px] w-36 md:w-48 lg:w-52 m-auto"></div>
          <p className="text-base text-center md:text-lg text-[#8a4269]">
            {product.description}
          </p>
        </div>
        <div className="card-actions flex-col-reverse sm:flex-row sm:justify-between items-center gap-3 pb-3 sm:p-3">
          <button
            className="btn btn-xs md:btn-sm lg:btn-md w-32 h-8 bg-secondary text-white"
            onClick={() => handleAddCart(product)}
          >
            Sepete Ekle
          </button>
          <div className="text-[#8a4269] font-semibold text-base lg:text-lg">
            {product.price.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-fit min-h-screen">
      <Header />
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div
        className={`flex flex-wrap mx-auto my-8 p-4 justify-center sm:items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10 ${loading ? "opacity-50" : ""
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
      <Footer />
    </div>
  );
}
