import toast from "react-hot-toast";

import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";

export const removeProduct = async (pid, path) => {
  const cartManager = new CartManager();
  const productManager = new ProductManager();


  try {
    const removeForm = new FormData();
    removeForm.append("id", pid);
    removeForm.append("path", path);
    const response = await productManager.remove(removeForm);

    if (!response) return toast.error("Bilinmeyen hata!");

    // Ürünü tüm kullanıcı sepetlerinden kaldır
    const cartUsersResponse = await cartManager.getAllCartsWithProduct(
      pid,
      path
    );

    if (cartUsersResponse && cartUsersResponse.length > 0) {
      // Ürünü içeren her bir kullanıcı sepetinde işlem yap
      for (let cart of cartUsersResponse) {
        const removeCartForm = new FormData();
        removeCartForm.append("id", cart.userId);
        removeCartForm.append("pid", pid);

        await cartManager.remove(removeCartForm);
        // TODO: Bu proje için olmasa da diğer projelerde mail üzerinden bildirim gönderme işlemi yapılacak
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
