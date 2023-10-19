"use client";

import Footer from "../components/home/footer";
import Header from "../components/home/header";

export default function TermsofUse() {
  const onClick = (params) => {
    console.log(params);
    if (params === "home") {
      window.location.href = "/";
    }
  };
  return (
    <div data-theme="garden">
      <Header onClick={onClick} />
      <h1 className="mt-3 text-center font-semibold text-2xl">
        Kullanım Koşulları
      </h1>
      <div className="relative px-4 lg:max-w-5xl mx-auto my-3 mb-6 text-left space-y-5">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
          <div className="blur-[106px] h-72 bg-gradient-to-br from-[#d82685c2] to-[#d8268557]"></div>
          <div className="blur-[106px] h-48 bg-gradient-to-r from-[#d82685c2] to-[#d8268557]"></div>
        </div>
        <p className="my-4">Son güncellenme: 17 Ekim 2023</p>
        <p>
          Sevgili ziyaretçimiz, lütfen https://www.gulgonenkoop.com/ web
          sitemizi ziyaret etmeden önce işbu kullanım koşulları sözleşmesini
          dikkatlice okuyunuz. Siteye erişiminiz tamamen bu sözleşmeyi
          kabulünüze ve bu sözleşme ile belirlenen şartlara uymanıza bağlıdır.
          Şayet bu sözleşmede yazan herhangi bir koşulu kabul etmiyorsanız,
          lütfen siteye erişiminizi sonlandırınız. Siteye erişiminizi
          sürdürdüğünüz takdirde, koşulsuz ve kısıtlamasız olarak, işbu sözleşme
          metninin tamamını kabul ettiğinizin, tarafımızca varsayılacağını
          lütfen unutmayınız.
        </p>
        <p>
          https://www.gulgonenkoop.com/ web sitesi GülGönen Kooperatifi tarafından
          yönetilmekte olup, bundan sonra SİTE olarak anılacaktır. İşbu siteye
          ilişkin Kullanım Koşulları, yayınlanmakla yürürlüğe girer. Değişiklik
          yapma hakkı, tek taraflı olarak SİTE'ye aittir ve SİTE üzerinden
          güncel olarak paylaşılacak olan bu değişiklikleri, tüm
          kullanıcılarımız baştan kabul etmiş sayılır.
        </p>
        <h2 className="font-semibold">Gizlilik</h2>
        <p>
          Gizlilik, ayrı bir sayfada, kişisel verilerinizin tarafımızca
          işlenmesinin esaslarını düzenlemek üzere mevcuttur. SİTE'yi
          kullandığınız takdirde, bu verilerin işlenmesinin gizlilik
          politikasına uygun olarak gerçekleştiğini kabul edersiniz.
        </p>
        <h2 className="font-semibold">Hizmet Kapsamı</h2>
        <p>
          GülGönen Kooperatifi olarak, sunacağımız hizmetlerin kapsamını ve
          niteliğini, yasalar çerçevesinde belirlemekte tamamen serbest olup;
          hizmetlere ilişkin yapacağımız değişiklikler, SİTE'de yayınlanmakla
          yürürlüğe girmiş sayılacaktır.
        </p>
        <h2 className="font-semibold">Telif Hakları</h2>
        <p>
          SİTE'de yayınlanan tüm metin, kod, grafikler, logolar, resimler, ses
          dosyaları ve kullanılan yazılımın sahibi (bundan böyle ve daha sonra
          "içerik" olarak anılacaktır) GülGönen Kooperatifi olup, tüm hakları
          saklıdır. Yazılı izin olmaksızın site içeriğinin çoğaltılması veya
          kopyalanması kesinlikle yasaktır.
        </p>
        <h2 className="font-semibold">Genel Hükümler</h2>
        <ul>
          <li>
            Kullanıcıların tamamı, SİTE'yi yalnızca hukuka uygun ve şahsi
            amaçlarla kullanacaklarını ve üçüncü kişinin haklarına tecavüz
            teşkil edecek nitelikteki herhangi bir faaliyette bulunmayacağını
            taahhüt eder. SİTE dâhilinde yaptıkları işlem ve eylemlerindeki,
            hukuki ve cezai sorumlulukları kendilerine aittir. İşbu iş ve
            eylemler sebebiyle, üçüncü kişilerin uğradıkları veya
            uğrayabilecekleri zararlardan dolayı SİTE'nin doğrudan ve/veya
            dolaylı hiçbir sorumluluğu yoktur.
          </li>
          <li>
            SİTE'de mevcut bilgilerin doğruluk ve güncelliğini sağlamak için
            elimizden geleni yapmaktayız. Lakin gösterdiğimiz çabaya rağmen, bu
            bilgiler, fiili değişikliklerin gerisinde kalabilir, birtakım
            farklılıklar olabilir. Bu sebeple, site içerisinde yer alan
            bilgilerin doğruluğu ve güncelliği ile ilgili tarafımızca, açık veya
            zımni, herhangi bir garanti verilmemekte, hiçbir taahhütte
            bulunulmamaktadır.
          </li>
          <li>
            SİTE'de üçüncü şahıslar tarafından işletilen ve içerikleri
            tarafımızca bilinmeyen diğer web sitelerine, uygulamalara ve
            platformlara köprüler (hyperlink) bulunabilir. SİTE, işlevsellik
            yalnızca bu sitelere ulaşımı sağlamakta olup, içerikleri ile ilgili
            hiçbir sorumluluk kabul etmemekteyiz.
          </li>
          <li>
            SİTE'yi virüslerden temizlenmiş tutmak konusunda elimizden geleni
            yapsak da, virüslerin tamamen bulunmadığı garantisini vermemekteyiz.
            Bu nedenle veri indirirken, virüslere karşı gerekli önlemi almak,
            kullanıcıların sorumluluğundadır. Virüs vb. kötü amaçlı programlar,
            kodlar veya materyallerin sebep olabileceği zararlardan dolayı
            sorumluluk kabul etmemekteyiz.
          </li>
          <li>
            SİTE'de sunulan hizmetlerde, kusur veya hata olmayacağına ya da
            kesintisiz hizmet verileceğine dair garanti vermemekteyiz. SİTE'ye
            ve sitenin hizmetlerine veya herhangi bir bölümüne olan erişiminizi
            önceden bildirmeksizin herhangi bir zamanda sonlandırabiliriz.
          </li>
        </ul>
        <h2 className="font-semibold">Sorumluluğun Sınırlandırılması</h2>
        <p>
          SİTE'nin kullanımından doğan zararlara ilişkin sorumluluğumuz, kast ve
          ağır ihmal ile sınırlıdır. Sözleşmenin ihlalinden doğan zararlarda,
          talep edilebilecek toplam tazminat, öngörülebilir hasarlar ile
          sınırlıdır. Yukarıda bahsedilen sorumluluk sınırlamaları aynı zamanda
          insan hayatına, bedeni yaralanmaya veya bir kişinin sağlığına
          gelebilecek zararlar durumunda geçerli değildir. Hukuken mücbir sebep
          sayılan tüm durumlarda, gecikme, ifa etmeme veya temerrütten dolayı,
          herhangi bir tazminat yükümlülüğümüz doğmayacaktır.
        </p>
        <p>
          Uyuşmazlık Çözümü: İşbu Sözleşme'nin uygulanmasından veya
          yorumlanmasından doğacak her türlü uyuşmazlığın çözümünde, Türkiye
          Cumhuriyeti yasaları uygulanır; Isparta Adliyesi Mahkemeleri ve İcra
          Daireleri yetkilidir.
        </p>
      </div>
      <Footer />
    </div>
  );
}
