import React from "react";
import Header from "../components/home/header";
import Footer from "../components/home/footer";

const Contact = () => {
  return (
    <main data-theme="garden">
      <title>S.S. Gülgönen | İletişim</title>
      <Header />
      <h1 className="mt-3 text-center font-semibold text-2xl">İletişim</h1>

      <div className="relative px-4 lg:max-w-5xl mx-auto my-3 text-left space-y-5">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
          <div className="blur-[106px] h-72 bg-gradient-to-br from-[#d82685c2] to-[#d8268557]"></div>
          <div className="blur-[106px] h-48 bg-gradient-to-r from-[#d82685c2] to-[#d8268557]"></div>
        </div>
        <p className="my-4">Son Güncelleme Tarihi: 4 Aralık 2024</p>
        <div>
          <h2 className="font-semibold mb-2">
            Kooperatif Bilgileri:
          </h2>
          <div className="space-y-2">
            <li>E-Mail: <a href="mailto:gulgonenkoop32@gmail.com" className="text-[#b64983]">
              gulgonenkoop32@gmail.com
            </a></li>
            <li>Adres: Kasap, Cemal Paşa Cd. No:4, 32090 Gönen/Isparta</li>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">
            Kooperatif Yetkili Kişileri:
          </h2>
          <div className="space-y-2">
            <lu>Nazire Özsu:</lu>
            <li>Telefon: <a href="tel:+905432872470" className="text-[#b64983]">
              +90 (543) 287 24 70
            </a></li>
            <lu>Zübeyde Kutlu:</lu>
            <li>Telefon: <a href="tel:+905" className="text-[#b64983]">
              +90 (5)
            </a></li>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">
            Ürün İade ve Değişim İçin Gerekli Bilgiler:
          </h2>
          <div className="space-y-2">
            <li>İade ve değişim işlemleri için sipariş numaranızı belirtmeniz gerekmektedir.</li>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">
            İade ve Değişim Şartları:
          </h2>
          <div className="space-y-2">
            <li>Ürünlerimizi teslim aldıktan sonra 14 gün içerisinde iade talebinde bulunabilirsiniz.</li>
            <li>İade edilecek ürünlerin, hasarsız ve orijinal ambalajında olması gerekmektedir.</li>
            <li>Eğer ürün kullanılmışsa fakat kullanıldıktan sonra bizim tarafımızdan kaynaklanan bir ürün hatası olduğu tespit edilmişse iade talebinde bulunabilirsiniz.</li>
            <li>İade süreci için <a href="mailto:gulgonenkoop32@gmail.com" className="text-[#b64983]">
              {" "}
              gulgonenkoop32@gmail.com{" "}
            </a> üzerinden bizimle iletişime geçebilirsiniz.</li>
            <li>İade kargo masrafları, iade sebebine göre müşteri ya da firmamız tarafından karşılanır.</li>
            <li>Ürün değişimleri yalnızca stok durumuna göre yapılabilmektedir. Değişim talebinizi bize iletmek için {" "}
              <a href="tel:+905438511612" className="text-[#b64983]">
                +90 (543) 851 16 12
              </a> ya da <a href="tel:+905432872470" className="text-[#b64983]">
                +90 (543) 287 24 70
              </a>{" "} iletişime geçebilirsiniz.</li>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">
            Cayma hakkı kapsamına girmeyen ürünler:
          </h2>
          <div className="space-y-2">
            <ul className="list-disc ml-6 mt-2">
              <li>Alıcının isteği doğrultusunda üretilen veya kişiselleştirilen ürünler.</li>
              <li>Sağlık ve hijyen açısından iadeye uygun olmayan (açılmış veya kullanılmış) kozmetik ve bakım ürünleri.</li>
              <li>Çabuk bozulabilen veya son kullanma tarihi geçme ihtimali olan ürünler.</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;
