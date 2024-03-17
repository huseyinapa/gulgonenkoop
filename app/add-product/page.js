"use client";

import React, { useState } from "react";
import ProductManager from "../utils/product";
import create from "../utils/createID";
import Footer from "../components/home/footer";
import Header from "../components/home/header";
import toast, { Toaster } from "react-hot-toast";

function ProductAdd() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [imageName, setImageName] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");

  const productManager = new ProductManager();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // alert(file.result);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (image === "") return alert("Görsel ekleyiniz.");
    // alert(price);
    const kdv = parseInt(price) * 0.2;
    const pprice = parseInt(price) + kdv;
    // alert(pprice);
    const id = await create.productIdentifier();
    const date = Date.now().toString();

    const productFormData = new FormData();
    productFormData.append("id", id);
    productFormData.append("name", name);
    productFormData.append("description", description);
    productFormData.append("price", pprice);
    productFormData.append("stock", stock);
    productFormData.append("size", size);
    productFormData.append("type", type);
    productFormData.append("image", image);
    productFormData.append("imageName", imageName);
    productFormData.append("date", date);

    try {
      await toast.promise(productManager.add(productFormData), {
        loading: "Ekleniyor...",
        success: "Ürün başarıyla eklendi!",
        error: "Ürün sepete eklenemedi.",
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
      toast.error("Ürün eklenemedi.", error);
    }
  };

  return (
    <div data-theme="garden">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header />
      <div className="flex flex-row mx-auto">
        <div className="mx-auto">
          <div className="w-96 h-96 mx-auto rounded-lg overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Ürün Görseli"
                className="w-full h-full mx-auto object-cover"
              />
            ) : (
              <div className="w-64 h-64 mx-auto bg-gray-400"></div>
            )}
          </div>
        </div>
        <div className="w-[700px] p-4 pr-52 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 ">Ürün Ekle</h2>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
          <form
            className="form-control flex-col gap-3"
            onSubmit={handleAddProduct}
          >
            <div className="w-full max-w-xs">
              <label className="label">
                <span className="label-text">Ürün Adı</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Ürün Açıklaması</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="textarea textarea-bordered h-20 w-full max-w-xs"
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="flex flex-row space-x-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block font-medium text-gray-700"
                >
                  Stok:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={stock}
                  onChange={handleStockChange}
                  className="w-40 px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Ürün Stok Miktari"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block font-medium text-gray-700"
                >
                  Fiyat (kdvsiz fiyat giriniz):
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-52 px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Ürün Fiyatı"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div>
                <label
                  htmlFor="size"
                  className="block font-medium text-gray-700"
                >
                  Ürün Gramı/Litresi:
                </label>
                <input
                  type="number"
                  id="size"
                  value={size}
                  onChange={handleSizeChange}
                  className="w-[160px] px-2 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Sadece sayı giriniz"
                  required
                />
              </div>
              <div className="w-full max-w-md">
                <div className="label">
                  <span className="label-text">Ürünün ölçü türünü seç</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={handleTypeChange}
                  defaultValue={"Seçim yap"}
                >
                  <option disabled>Seçim yap</option>
                  <option>Gram</option>
                  <option>Litre</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Kaydet
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductAdd;
