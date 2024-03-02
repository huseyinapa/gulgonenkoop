import Image from "next/image";
import Link from "next/link";

export default function CartHeader({ onClick }) {
  return (
    <div className="navbar justify-between h-36 px-2 md:px-8 shadow-[0_0_5px]">
      {/* Büyük Ekran */}
      <div className="navbar-start flex">
        <div className="flex flex-row gap-4">
          <Link href={"/"}>
            <Image
              src="/images/gulgonen-logo.png"
              alt="GülGönen Logo"
              className="size-28 object-cover"
              width={20}
              height={20}
              priority
            />
          </Link>
          <div className="card-title text-secondary hidden lg:flex">
            S.S. GülGönen Tarımsal Kalkınma Kooperatifi
          </div>
        </div>
      </div>
      <div className="navbar-center flex justify-center items-center">
        {/* <div className="flex flex-row items-center justify-center gap-1">
          <img className="size-8" src="/images/icons/security-shield.png" />
          <span className="font-semibold">Güvenli Ödeme</span>
        </div> */}
      </div>
      <div className="navbar-end flex">
        <div className="btn btn-circle md:btn-square flex flex-row md:w-[150px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="size-5 md:size-6"
            color="currentColor"
          >
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
          </svg>
          <div className="text-md hidden md:flex">Hesabım</div>
        </div>
      </div>
      {/* //// ! profilim, çıkış yap 1vb */}
    </div>
  );
}
