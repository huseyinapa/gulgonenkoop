function ProductCard({ product }) {
    return (
      <div
        key={product.id}
        className="card card-compact bg-white text-neutral-content w-40 md:w-72 h-80 lg:h-[450px] shadow-[#FFA4D5] shadow-2xl"
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
            className="h-48 lg:h-[260px] lg:w-60 object-cover rounded-t-lg"
          />
          <button
            className="absolute top-5 right-5 bg-secondary border-secondary hover:bg-secondary btn btn-sm lg:btn-md btn-circle shadow-sm"
            // onClick={() => removeProduct(product.id, product.image)}
          >
            {"<3"}
          </button>
          <div className="absolute bg-secondary w-24 h-10 lg:h-11 p-0 pt-[6px] bottom-3 right-0 rounded-l-xl">
            <span className="pl-4 text-lg font-bold">100 GR</span>
          </div>
          {/* {isAdmin && (
            <button
              className="absolute top-5 right-5 btn btn-sm lg:btn-md btn-circle shadow-sm"
              onClick={() => removeProduct(product.id, product.image)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
              </svg>
            </button>
          )} */}
        </figure>
        <div className="relative card-body mx-auto">
          {/* <div className="absolute w-32 "></div> */}
          <h1 className="card-title justify-center text-[#8a4269] font-bold">
            {product.name}
          </h1>
          <div className="divider bg-[#e2a9c8] h-[1px] w-52 m-auto"></div>
          <p className="text-[#8a4269]">{product.description}</p>
          <div className="card-actions justify-between items-center">
            <button
              className="btn btn-sm lg:btn-md bg-secondary text-white transition-shadow hover:shadow-lg hover:shadow-secondary"
              // onClick={() => handleAddCart(product)}
            >
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