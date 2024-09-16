import Footer from "@/app/components/home/footer";
import Header from "@/app/components/home/header";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

async function getProductData(productId) {
  try {
    const { data: product } = await axios.get(
      "https://backend.gulgonenkoop.com/api_gulgonen/product/get.php" +
      "?id=" +
      productId
    );

    // console.log(product);
    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.log("HATA:" + error);
    return null;
  }
}

function extractIdFromUrl(url) {
  // URL'deki son segmenti al (örneğin: "gul-yagi-P-TL3")
  const lastSegment = url.split("/").pop();

  // ID'yi son iki parçadan oluştur ("gul-yagi-P-TL3" -> ["gul", "yagi", "P", "TL3"])
  const splitSegment = lastSegment.split('-');

  // ID'nin başında genelde sabit bir prefiks varsa, bunu birleştir
  const id = splitSegment.slice(-2).join('-'); // Son iki kısmı al ve birleştir

  return id;
}

export default async function ProductPage({ params: { productId } }) {
  console.log(productId);
  console.log(productId.split('-'));

  const id = extractIdFromUrl(productId);

  const { data: product } = await getProductData(id);

  console.log(id);
  console.log(product !== null);

  return (
    <div className="min-w-fit">
      <Header />
      <Head>
        <title>{product.name} - Gülgönen Koop</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="container flex flex-row items-center justify-between p-6 mx-auto bg-slate-300">
        <Link
          href="/products"
          className="duration-200 text-rose-600 hover:text-rose-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="container flex flex-row items-center p-6 mx-auto bg-slate-400 sticky">
        <div key={product.id} className="flex flex-row space-x-6">
          <Image
            src={product.webpath}
            className="size-60 bg-slate-200 rounded-lg"
            width={20}
            height={20}
          />
          <div className="container">
            <h1 className="font-bold text-2xl text-secondary text-pretty mb-2">{product.name}</h1>
            {/* Ürün açıklamaları */}
            <div className="flex flex-col">
              <p className="font-medium text-md text-secondary">{product.description}</p>
              <p>{product.price.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}</p>
              <p className={product.stock > 0 ? "text-green-800" : "text-red-500"}>
                {product.stock > 0 ? "Stokta var" : "Stokta yok"}
              </p>
              <p>{product.size} {product.type}</p>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
