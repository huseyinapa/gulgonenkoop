"use client";

import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import toast from "react-hot-toast";
import { useState } from "react";

// Ürün tipini tanımlıyoruz.
export interface Product {
    id: string;
    price: number; // Ürün fiyatı sayısal değer olarak varsayılmıştır.
    // Gerekirse diğer alanlar da eklenebilir.
}

interface AddToCartButtonProps {
    product: Product;
}

const productManager = new ProductManager();
const cartManager = new CartManager();

export default function AddToCartButton({ product }: AddToCartButtonProps): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(1);

    const handleIncreaseAmount = (): void => setAmount(prev => prev + 1);
    const handleDecreaseAmount = (): void => {
        if (amount > 1) setAmount(prev => prev - 1);
    };

    const handleAddToCart = async (): Promise<void> => {
        const id: string | null = localStorage.getItem("id");
        if (id === null) {
            toast.error("Sepete ürün eklemek için kayıt olmanız/giriş yapmanız gerekir.");
            return;
        }

        try {
            setIsLoading(true);

            // Ürün detaylarını alıyoruz.
            const productData = await productManager.getProduct(product.id);
            const productInCartForm = new FormData();
            productInCartForm.append("id", id);
            productInCartForm.append("pid", product.id);

            const cartProductData = await cartManager.getProductInCart(productInCartForm);

            if (productData !== null && productData?.stock < 1) {
                toast.error("Ürün stokta bulunmuyor.");
            } else if (
                cartProductData !== null &&
                cartProductData?.amount >= productData?.stock
            ) {
                toast.error("Stoktaki tutardan fazlası sepete eklenemez.");
            } else {
                const formData = new FormData();
                formData.append("id", id);
                formData.append("pid", product.id);
                formData.append("amount", amount.toString());
                formData.append("date", Date.now().toString());

                await toast.promise(cartManager.add(formData), {
                    loading: "Ekleniyor...",
                    success: "Ürün sepete eklendi!",
                    error: "Ürün sepete eklenemedi.",
                });
            }
        } catch (error: any) {
            toast.error("Bilinmeyen hata. Kod: AC-HAC");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-row items-center justify-between">
            <p className="font-semibold text-xl text-[#007646]">
                {product.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                })}
            </p>
            <div className="flex justify-center items-center w-20 h-8 shadow-lg bg-secondary rounded-2xl space-x-1">
                <button
                    className="btn btn-xs lg:btn-sm btn-ghost btn-circle bg-secondary text-white transition hover:opacity-75"
                    onClick={handleDecreaseAmount}
                >
                    &minus;
                </button>
                <span className="text-white font-bold">{amount}</span>
                <button
                    className="btn btn-xs lg:btn-sm btn-ghost btn-circle bg-secondary text-white transition hover:opacity-75"
                    onClick={handleIncreaseAmount}
                >
                    +
                </button>
            </div>
            <button
                className="btn btn-xs md:btn-sm lg:btn-md w-32 h-8 bg-secondary border-secondary text-white"
                onClick={handleAddToCart}
                disabled={isLoading}
            >
                {isLoading ? "Ekleniyor..." : "Sepete Ekle"}
            </button>
        </div>
    );
}
