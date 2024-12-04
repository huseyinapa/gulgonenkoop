import Image from "next/image";

export default function Header({ onClick }) {
  return (
    <div className="navbar justify-center bg-base-100 h-40 p-4">
      {/* Büyük Ekran */}
      <div className="navbar-start hidden lg:flex"></div>
      <div className="navbar-center hidden lg:flex mx-auto justify-center items-center space-x-6">
        <div className="link link-hover">
          <span onClick={() => onClick("home")}>Ana Sayfa</span>
        </div>
        <div className="link link-hover">
          <span onClick={() => onClick("products")}>Ürünlerimiz</span>
        </div>
        <Image
          src="/images/gulgonen.svg"
          alt="Gülgönen"
          className="w-48 h-48 object-cover"
          width={20}
          height={20}
          priority
        />
        <div className="link link-hover">
          <span onClick={() => {}}>Siparişlerim</span>
        </div>
        <div className="link link-hover">
          <span onClick={() => {}}>Sepetim</span>
        </div>
      </div>

      {/* Küçük Ekran */}
      <div className="navbar-start flex lg:hidden justify-start items-center">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Ana Sayfa</a>
            </li>
            <li>
              <a>Ürünlerimiz</a>
            </li>
            <li>
              <a>İletişim</a>
              <ul className="p-2">
                <li>
                  <a>Instagram</a>
                </li>
                <li>
                  <a>E-Posta</a>
                </li>
              </ul>
            </li>

            <li>
              <a>Hakkımızda</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center flex lg:hidden mx-auto justify-center items-center">
        <Image
          src="/images/gulgonen.svg"
          alt="Gülgönen"
          className="w-44 lg:w-48 h-auto object-cover"
          width={20}
          height={20}
          priority
        />
      </div>

      <div className="navbar-end mx-auto justify-end items-center">
        {/* <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button> */}
        <div tabIndex={0} className="dropdown dropdown-end">
          {/* <div className="avatar sm:right-10">
            <div className="w-14 rounded-box shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="p-3.5"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              </svg>
            </div>
          </div> */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Giriş yap</a>
            </li>
            <li>
              <a>Kayıt Ol</a>
            </li>
            <li>
              <a
                className="px-4 py-2 text-red-500 hover:bg-gray-100 truncate"
                // onClick={deleteLStorage}
              >
                Çıkış
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
