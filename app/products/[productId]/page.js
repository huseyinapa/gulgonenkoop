import axios from "axios";

async function getProductData(productId) {
  try {
    const { data: product } = await axios.get(
      "https://www.gulgonenkoop.com/api_gulgonen/product/get.php" + //TODO: burayı gözden kaçırma....
        "?id=" +
        productId
    );

    // console.log(product);
    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.log(Error);
    return null;
  }
}

export default async function ProductPage({ params: { productId } }) {
  const { data: product } = await getProductData(productId);

  console.log(product);
  console.log(product);

  return (
    <div className="">
      <div key={product.id}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.stock}</p>
        <p>{product.webpath}</p>
        <p>{product.size}</p>
        <p>{product.type}</p>
        <p>{product.date}</p>
      </div>
    </div>
  );
}
