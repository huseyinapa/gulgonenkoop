"use client";

import Footer from "../components/home/footer";
import Header from "../components/home/header";

export default function PrivacyPolicy() {
  return (
    <main data-theme="garden">
      <title>S.S. Gülgönen | Gizlilik Politikası</title>
      <Header />
      <h1 className="mt-3 text-center font-semibold text-2xl">
        Gizlilik Politikası
      </h1>
      <div className="relative px-4 lg:max-w-5xl mx-auto my-3 text-left space-y-5">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
          <div className="blur-[106px] h-72 bg-gradient-to-br from-[#d82685c2] to-[#d8268557]"></div>
          <div className="blur-[106px] h-48 bg-gradient-to-r from-[#d82685c2] to-[#d8268557]"></div>
        </div>
        <p className="my-4">Son Güncelleme Tarihi: 17 Ekim 2023</p>
        <p className="font-semibold text-2xl">
          Güvenliğiniz bizim için önemlidir. Bu nedenle sizinle paylaştığınız
          kişisel veriler, titizlikle korunmaktadır.
        </p>
        <p>
          Biz, S.S. Gülgönen Kooperatifi Olarak olarak veri sorumlusu sıfatıyla,
          bu gizlilik ve kişisel verilerin korunması politikası ile, hangi
          kişisel verilerinizin hangi amaçla işleneceği, işlenen verilerin
          kimlerle ve neden paylaşılabileceği, veri işleme yöntemimiz ve hukuki
          sebeplerimiz ile; işlenen verilerinize ilişkin haklarınızın neler
          olduğu konusunda sizi bilgilendirmeyi amaçlıyoruz.
        </p>
        <h2 className="font-semibold">
          Toplanan Kişisel Verileriniz, Toplanma Yöntemi ve Hukuki Sebebi
        </h2>
        <p>
          Kişisel verileriniz, kimlik (isim, soy isim, doğum tarihi gibi),
          iletişim (adres, e-posta adresi, telefon, IP, konum gibi), özlük,
          sosyal medya, finans bilgileri ve görsel/işitsel kayıtlarınız gibi
          bilgileriniz, çerezler (cookies) gibi teknolojiler aracılığıyla
          otomatik veya otomatik olmayan yöntemlerle toplanmaktadır. Bazı
          durumlarda, analitik sağlayıcılar, reklam ağları, arama bilgi
          sağlayıcıları, teknoloji sağlayıcıları gibi üçüncü taraflardan da
          bilgi alınabilir. Bu veriler, meşru menfaat işleme şartına dayalı
          olarak işlenmekte ve iş birliği veya hizmet ilişkisi çerçevesinde
          işlenmektedir.
        </p>
        <h2 className="font-semibold">Kişisel Verilerinizin İşlenme Amacı</h2>
        <div className="space-y-2">
          <p>
            Kişisel verileriniz, aşağıdaki amaçlar doğrultusunda işlenmektedir:
          </p>
          <li>
            Hizmetlerimizden faydalanabilmeniz için sizinle sözleşmeler
            kurabilmek,
          </li>
          <li>
            Sunduğumuz hizmetleri, sözleşmelere uygun bir şekilde yerine
            getirebilmek,
          </li>
          <li>Haklarınızın kullanılmasını sağlamak,</li>
          <li>
            Ürün ve hizmetlerimizi ihtiyaçlarınıza göre geliştirmek ve size
            duyurmak,
          </li>
          <li>
            Kanuni zorunlulukları yerine getirebilmek. Bu amaçlar doğrultusunda,
            kişisel verileriniz işlenecek ve güncellenecektir.
          </li>
        </div>
        <h2 className="font-semibold">
          Toplanan Kişisel Verilerin Kimlere ve Hangi Amaçlarla Aktarılabileceği
        </h2>
        <p>
          Kişisel verileriniz, faaliyetlerimizi yürütebilmek, iş birliği
          yaptığımız üçüncü taraflarla ve talep halinde adli ve idari
          makamlarla, gerekli teknik ve idari önlemler alınarak
          aktarılabilecektir.
        </p>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mb-6 space-y-2">
        <h2 className="font-semibold mb-2">
          Kişisel Verileri İşlenen Kişi Olarak Haklarınız
        </h2>
        <div>
          <p>KVKK madde 11 uyarınca şu haklara sahipsiniz:</p>
          <ul>a. Kişisel verilerin işlenip işlenmediğini öğrenme,</ul>
          <ul>b. Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</ul>
          <ul>
            c. Kişisel verilerin işlenme amacını ve bunların amacına uygun
            kullanılıp kullanılmadığını öğrenme,
          </ul>
          <ul>d. Kişisel verilerin aktarıldığı üçüncü kişileri bilme,</ul>
          <ul>
            e. Kişisel verilerin eksik veya yanlış işlenmişse düzeltilmesini
            isteme,
          </ul>
          <ul>f. Kişisel verilerin silinmesini veya yok edilmesini isteme,</ul>
          <ul>g. İşlenen verilerin üçüncü kişilere bildirilmesini isteme,</ul>
          <ul>
            h. Kişisel verilerin otomatik sistemlerle analiz edilmesine itiraz
            etme,
          </ul>
          <ul>
            i. Kişisel verilerin kanuna aykırı işlenmesi nedeniyle zarar
            gördüyseniz zararın giderilmesini talep etme. Yukarıdaki haklarınızı
            kullanmak için bize
            <a
              href="mailto:gulgonenkoop32@gmail.com"
              className="text-[#b64983]"
            >
              {" "}
              gulgonenkoop32@gmail.com{" "}
            </a>
            adresi üzerinden ulaşabilirsiniz.
          </ul>
        </div>
        <h2 className="font-semibold">İletişim</h2>
        <p>
          Hizmet sunmak amacıyla sadece gereken kişisel verilerinizin
          işlenmesini kabul etme hakkınızdır. Bu politikayı kabul etmek veya
          reddetmek tamamen sizin özgür iradenize bağlıdır. Sitemizi kullanmaya
          devam ettiğinizde, bu politikayı kabul etmiş varsayılacaksınız. Daha
          fazla ayrıntılı bilgi için lütfen
          <a href="mailto:gulgonenkoop32@gmail.com" className="text-[#b64983]">
            {" "}
            gulgonenkoop32@gmail.com{" "}
          </a>
          adresi üzerinden bizimle iletişime geçin.
        </p>
      </div>

      <Footer />
    </main>
  );
}
