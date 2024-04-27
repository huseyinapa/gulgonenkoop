import axios from "axios";
class OrderManager {
  add(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `http://51.21.106.119/api_gulgonen/order/add.php`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data; ",
            },
          }
        );
        // console.log("addOrder:", response.data);
        resolve(response.data.success);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  getOrder(data) {
    var url = `http://51.21.106.119/api_gulgonen/order/get.php`;

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(url, data);

        console.log(response.data);

        response.data.success
          ? response.data.orders !== null
            ? resolve(response.data.orders)
            : reject(null)
          : reject(null);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  }

  fetchOrders() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `http://51.21.106.119/api_gulgonen/order/all_get.php`
        );

        response.data.success
          ? response.data.orders !== null
            ? resolve(response.data.orders)
            : reject(null)
          : reject(null);
      } catch (error) {
        console.error(error);
        reject(null);
      }
    });
  }

  confirmOrder(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `http://51.21.106.119/api_gulgonen/order/confirm.php`,
          data
        );
        // console.log(response.data);
        resolve(response.data.success);
      } catch (error) {
        console.error("Ürün ekleme hatası:", error);
        reject(false);
      }
    });
  }

  shipIt(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `http://51.21.106.119/api_gulgonen/order/ship.php`,
          data
        );
        // console.log(response.data);
        resolve(response.data.success);
      } catch (error) {
        console.error("Kargolama hatası:", error);
        reject(false);
      }
    });
  }

  cancelOrder(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `http://51.21.106.119/api_gulgonen/order/cancel.php`,
          data
        );
        // console.log(response.data);
        resolve(response.data.success);
      } catch (error) {
        console.error("Ürün ekleme hatası:", error);
        reject(false);
      }
    });
  }
}

export default OrderManager;
