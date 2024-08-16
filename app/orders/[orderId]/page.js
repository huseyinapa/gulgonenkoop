import OrderManager from "@/app/utils/order";

export default async function Product({ params }) {
  console.log(params);
  const orderId = params.orderId;
  console.log(orderId);

  let product = {};

  try {
    let orderForm = new FormData();
    orderForm.append("orderId", orderId);
    const order = await new OrderManager().getOrderwithID(orderForm);

    console.log(order);
    const _order = {
      orderId: order.orderId,
      status: order.status,
      totalPrice: order.totalPrice,
      customer: JSON.parse(order.customer),
      payment: JSON.parse(order.payment),
      items: JSON.parse(order.items),
      total: order.total,
      date: order.date,
    };
    console.log(order);
    product = _order;
  } catch (error) {
    console.log(error);
  }
  console.log(product);

  if (Object.keys(product).length === 0) {
    return <p>Ürün bulunamadı.</p>;
  }

  return (
    <div>
      <h1>{product.orderId}</h1>
      <p>{product.totalPrice}</p>
      <p>{product.status}</p>

      <img src={product.image} alt={product.name} />
    </div>
  );
}

// Dynamic routes; create a page for each ticket ID
// export async function generateStaticParams() {
//   return products.map((product) => ({
//     id: `${product.id}`,
//   }));
// }
