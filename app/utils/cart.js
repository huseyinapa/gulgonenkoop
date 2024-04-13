import axios from "axios";

class CartManager {
  add(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `http://51.21.106.119/api_gulgonen/cart/add.php`,
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
          `http://51.21.106.119/api_gulgonen/cart/remove.php`,
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
    var url = `http://51.21.106.119/api_gulgonen/cart/get.php`;

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

  // getProductsInCart(productData) {
  //   var url = `http://51.21.106.119/api_gulgonen/cart/all_get.php`;

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
          `http://51.21.106.119/api_gulgonen/cart/get_all.php`,
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
