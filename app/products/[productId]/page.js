export const _products = [
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

async function getProductData(productId) {
  const product = _products.find(
    (product) => product.id.toString() === productId
  );
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export async function generateStaticParams() {
  return _products.map((product) => ({
    productId: product.id.toString(),
  }));
}

export default async function ProductPage({ params }) {
  const product = await getProductData(params.productId);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}
