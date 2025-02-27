import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import Footer from "@/app/_components/home/footer";
import Header from "@/app/_components/home/header";

import AddToCartButton from "@/app/products/_components/addToCartComp";
import ProductList from "@/app/products/_components/productList";
import { api_url } from "@/app/utils/api";

interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  size: string;
  type: string;
  webpath: string;
  image: string;
  price: number;
}

async function getProductData(productId: string): Promise<Product | null> {
  try {
    const { data: product } = await axios.get(
      `${api_url}/api_gulgonen/product/get.php?id=${productId}`
    );

    // console.log(product);
    if (!product.data) {
      return null;
    }

    return product.data;
  } catch (error) {
    // console.log("HATA:" + error);
    return null;
  }
}

function extractIdFromUrl(url: string) {
  // URL'deki son segmenti al (örneğin: "gul-yagi-P-TL3")
  const lastSegment = url.split("/").pop();

  // ID'yi son iki parçadan oluştur ("gul-yagi-P-TL3" -> ["gul", "yagi", "P", "TL3"])
  const splitSegment = lastSegment?.split("-");

  // ID'nin başında genelde sabit bir prefiks varsa, bunu birleştir
  const id = splitSegment?.slice(-2).join("-"); // Son iki kısmı al ve birleştir

  return id;
}

interface ProductPageParams {
  params: {
    productId: string;
  };
}

export default async function ProductPage({
  params: { productId },
}: ProductPageParams) {
  // console.log(productId);

  const id = extractIdFromUrl(productId);

  const product = await getProductData(id as string);

  // console.log(id);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-w-fit">
      <Header />
      <Head>
        <title>Ürün Detayı - Gülgönen Koop.</title>
        <meta
          name="description"
          content={`Gülgönen Koop. üzerinden ${product?.name} ürününü inceleyin.`}
        />
      </Head>

      <div className="container flex flex-row items-center justify-between p-6 mx-auto">
        <Link
          href="/products"
          className="flex items-center gap-4 duration-200 text-secondary hover:text-[#cc5c8b]"
        >
          <ArrowLeft className="w-6 h-6" />
          <h1 className="font-bold text-2xl text-pretty">
            {product.name} - {product.size} {product.type}
          </h1>
        </Link>
      </div>

      <div className="container flex flex-row items-start p-6 mx-auto">
        <div key={product.id} className="flex flex-row space-x-4 w-[65%]">
          <figure className="relative">
            <Image
              src={product.webpath || product.image}
              alt={product.name}
              className="w-96 py-4 object-contain rounded-lg"
              width={20}
              height={20}
            />
            <div className="absolute top-0 left-0 flex flex-col bg-green-800 size-[70px] rounded-full text-white items-center justify-center font-bold">
              <span>%100</span>
              <span>doğal</span>
            </div>
          </figure>
          <div className="container flex flex-col gap-2 justify-between">
            <div className="flex flex-row items-center">
              <h1 className="font-bold text-2xl text-secondary text-pretty mr-auto">
                {product.name}
              </h1>
            </div>
            {/* Ürün açıklamaları */}
            <div className="flex flex-col gap-2">
              <p className="font-medium text-md text-secondary">
                {product.description}
              </p>
              <p
                className={
                  product.stock > 0 ? "text-green-800" : "text-red-500"
                }
              >
                {product.stock > 0 ? "Stokta var" : "Stokta yok"}
              </p>
              <p>
                {product.size} {product.type}
              </p>
            </div>
            <div>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-x-4 w-[35%]">
          <ProductList excludingProductId={product.id} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
