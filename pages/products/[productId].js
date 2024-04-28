import { useRouter } from "next/router";
import { products } from "../products";

const ProductPage = ({ product }) => {
  const router = useRouter();
  const { productId } = router.query;

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
};

export async function getStaticProps({ params }) {
  const productId = parseInt(params.productId);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export default ProductPage;
