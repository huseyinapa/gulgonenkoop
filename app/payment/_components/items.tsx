import Image from "next/image";

// var items = localStorage.getItem("selected.items");
export default function Product({ products }: { products: any[] }) {
  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  return (
    <div className="bg-white w-[345px] md:w-[450px] lg:w-[575px] xl:w-[620px] min-h-[250px] rounded-2xl">
      {/* Ürün sayısı vs dışı çizgi falan filan düzenleme */}
      <div className="flex flex-row justify-between px-2 pb-2">
        <div className="card-title m-2 text-lg md:text-xl text-secondary">
          Seçilen ürün(ler)
        </div>
        <a
          className="btn btn-ghost font-semibold text-lg md:text-xl m-2 text-purple-600 cursor-pointer"
          href="/cart"
        // onClick={() => {
        //   localStorage.removeItem("selected.items");
        // }}
        >
          Düzenle
        </a>
      </div>
      <div className="flex-wrap grid grid-cols-1 justify-center items-end pb-6 gap-4">
        {products.map((item) =>
          ProductCard({
            key: item.pid,
            product: item,
            totalPrice: totalPrice,
          })
        )}
      </div>
    </div>
  );

  function ProductCard({ key, product, totalPrice }: { key: string, product: any, totalPrice: number }) {
    // console.log(product);

    return (
      <div
        key={key}
        className="relative mx-auto bg-white items-stretch lg:items-start w-[290px] md:w-[400px] lg:w-[480px] xl:w-[500px] h-[110px] md:h-[130px] lg:h-[130px] xl:h-[130px] flex md:flex-row p-3 space-x-3 shadow-secondary shadow-[0_0_10px] rounded-lg"
      >
        <figure className="">
          <Image
            src="/images/icons/shopping-bag.svg"
            alt="Ürün görseli"
            className="w-auto md:w-36 h-[80px] md:h-[100px] object-contain bg-red-400" //rounded-lg rounded-br-[80px]
            width={20}
            height={20}
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
                Toplam: {totalPrice} TL
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
