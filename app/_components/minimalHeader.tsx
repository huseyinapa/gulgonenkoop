import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import func from "../functions";

export default function MinimalHeader() {
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
    <div className="navbar justify-between h-28 px-2 md:px-8 shadow-[0_0_5px]">
      {/* Büyük Ekran */}
      <div className="navbar-start flex">
        <div className="flex flex-row gap-4">
          <Link href={"/"}>
            <Image
              src="/images/gulgonen-logo.png"
              alt="Gülgönen Logo"
              className="size-20 object-cover"
              width={20}
              height={20}
              priority
            />
          </Link>
          <div className="card-title text-secondary hidden lg:flex">
            S.S. Gülgönen Tarımsal Kalkınma Kooperatifi
          </div>
        </div>
      </div>
      <div className="navbar-center flex justify-center items-center display">
        <div className="flex flex-row gap-5">
          <span className="link link-hover font-semibold">Ürünlerimiz</span>
          <span className="link link-hover font-semibold">Haber Bülteni</span>
          <span className="link link-hover font-semibold">Mağazalarımız</span>
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
            <a className="btn md:w-[150px] bg-secondary" href="/cart">
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
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost flex flex-row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="flex size-5 md:size-6 mx-auto"
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
              className="btn btn-circle flex flex-row md:w-[150px] bg-secondary"
              onClick={() => {
                (document.getElementById("register_modal") as HTMLDialogElement)?.showModal();
              }}
            >
              <div className="text-md hidden md:flex  text-secondary-content">
                Kayıt ol
              </div>
            </div>
            <div
              className="btn btn-circle flex flex-row md:w-[150px]"
              onClick={() => {
                (document.getElementById("login_modal") as HTMLDialogElement)?.showModal();
              }}
            >
              <div className="text-md hidden md:flex">Giriş yap</div>
            </div>
          </div>
        )}
      </div>
      {/* //// ! profilim, çıkış yap 1vb */}
    </div>
  );
}
