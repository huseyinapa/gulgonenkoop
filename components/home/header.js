import Image from "next/image";

export default function Header({ onClick }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sol Taraf - Logo ve İsim */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src="/images/gulgonen.png"
              alt="GülGönen"
              className="w-full h-full object-cover"
              width={80}
              height={80}
              priority
            />
          </div>
          <div>
            <h1 className="text-white text-2xl font-semibold">
              GülGönen Tarımsal Kalkınma Koop.
            </h1>
            {/* <p className="text-purple-200 text-lg">
              Slogan veya açıklama burada olabilir.
            </p> */}
          </div>
        </div>

        {/* Orta Alan - Boş */}
        <div className="flex-grow"></div>

        {/* Sağ Taraf - Navigasyon Menüsü ve Diğer Öğeler */}
        <nav className="space-x-6 text-white">
          <a
            className="hover:underline cursor-pointer"
            onClick={() => {
              onClick("home");
            }}
          >
            Anasayfa
          </a>
          <a
            className="hover:underline cursor-pointer"
            onClick={() => {
              onClick("product");
            }}
          >
            Ürünler
          </a>
          <a
            className="hover:underline cursor-pointer"
            onClick={() => {
              onClick("contact");
            }}
          >
            İletişim
          </a>
        </nav>

        {/* Sepet ve Kullanıcı Girişi */}
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <span className="bg-red-500 text-white rounded-full p-1 absolute top-0 right-0 -mt-2 -mr-2">
              3
            </span>
          </div> */}
          <a className="text-white hover:underline cursor-pointer">Giriş Yap</a>
        </div>
      </div>
    </header>
  );
}
