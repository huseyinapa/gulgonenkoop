import axios from "axios";

class ProductManager {
  add(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `http://51.21.106.119/api_gulgonen/product/add.php`,
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

  remove(productData) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `http://51.21.106.119/api_gulgonen/product/remove.php`,
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

  fallingOutofStock(body) {
    var url = `http://51.21.106.119/api_gulgonen/product/out_of_stock.php`;

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

  getProduct(id) {
    // var url = `http://51.21.106.119/api_gulgonen/product/get.php`;

    return new Promise((resolve, reject) => {
      axios
        .get(`http://51.21.106.119/api_gulgonen/product/get.php?id=${id}`)
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

  fetchProducts() {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://51.21.106.119/api_gulgonen/product/get_all.php`)
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
                size: element.size,
                type: element.type,
                image: element.image,
                webpath: element.webpath,
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
