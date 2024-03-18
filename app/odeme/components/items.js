// var items = localStorage.getItem("selected.items");
export default function Product({ products }) {
  return (
    <div className="bg-white w-[320px] md:w-[450px] lg:w-[500px] xl:w-[620px] rounded-2xl">
      {/* Ürün sayısı vs dışı çizgi falan filan düzenleme */}

      <div className="card-title m-4 text-secondary">Teslim edilecek ürün(ler)</div>
      <div className="flex-wrap justify-center items-end gap-4 grid grid-cols-1">
        {products.map((item) =>
          ProductCard({
            key: item.pid,
            product: item,
          })
        )}
      </div>
    </div>
  );

  function ProductCard({ key, product }) {
    // console.log(product);

    return (
      <div
        key={key}
        className="relative mx-auto bg-white items-stretch lg:items-start w-[150px] md:w-[250px] lg:w-[300px] xl:w-[500px] h-[140px] md:h-48 lg:h-48 xl:h-40 flex md:flex-row p-3 space-x-3 shadow-secondary shadow-[0_0_10px] rounded-lg"
      >
        <figure className="">
          <img
            src="/images/icons/shopping-bag.svg"
            alt="Ürün görseli"
            className="w-auto md:w-36 h-[80px] md:h-32 object-contain bg-red-400" //rounded-lg rounded-br-[80px]
          />
        </figure>
        <div className="flex flex-col justify-between w-full lg:h-full">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-md lg:text-xl text-secondary">
                {product.name}
              </h2>
              <div className="flex flex-col mt-1 md:mt-2 lg:mt-3 space-y-1">
                <a className="font-normal text-xs md:text-sm">
                  {product.description}
                </a>
                {/* <a className="font-normal">Kargo ücreti: Alıcı öder</a> */}
              </div>
            </div>
            <span className="text-lg font-semibold text-secondary justify-center">
              x{product.amount}
            </span>
          </div>
          {/* <div className="divider w-0 md:w-auto h-0 md:h-5 md:divider-vertical"></div> */}
          <div className="flex flex-row items-center justify-between">
            <span className="text-xs md:text-sm lg:text-base font-semibold">
              {product.size} {product.type}
            </span>
            <div className="">
              <a className="text-sm md:text-base font-semibold text-secondary">
                Toplam: {product.price} TL
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
