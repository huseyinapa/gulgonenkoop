"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import func from "../../functions";

interface HeaderProps {
  onClick?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      // toast("giriş yapıldı");
      setEmail(storedEmail);
      setIsLoggedIn(true);
    }
    checkIsAdmin();
  }, []);

  function checkIsAdmin() {
    var getPermission = parseInt(localStorage.getItem("permission") ?? "0");
    if (getPermission === 1) setIsAdmin(true);
    else setIsAdmin(false);
  }

  return (
    <div className="navbar justify-between h-36 px-2 md:px-8 shadow-[0_0_5px]">
      {/* Büyük Ekran */}
      <div className="navbar-start flex">
        <div className="flex flex-row gap-4">
          <Link href={"/"}>
            <Image
              src="/images/gulgonen-logo.png"
              alt="Isparta S.S. Gülgönen Tarımsal Kalkınma Kooperatifi"
              className="size-24 md:size-28 object-contain"
              width={20}
              height={20}
              priority
            />
          </Link>
          <div className="card-title text-secondary hidden lg:flex">
            Gülgönen Tarımsal Kalkınma Kooperatifi
          </div>
        </div>
      </div>
      <div className="navbar-center hidden md:flex justify-center items-center">
        <div className="flex flex-row gap-5">
          <a href="/products" className="link link-hover font-semibold">
            Ürünlerimiz
          </a>
          <a href="/iletisim" className="link link-hover font-semibold">
            İletişim
          </a>
          <a href="/magaza" className="link link-hover font-semibold">
            Mağazalarımız
          </a>
          <a href="/sunum" className="link link-hover font-semibold">
            Sunum
          </a>
        </div>
      </div>
      <div className="navbar-end flex">
        {/* <div className="btn btn-circle md:btn-square flex flex-row md:w-[150px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="size-5 md:size-6"
            color="currentColor"
          >
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
          </svg>
          <div className="text-md hidden md:flex">Hesabım</div>
        </div> */}
        {isLoggedIn ? (
          <div className="flex flex-row gap-2">
            <a
              className="btn md:w-[150px] bg-secondary hidden lg:flex"
              href="/cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div className="text-md hidden md:flex text-white">Sepetim</div>
            </a>
            {/* <div className="btn md:w-[150px]">
              <div className="text-md hidden md:flex">Hesabım</div>
            </div> */}
            <div className="dropdown dropdown-end flex md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost flex flex-row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/products">Ürünlerimiz</a>
                </li>
                <li>
                  <a>Haber Bülteni</a>
                  {/* //! Haber sayfası */}
                </li>
                <li>
                  <a>Mağazalarımız</a>
                  {/* //! Biz kimiz sayfasının alt bölümü */}
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost flex flex-row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="flex size-7 md:size-6 mx-auto"
                  color="currentColor"
                >
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
                <div className="md:text-sm lg:text-base hidden md:flex">
                  {new func().shortenText(email.split("@")[0], 10)}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="lg:hidden" href="/cart">
                    Sepetim
                  </a>
                </li>
                <li>
                  <a href="/orders">Siparişlerim</a>
                </li>

                {isAdmin && (
                  <li>
                    <Link href="/add-product" className="">
                      Ürün Ekle
                    </Link>
                  </li>
                )}
                <li>
                  <a
                    className="text-red-500"
                    onClick={() => {
                      try {
                        localStorage.removeItem("id");

                        localStorage.removeItem("name");
                        localStorage.removeItem("surname");

                        localStorage.removeItem("email");
                        localStorage.removeItem("password");
                        localStorage.removeItem("permission");

                        //   trackGAEvent("Kullanıcı girişi", "Kayıt Butonu", "Kayıt yapıldı");

                        setIsLoggedIn(false);
                        toast.success(`Çıkış yapıldı.`);
                      } catch (error) {
                        toast.error(`Çıkış yapılamadı! Hata kodu: H-HH`);
                      }
                    }}
                  >
                    Çıkış yap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <div
              className="btn btn-circle flex flex-row w-[100px] md:w-[120px] bg-secondary"
              onClick={() => {
                (
                  document.getElementById("register_modal") as HTMLDialogElement
                )?.showModal();
              }}
            >
              <div className="text-sm md:text-base flex text-secondary-content">
                Kayıt ol
              </div>
            </div>
            <div
              className="btn btn-circle flex flex-row w-[70px] md:w-[120px]"
              onClick={() => {
                (
                  document.getElementById("login_modal") as HTMLDialogElement
                )?.showModal();
              }}
            >
              <div className="text-md hidden md:flex">Giriş yap</div>
              <Image
                src="/assets/login.svg"
                alt="Giriş yap"
                className="size-5 md:size-6 md:hidden"
                width={20}
                height={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
