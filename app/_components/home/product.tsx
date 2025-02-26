import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import removeProduct from "@/actions/product/remove";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  size: string;
  type: string;
  webpath: string;
}

interface ProductResponse {
  id: string;
  stock: number;
  amount?: number;
}

interface CartResponse {
  amount: number;
}

export default function Product() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const productManager = new ProductManager();
  const cartManager = new CartManager();

  useEffect(() => {
    checkIsAdmin();
    getProducts();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function checkIsAdmin() {
    const permission = localStorage.getItem("permission");
    setIsAdmin(permission ? parseInt(permission) === 1 : false);
  }

  async function getProducts() {
    try {
      const fetchedProducts = await productManager.fetchProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts as unknown as Product[]);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async function handleRemoveProduct(pid: string, path: string) {
    setLoading(true);
    try {
      await toast.promise(removeProduct(pid, path), {
        loading: "İşlem yapılıyor...",
        success: "Ürün başarıyla kaldırıldı.",
        error: "Ürün kaldırılırken bir hata oluştu.",
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== pid)
      );
    } catch (error) {
      toast.error("Ürün kaldırılırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCart(data: Product) {
    const id = localStorage.getItem("id");
    if (!id) {
      toast.error(
        "Sepete ürün eklemek için kayıt olmanız/giriş yapmanız gerekir."
      );
      return;
    }

    try {
      const productData = await productManager.getProduct(data.id) as ProductResponse;
      if (!productData) {
        return toast.error("Ürün bulunamadı.");
      }

      const formData = new FormData();
      formData.append("id", id);
      formData.append("pid", data.id);

      const productInCartForm = new FormData();
      productInCartForm.append("id", id);
      productInCartForm.append("pid", data.id);

      const cartProductData = await cartManager.getProductInCart(productInCartForm);

      if (productData.stock < 1) {
        return toast.error("Ürün stokta bulunmuyor.");
      }

      if (cartProductData && cartProductData.data && cartProductData.data.amount >= productData.stock) {
        return toast.error(`Stoktaki tutardan fazlası sepete eklenemez.`);
      }

      const cartFormData = new FormData();
      cartFormData.append("id", id);
      cartFormData.append("pid", data.id);
      cartFormData.append("amount", "1");
      cartFormData.append("date", Date.now().toString());

      const success = await cartManager.add(cartFormData);
      if (success) {
        toast.success("Ürün sepete eklendi!");
      } else {
        toast.error("Ürün sepete eklenemedi.");
      }

    } catch (error) {
      toast.error("Bilinmeyen hata. Kod: PC-HAC");
      console.error(error);
    }
  }

  return (
    <div
      className={`flex flex-wrap mx-auto my-8 p-4 justify-center sm:items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10
        ${loading ? "opacity-50" : ""}`}
    >
      {/* {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )} */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  function slugify(text: string): string {
    const turkishMap: { [key: string]: string } = {
      'ç': 'c', 'Ç': 'C',
      'ğ': 'g', 'Ğ': 'G',
      'ı': 'i', 'İ': 'I',
      'ö': 'o', 'Ö': 'O',
      'ş': 's', 'Ş': 'S',
      'ü': 'u', 'Ü': 'U'
    };

    return text
      .toLowerCase()
      .replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => turkishMap[match] || match)
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function ProductCard({ product }: { product: Product }) {
    const [image, setImage] = useState(product.image);
    console.log("Image not found");
    // console.log(product.image);

    return (
      <div
        key={product.id}
        className="card bg-white text-neutral-content w-[170px] sm:w-[180px] md:w-[260px] lg:w-72 h-[330px] md:h-[400px] lg:h-[450px] shadow-[#FFA4D5] shadow-[0_0_40px_3px]"
      >
        <figure className="relative">
          <Link href={`/products/${slugify(product.name)}-${product.id.toLowerCase()}`}>
            <Image
              src={image || product.webpath}
              alt={product.name}
              className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[210px] w-72 object-cover rounded-t-lg"
              onError={() => {
                console.log("Image not found");
                setImage(product.webpath);
              }}
              width={288}
              height={210}
            />
          </Link>
          {isAdmin && (
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle lg:btn-md shadow-sm"
              onClick={() => handleRemoveProduct(product.id, product.image)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {/* <button
            className="absolute btn btn-sm lg:btn-md btn-circle text-white top-2 md:top-5 right-2 md:right-5 bg-secondary border-secondary hover:bg-secondary justify-items-center"
            // onClick={() => removeProduct(product.id, product.image)}
          >
            <label className="swap swap-flip">
              <input type="checkbox" onChange={(event) => {}} />
              <img
                src="images/icons/heart.png"
                className="swap-off fill-current size-6 lg:size-7"
              />

              <img
                src="images/icons/filled-heart.png"
                className="swap-on fill-current w-7 h-7"
              />
            </label>
          </button> */}

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
            {parseInt(product.price).toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </div>
        </div>
      </div>
    );
  }
}
