"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import removeProduct from "@/actions/product/remove";

interface ProductProps extends Record<string, unknown> {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  size: string;
  type: string;
  imageName: string;
  date: string;
  isAdmin?: boolean;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  description,
  price,
  stock,
  image,
  size,
  type,
  imageName,
  date,
  isAdmin = false,
}) => {
  const handleRemove = async () => {
    await removeProduct(id, imageName);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={image}
          alt={name}
          width={384}
          height={384}
          className="w-96 h-96 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="flex flex-row justify-between">
          <div className="badge badge-secondary">{price} ₺</div>
          <div className="badge badge-accent">
            {stock} {type}
          </div>
        </div>
        <div className="card-actions justify-end">
          {isAdmin ? (
            <button
              className="btn btn-error btn-sm"
              onClick={handleRemove}
            >
              Kaldır
            </button>
          ) : (
            <Link href={`/product/${id}`} className="btn btn-primary btn-sm">
              İncele
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;