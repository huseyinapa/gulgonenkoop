import axios from "axios";

const characters = "0123456789";

class OrderID {
  static async fetchAllOrderIds() {
    try {
      const response = await axios.get(
        "http://51.21.106.119/api_gulgonen/order/getID.php"
      );
      return response.data.success ? response.data.orderIDS : [];
    } catch (error) {
      console.log("Error fetching ids:", error);
      return [];
    }
  }

  static async generateUniqueId() {
    const allIds = await OrderID.fetchAllOrderIds();

    let newId = "";

    do {
      // Rastgele 3 karakter seç
      for (let i = 0; i < 3; i++) {
        newId += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    } while (allIds.includes(newId)); // Oluşturulan kimlik veri tabanında zaten var mı kontrol et

    return newId;
  }

  // Sipariş kimliği oluştur ve döndür
  async orderIdentifier() {
    const newIdentifier = await OrderID.generateUniqueId();
    return `KLEO-${newIdentifier}`;
  }
}

export default OrderID;
