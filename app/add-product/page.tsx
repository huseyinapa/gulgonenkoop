"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import ProductManager from "../utils/product";
import create from "../utils/id/createID";
import Footer from "../components/home/footer";
import Header from "../components/home/header";
import toast from "react-hot-toast";

interface ProductFormData {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: string;
    image: string;
    size: string;
    type: string;
    imageName: string;
    date: string;
}

function ProductAdd() {
    const [image, setImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [type, setType] = useState<string>("");

    const productManager = new ProductManager();

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setImageName(file.name);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleStockChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStock(event.target.value);
    };

    const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSize(event.target.value);
    };

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };

    const handleAddProduct = async (event: FormEvent) => {
        event.preventDefault();

        if (image === "") return toast.error("Görsel ekleyiniz.");

        const kdv = parseInt(price) * 0.2;
        const pprice = parseInt(price) + kdv;
        const id = await create.productIdentifier();
        const date = Date.now().toString();

        const productFormData = new FormData();
        productFormData.append("id", id);
        productFormData.append("name", name);
        productFormData.append("description", description);
        productFormData.append("price", pprice.toString());
        productFormData.append("stock", stock);
        productFormData.append("image", image);
        productFormData.append("size", size);
        productFormData.append("type", type);
        productFormData.append("imageName", imageName);
        productFormData.append("date", date);

        try {
            await toast.promise(productManager.add(productFormData), {
                loading: "Ekleniyor...",
                success: "Ürün başarıyla yüklendi!",
                error: "Ürün yüklenemedi.",
            });

            setName("");
            setImage("");
            setImageName("");
            setDescription("");
            setStock("");
            setPrice("");
            setSize("");
            setType("");
        } catch (error) {
            return console.log("Ürün eklenemedi.", error);
        }
    };

    return (
    // JSX yapısı aynı kalacak, sadece tip tanımlamaları eklenecek
    // ...
  );
}

export default ProductAdd; 