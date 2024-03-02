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
      description: "Cam kavanoz doğal gül reçeli  alçksfhnlasişk hasli kfhas",
      price: "50",
    },
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
    {
      id: "P-234",
      image: "images/görsel1.jpg",
      name: "Gül Reçeli",
      description: "Cam kavanoz doğal gül reçeli",
      price: "50",
    },
  ];
  return (
    <div className="flex flex-wrap mx-auto my-8 p-4 justify-center sm:items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10 bg-red-200">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  function ProductCard({ product }) {
    return (
      <div
        key={product.pid}
        className="card bg-white text-neutral-content w-[180px] md:w-[260px] lg:w-72 h-[330px] md:h-[400px] lg:h-[450px] shadow-[#FFA4D5] shadow-[0_0_40px_3px]"
      >
        <figure className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-[180px] md:h-[200px] lg:h-[260px] w-72 object-cover rounded-t-lg"
          />
          <button
            className="absolute btn btn-sm lg:btn-md btn-circle text-white top-2 md:top-5 right-2 md:right-5 bg-secondary border-secondary hover:bg-secondary justify-items-center"
            // onClick={() => removeProduct(product.id, product.image)}
          >
            <label className="swap swap-flip">
              <input type="checkbox" onChange={(event) => {}} />
              <img
                src="images/icons/heart.png"
                className="swap-off fill-current size-6 lg:size-7"
              />

              <img
                src="images/icons/filled-heart.png"
                className="swap-on fill-current w-7 h-7"
              />
            </label>
          </button>

          <div className="absolute bg-secondary w-20 lg:w-24 h-8 md:h-10 lg:h-11 pt-[3px] lg:pt-[6px] bottom-3 right-0 rounded-l-xl">
            <span className="pl-4 text-sm md:text-md lg:text-lg font-bold">
              100 GR
            </span>
          </div>
        </figure>
        <div className="card-body relative mx-auto p-0 pt-3 px-1">
          <h1 className="card-title text-base md:text-lg justify-center text-[#8a4269] font-bold">
            {product.name}
          </h1>
          <div className="divider bg-[#e2a9c8] h-[1px] w-36 md:w-48 lg:w-52 m-auto"></div>
          <p className="text-xs md:text-lg text-[#8a4269]">
            {product.description}
          </p>
        </div>
        <div className="card-actions justify-between items-center p-3">
          <button className="btn btn-xs md:btn-sm lg:btn-md h-8 bg-secondary text-white">
            Sepete Ekle
          </button>
          <div className="text-[#8a4269] font-semibold text-base lg:text-lg">
            {product.price}₺
          </div>
        </div>
      </div>
    );
  }
}
