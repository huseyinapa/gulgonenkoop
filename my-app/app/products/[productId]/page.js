export const products = [
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
];

export default function Product({ params }) {
  console.log(params);
  const productId = parseInt(params.productId);
  console.log(productId);

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
    </div>
  );
}
// Dynamic routes; create a page for each ticket ID
export async function generateStaticParams() {
  return products.map((product) => ({
    id: `${product.id}`,
    denem: `${product.id}`,
  }));
}
