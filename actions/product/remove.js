import toast from "react-hot-toast";

import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";

export const removeProduct = async (pid, path) => {
  const cartManager = new CartManager();
  const productManager = new ProductManager();

  const removeForm = new FormData();
  removeForm.append("id", pid);
  removeForm.append("path", path);

  try {
    console.log("test");
    const response = await productManager.remove(removeForm);
    console.log("test");

    console.log(response);
    if (!response) return toast.error("Bilinmeyen hata!");

    // Ürünü tüm kullanıcı sepetlerinden kaldır
    const cartUsersResponse = await cartManager.getAllCartsWithProduct(
      pid,
      path
    );
    console.log(cartUsersResponse);

    if (cartUsersResponse && cartUsersResponse.length > 0) {
      // Ürünü içeren her bir kullanıcı sepetinde işlem yap
      for (let cart of cartUsersResponse) {
        const removeCartForm = new FormData();
        removeCartForm.append("id", cart.userId);
        removeCartForm.append("pid", pid);

        await cartManager.remove(removeCartForm);

        // İsteğe bağlı olarak kullanıcıya bildirim gönderebilirsiniz
        // Örneğin: sendNotification(cart.userId, "Sepetinizdeki bir ürün, yönetici tarafından kaldırıldı.");
      }
    }

    toast.success(cartUsersResponse);
    toast.success("Ürün kaldırıldı ve sepetlerden çıkarıldı.");
  } catch (error) {
    toast.error("Konsolu kontrol ediniz!");
    console.log(error);
  }
};
