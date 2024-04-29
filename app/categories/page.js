// Removed "use client"; (not applicable here)
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const CategoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [products, setProducts] = useState([
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
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchData();
    console.log(categoryId);
  }, [categoryId]); // Re-run useEffect on categoryId change

  const fetchData = async () => {
    const categoryIdInt = parseInt(categoryId);
    const categoryName = "Kategori " + categoryIdInt;
    const filteredProducts = products.filter(
      (product) => product.categoryId === categoryIdInt
    );
    console.log(filteredProducts);
    setProducts(filteredProducts);
    setCategoryName(categoryName);
  };

  if (!products.length) {
    return <p>Ürünler yükleniyor...</p>;
  }

  console.log(products);
  return (
    <div>
      <h1>{categoryName}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>{product.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
