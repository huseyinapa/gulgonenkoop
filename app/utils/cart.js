import axios from "axios";

class CartManager {
  add(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `https://backend.gulgonenkoop.com/api_gulgonen/cart/add.php`,
          // `https://backend.gulgonenkoop.com/api_gulgonen/cart/add.php`,

          productData,
          {
            headers: {
              "Content-Type": "multipart/form-data; ",
            },
          }
        );
        // console.log(response.data.message);
        resolve(response.data.success);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  remove(productData) {
    //! remove all cart fonksiyonu eklenecek
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `https://backend.gulgonenkoop.com/api_gulgonen/cart/remove.php`,
          productData
        );
        console.log(response.data);

        resolve(response.data.success);
      } catch (error) {
        console.error("Ürün kaldırma hatası:", error);
        reject(false);
      }
    });
  }

  getProductInCart(productData) {
    var url = `https://backend.gulgonenkoop.com/api_gulgonen/cart/get.php`;

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(url, productData);

        console.log(response.data.message);

        response.data.success
          ? response.data.data !== null
            ? resolve(response.data.data)
            : resolve(null)
          : reject(null);
      } catch (error) {
        console.log(error);

        reject(null);
      }
    });
  }

  getAllCartsWithProduct(pid, path) {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("pid", pid);
        formData.append("path", path);

        const response = await axios.post(
          "https://backend.gulgonenkoop.com/api_gulgonen/cart/getallcartswithproduct.php",
          formData
        );

        console.log("DATA?" + response.data);
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
  //   var url = `https://backend.gulgonenkoop.com/api_gulgonen/cart/all_get.php`;

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

  fetchCart(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `https://backend.gulgonenkoop.com/api_gulgonen/cart/get_all.php`,
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
