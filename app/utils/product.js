import axios from "axios";

class ProductManager {
  addProduct(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `https://www.gulgonenkoop.com/api_gulgonen/product/add.php`,
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

  removeProduct(productData) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `https://www.gulgonenkoop.com/api_gulgonen/product/remove.php`,
          productData
        )
        .then((response) => {
          if (response.data.success) resolve(true);
          else reject(false);
        })
        .catch((error) => {
          console.error("Ürün kaldırma hatası:", error);
          reject(false);
        });
    });
  }

  fallingOutofStock(body) {
    var url = `https://www.gulgonenkoop.com/api_gulgonen/product/out_of_stock.php`;

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

  getProduct(body) {
    var url = `https://www.gulgonenkoop.com/api_gulgonen/product/get.php`;

    return new Promise((resolve, reject) => {
      axios
        .post(url, body)
        .then((response) => {
          if (response.data.success) {
            if (response.data.data !== null) {
              resolve(response.data.data);
            } else {
              resolve(null);
            }
          } else {
            reject(null);
          }
        })
        .catch((error) => {
          // console.log(error);
          reject("Bir hata oluştu.");
        });
    });
  }

  fetchAllProduct() {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://www.gulgonenkoop.com/api_gulgonen/product/get_all.php`)
        .then((response) => {
          // console.log(response.data.success);

          if (response.data.success) {
            var updatedProducts = [];
            const data = response.data.data;

            for (let index = 0; index < data.length && index < 4; index++) {
              const element = data[index];

              updatedProducts.push({
                id: element.id,
                name: element.name,
                description: element.description,
                price: element.price,
                stock: element.stock,
                image: element.image,
                index: index,
              });
            }
            resolve(updatedProducts);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          console.error("Ürün kaldırma hatası:", error);
          reject(null);
        });
    });
  }

  fetchProducts() {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://www.gulgonenkoop.com/api_gulgonen/product/get_all.php`)
        .then((response) => {
          // console.log(response.data.success);

          if (response.data.success) {
            var updatedProducts = [];
            const data = response.data.data;

            console.log(data);

            for (let index = 0; index < data.length; index++) {
              const element = data[index];

              updatedProducts.push({
                id: element.id,
                name: element.name,
                description: element.description,
                price: element.price,
                stock: element.stock,
                image: element.image,
                index: index,
              });
            }
            resolve(updatedProducts);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          console.error("Ürün kaldırma hatası:", error);
          reject(null);
        });
    });
  }
}

export default ProductManager;
