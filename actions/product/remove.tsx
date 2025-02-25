import CartManager from "@/app/utils/cart";
import ProductManager from "@/app/utils/product";
import { toast } from "react-hot-toast";

export default async function removeProduct(
  pid: string,
  path: string
): Promise<string | void> {
  const cartManager = new CartManager();
  const productManager = new ProductManager();

  try {
    const removeForm = new FormData();
    removeForm.append("id", pid);
    removeForm.append("path", path);
    const response = await productManager.remove(removeForm);

    if (!response) return toast.error("Bilinmeyen hata!");

    const cartUsersResponse = await cartManager.getAllCartsWithProduct(
      pid,
      path
    );

    toast.success(cartUsersResponse);
    toast.success("Ürün kaldırıldı ve sepetlerden çıkarıldı.");
  } catch (error) {
    toast.error("Konsolu kontrol ediniz!");
    console.log(error);
  }
}
