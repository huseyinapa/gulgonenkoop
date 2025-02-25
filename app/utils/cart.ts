import axios from "axios";
import { api_url } from "./api";

interface CartResponse {
  success: boolean;
  data: {
    amount: number;
    price: number;
  } | null;
  message: string;
}

class CartManager {
  add(data: string | FormData) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/cart/add.php`,
          data,
          {
            headers: {
              "Content-Type":
                data instanceof FormData
                  ? "multipart/form-data"
                  : "application/json",
            },
          }
        );
        resolve(response.data.success);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  remove(data: string | FormData) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/cart/remove.php`,
          data
        );
        resolve(response.data.success);
      } catch (error) {
        console.error("Ürün kaldırma hatası:", error);
        reject(false);
      }
    });
  }

  getProductInCart(productData: FormData): Promise<CartResponse | null> {
    var url = `${api_url}/api_gulgonen/cart/get.php`;

    return new Promise(async (resolve, reject) => {
      try {
        const { data: productInCart } = await axios.post(url, productData);

        console.log(`Sepetteki ürün: ${productInCart}`);
        console.log(productInCart);

        if (productInCart !== null) {
          return resolve(productInCart);
        } else {
          return reject(null);
        }
      } catch (error) {
        console.log(error);

        reject(null);
      }
    });
  }

  getAllCartsWithProduct(pid: string, path: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("pid", pid);
        formData.append("path", path);

        const response = await axios.post(
          `${api_url}/api_gulgonen/cart/getallcartswithproduct.php`,
          formData
        );

        console.log("DATA?", response.data);
        if (response.data) {
          return resolve(response.data.message); // PHP dosyasından gelen sepet bilgileri
        } else {
          return reject(null); // Hiçbir sepet bulunamadı
        }
      } catch (error) {
        console.log("Sepet bilgisi alınamadı:", error);
        return reject(null); // Hiçbir sepet bulunamadı
      }
    });
  }

  // getProductsInCart(productData) {
  //   var url = `${api_url}/api_gulgonen/cart/all_get.php`;

  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const response = await axios.post(url, productData);

  //       console.log(response.data.message);

  //       response.data.success
  //         ? response.data.data !== null
  //           ? resolve(response.data.data)
  //           : resolve(null)
  //         : reject(null);
  //     } catch (error) {
  //       console.log(error);
  //       reject(null);
  //     }
  //   });
  // }

  fetchCart(productData: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/cart/get_all.php`,
          productData
        );
        // console.log(response);
        resolve(response.data.success ? response.data.data : null);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  }
}

export default CartManager;
