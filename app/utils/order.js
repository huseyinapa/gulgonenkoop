import axios from "axios";
import { api_url } from "./api";

class OrderManager {
  add(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/order/add.php`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data; ",
            },
          }
        );
        console.log("addOrder:", response.data);
        resolve(response.data.success);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  getOrder(data) {
    var url = `${api_url}/api_gulgonen/order/get.php`;

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

  getOrderWithID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${api_url}/api_gulgonen/order/getid.php?orderId=${id}`
        );

        response.data.success
          ? response.data.data !== null
            ? resolve(response.data.data)
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
          `${api_url}/api_gulgonen/order/all_get.php`
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
          `${api_url}/api_gulgonen/order/confirm.php`,
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
          `${api_url}/api_gulgonen/order/ship.php`,
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
          `${api_url}/api_gulgonen/order/cancel.php`,
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
