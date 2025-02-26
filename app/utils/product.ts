import axios from "axios";
import { api_url } from "./api";

export interface ProductData {
  id: string;
  stock: number;
  amount?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  webpath: string;
  size: string;
  type: string;
  date: string;
}

class ProductManager {
  add(productData: FormData) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/product/add.php`,
          productData,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
          }
        );
        //  console.log(response.data);
        response.data.success ? resolve(true) : reject(false);
      } catch (error) {
        console.error("Ürün ekleme hatası:", error);
        reject(false);
      }
    });
  }

  remove(productData: FormData) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/product/remove.php`,
          productData
        );
        //  console.log("test data" + response.data);
        response.data.success ? resolve(true) : reject(false);
      } catch (error) {
        console.error("Ürün kaldırma hatası:", error);
        reject(false);
      }
    });
  }

  fallingOutofStock(body: string) {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .post(`${api_url}/api_gulgonen/product/out_of_stock.php`, body)
        .then((response) => {
          response.data.success ? resolve(true) : reject(false);
        })
        .catch((error) => {
          reject(false);
        });
    });
  }

  getProduct(id: string): Promise<ProductData | null> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${api_url}/api_gulgonen/product/get.php?id=${id}`)
        .then((response) => {
          if (response.data.success && response.data.data) {
            resolve(response.data.data);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          //  console.log(error);
          reject(null);
        });
    });
  }

  fetchProducts(): Promise<ProductData[]> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api_gulgonen/product/get_all.php`)
        .then((response) => {
          if (response.data.success) {
            const updatedProducts: ProductData[] = response.data.data.map(
              (element: any) => ({
                id: element.id,
                name: element.name,
                description: element.description,
                price: element.price,
                stock: element.stock,
                size: element.size,
                type: element.type,
                image: element.image,
                webpath: element.webpath,
                date: element.date,
              })
            );
            resolve(updatedProducts);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          console.error("Ürün kaldırma hatası:", error);
          reject([]);
        });
    });
  }
}

export default ProductManager;
