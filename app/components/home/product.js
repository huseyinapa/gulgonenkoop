import Link from "next/link";

export default function Product() {
  const products = [
    {
      id: "P-234",
      image: "images/görsel1.jpg",
      name: "Gül Reçeli",
      description: "Cam kavanoz doğal gül reçeli",
      price: "50",
    },
    {
      id: "P-234",
      image: "images/görsel1.jpg",
      name: "Gül Reçeli",
      description: "Cam kavanoz doğal gül reçeli",
      price: "50",
    },
  ];
  return (
    <div className="relative pl-4 pr-4 mx-auto pt-4 my-8 sm:px-8 space-y-4">
      <div className="flex flex-wrap space-y-4 justify-center sm:items-end sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 xl:gap-10 xl:space-y-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  function ProductCard({ product }) {
    return (
      <div
        key={product.pid}
        className="card card-compact bg-white text-neutral-content w-40 md:w-72 h-80 lg:h-[450px] shadow-[#FFA4D5] shadow-[0_0_40px_3px]"
      >
        <figure className="relative">
          {/* <Link
            href={{
              pathname: `/product-details`,
              query: {
                id: product.id,
              },
            }}
            >
            </Link> */}
          <img
            src={product.image}
            alt={product.name}
            className="h-48 lg:h-[260px] lg:w-72 object-cover rounded-t-lg"
          />
          <button
            className="absolute btn btn-sm lg:btn-md btn-circle text-white top-5 right-5 bg-secondary border-secondary hover:bg-secondary"
            // onClick={() => removeProduct(product.id, product.image)}
          >
            <label className="swap swap-flip">
              <input type="checkbox" onChange={(event) => {}} />
              <img
                src="images/icons/heart.png"
                className="swap-off fill-current w-7 h-7"
              />

              <img
                src="images/icons/filled-heart.png"
                className="swap-on fill-current w-7 h-7"
              />
            </label>
          </button>

          <div className="absolute bg-secondary w-24 h-10 lg:h-11 p-0 pt-[6px] bottom-3 right-0 rounded-l-xl">
            <span className="pl-4 text-lg font-bold">100 GR</span>
          </div>
        </figure>
        <div className="relative card-body mx-auto">
          <h1 className="card-title justify-center text-[#8a4269] font-bold">
            {product.name}
          </h1>
          <div className="divider bg-[#e2a9c8] h-[1px] w-52 m-auto"></div>
          <p className="text-[#8a4269]">{product.description}</p>
          <div className="card-actions justify-between items-center">
            <button className="btn btn-sm lg:btn-md bg-secondary text-white">
              Sepete Ekle
            </button>
            <div className="text-[#8a4269] font-semibold text-lg">
              {product.price}₺
            </div>
          </div>
        </div>
      </div>
    );
  }
}
