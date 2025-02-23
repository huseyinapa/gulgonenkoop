import axios from "axios";
import { api_url } from "./api";

interface ProductData {
  id: string;
  stock: number;
  amount?: number;
  // ... diğer product özellikleri
}

class ProductManager {
  add(productData: string) {
    return new Promise(async (resolve, reject) => {
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
        console.log(response.data);
        response.data.success ? resolve(true) : reject(false);
        // resolve(response.data.success);
      } catch (error) {
        console.error("Ürün ekleme hatası:", error);
        reject(false);
      }
    });
  }

  remove(productData: string) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `${api_url}/api_gulgonen/product/remove.php`,
          productData
        )
        .then((response) => {
          console.log("test data" + response.data);

          if (response.data.success) resolve(true);
          else reject(false);
        })
        .catch((error) => {
          console.error("Ürün kaldırma hatası:", error);
          reject(false);
        });
    });
  }

  fallingOutofStock(body: string) {
    var url = `${api_url}/api_gulgonen/product/out_of_stock.php`;

    return new Promise((resolve, reject) => {
      axios
        .post(url, body)
        .then((response) => {
          // console.log(response.data);

          if (response.data.success) resolve(true);
          else reject(false);
        })
        .catch((error) => {
          // console.log(error);
          reject(false);
        });
    });
  }

  async getProduct(id: string): Promise<ProductData | null> {
    // var url = `${api_url}/api_gulgonen/product/get.php`;

    return new Promise((resolve, reject) => {
      axios
        .get(`${api_url}/api_gulgonen/product/get.php?id=${id}`)
        .then((response) => {
          if (response.data.success) {
            if (response.data.data !== null) {
              resolve(response.data.data);
            } else {
              resolve(null);
              console.log("error");
            }
            console.log("error");
          } else {
            reject(null);
            console.log(`error`);
          }
        })
        .catch((error) => {
          console.log(error);

          reject(null);
        });
    });
  }

  async fetchProducts(): Promise<ProductData[]> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api_gulgonen/product/get_all.php`)
        .then((response) => {
          if (response.data.success) {
            const updatedProducts = response.data.data.map((element: any) => ({
              id: element.id,
              name: element.name,
              description: element.description,
              price: element.price,
              stock: element.stock,
              size: element.size,
              type: element.type,
              image: element.image,
              webpath: element.webpath,
            }));
            resolve(updatedProducts);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          console.error("Ürün kaldırma hatası:", error);
          reject(error);
        });
    });
  }
}

export default ProductManager;
