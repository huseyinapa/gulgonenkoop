"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Product({ productData }) {
  const router = useRouter();
  console.log(window.location.pathname);
  const productId = parseInt(window.location.pathname.split("/")[2]);
  console.log(productId);

  const [products, setProducts] = useState([
    //productData
    {
      id: 1,
      categoryId: 11,
      name: "Ürün 1",
      price: 100,
      image: "/product1.jpg",
    },
    {
      id: 2,
      categoryId: 12,
      name: "Ürün 2",
      price: 200,
      image: "/product2.jpg",
    },
    {
      id: 3,
      categoryId: 13,
      name: "Ürün 3",
      price: 300,
      image: "/product3.jpg",
    },
  ]);

  const product = products.find((product) => product.id === productId);
  console.log(product);
  if (!product) {
    return <p>Ürün bulunamadı.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <img src={product.image} alt={product.name} />
      <button onClick={() => router.push("/cart")}>Sepete Ekle</button>
    </div>
  );
}
