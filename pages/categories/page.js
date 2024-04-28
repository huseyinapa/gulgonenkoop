"use client";

import { useRouter } from "next/navigation";

export const products = [
  { id: 1, name: "Ürün 1", price: 100, image: "/product1.jpg" },
  { id: 2, name: "Ürün 2", price: 200, image: "/product2.jpg" },
  { id: 3, name: "Ürün 3", price: 300, image: "/product3.jpg" },
];

const CategoryPage = ({ products, categoryName }) => {
  const router = useRouter();
  const { categoryId } = router.query;

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

export async function getStaticProps({ params }) {
  const categoryId = parseInt(params.categoryId);
  const categoryName = "Kategori " + categoryId;
  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  return {
    props: {
      products: filteredProducts,
      categoryName,
    },
  };
}

export default CategoryPage;
