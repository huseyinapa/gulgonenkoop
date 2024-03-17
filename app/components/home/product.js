import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Product() {
  const [products, setProducts] = useState([]);

  const productManager = new ProductManager();
  const cartManager = new CartManager();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const products = await productManager.fetchProducts();
      console.log(products);

      if (products !== null) {
        setProducts(products);
      } else {
        // alert("else");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-wrap mx-auto my-8 p-4 justify-center sm:items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  function ProductCard({ product }) {
    return (
      <div
        key={product.id}
        className="card bg-white text-neutral-content w-[180px] md:w-[260px] lg:w-72 h-[330px] md:h-[400px] lg:h-[450px] shadow-[#FFA4D5] shadow-[0_0_40px_3px]"
      >
        <figure className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-[180px] md:h-[200px] lg:h-[260px] w-72 object-cover rounded-t-lg"
          />
          <button
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
          </button>

          <div className="absolute bg-secondary w-20 lg:w-24 h-8 md:h-10 lg:h-11 pt-[3px] lg:pt-[6px] bottom-3 right-0 rounded-l-xl">
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
      const productForm = new FormData();
      productForm.append("id", data.id);

      const productInCartForm = new FormData();
      productInCartForm.append("id", id);
      productInCartForm.append("pid", data.id);

      const productData = await productManager.getProduct(productForm);

      const cartProductData = await cartManager.getProductInCart(
        productInCartForm
      );

      if (productData !== null && productData.stock < 1) {
        // product !== null &&
        return toast.error("Ürün stokta bulunmuyor.");
      } else if (
        cartProductData !== null &&
        cartProductData.amount >= productData.stock
      ) {
        return toast.error(`Stoktaki tutardan fazlası sepete eklenemez.`); // sepette bulunan miktarda eklenebilir.
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
      // console.log(error);
    }
  }
}
