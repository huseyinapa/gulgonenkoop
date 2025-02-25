import React from "react";
import Header from "../_components/home/header";
import Footer from "../_components/home/footer";

const RemoteSalesContract = () => {
  return (
    <main data-theme="garden">
      <title>S.S. Gülgönen | Mesafeli Satış Sözleşmesi</title>
      <Header />
      <h1 className="mt-3 text-center font-semibold text-2xl">Mesafeli Satış Sözleşmesi</h1>

      <div className="relative px-4 lg:max-w-5xl mx-auto my-3 text-left space-y-5">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
          <div className="blur-[106px] h-72 bg-gradient-to-br from-[#d82685c2] to-[#d8268557]"></div>
          <div className="blur-[106px] h-48 bg-gradient-to-r from-[#d82685c2] to-[#d8268557]"></div>
        </div>
        <p className="my-4">Son Güncelleme Tarihi: 4 Aralık 2024</p>
        <h2 className="text-xl font-semibold mb-4">Madde 1 - Taraflar</h2>
        <p>
          Bu sözleşme, aşağıdaki taraflar arasında, belirtilen hüküm ve şartlar
          çerçevesinde elektronik ortamda onaylanarak yürürlüğe girmiştir.
        </p>
        <div className="space-y-2">
          <h2 className="font-semibold">Satıcı</h2>
          <div className="space-y-2">
            <ul>Firma Adı: S.S. Gülgönen Tarımsal Kalkınma Kooperatifi</ul>
            <ul>Adres: Kasap, Cemal Paşa Cd. No:4, 32090 Gönen/Isparta</ul>
            <ul>Telefon: [Telefon numarası]</ul>
            <ul>E-posta: gulgonenkoop32@gmail.com</ul>
            <ul>MERSİS Numarası: [MERSİS numarası]</ul>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold">Alıcı</h3>
          <div className="space-y-2">

            <p>Adı/Soyadı: [Alıcının adı soyadı]</p>
            <p>Adresi: [Alıcının adresi]</p>
            <p>Telefon: [Telefon numarası]</p>
            <p>E-posta: [E-posta adresi]</p>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mt-6 mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">
          Madde 2 - Sözleşmenin Konusu
        </h2>
        <p>
          İşbu sözleşmenin konusu, Alıcı’nın, Satıcı’ya ait{" "}
          <a
            href="https://www.gulgonenkoop.com"
            className="text-[#b64983]"
          >
            www.gulgonenkoop.com
          </a>{" "}
          internet sitesi üzerinden elektronik ortamda siparişini verdiği
          aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve
          teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında
          Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince
          tarafların hak ve yükümlülüklerinin belirlenmesidir.
        </p>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">
          Madde 3 - Sözleşme Konusu Ürün Bilgileri
        </h2>
        <div className="space-y-2">
          <p>
            Ürünün adı, birim fiyatı, toplam fiyatı ve ödeme bilgileri aşağıdaki
            gibidir:
          </p>

          <li>Ürün Adı: [Gül Suyu / Gül Yağı / Gül Sabunu vb.]</li>
          <li>Miktar: [Adet]</li>
          <li>Birim Fiyatı: [Fiyat]</li>
          <li>KDV Dahil Toplam Tutar: [Toplam fiyat]</li>
          <li>Teslimat Adresi: [Teslimat adresi]</li>
          <li>Teslim Edilecek Kişi: [Ad-Soyad]</li>
          <li>Fatura Adresi: [Fatura adresi]</li>
          <li>Teslimat Şekli: [Kargo / Diğer yöntemler]</li>
        </div>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Madde 4 - Cayma Hakkı</h2>
        <p>
          Alıcı, herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin
          ürünü teslim aldığı tarihten itibaren 14 gün içinde cayma hakkını
          kullanabilir.
        </p>
        <p>Cayma hakkı kapsamına girmeyen ürünler:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            Alıcının isteği doğrultusunda üretilen veya kişiselleştirilen
            ürünler.
          </li>
          <li>
            Sağlık ve hijyen açısından iadeye uygun olmayan (açılmış veya
            kullanılmış) kozmetik ve bakım ürünleri.
          </li>
          <li>Çabuk bozulabilen veya son kullanma tarihi geçme ihtimali olan ürünler.</li>

        </ul>
        <p className="mt-4">
          Cayma hakkını kullanmak isteyen Alıcı, bu talebini Satıcı’ya{" "}
          <a href="mailto:gulgonenkoop32@gmail.com" className="text-[#b64983]">
            gulgonenkoop32@gmail.com
          </a>{" "}
          veya{" "}
          <a href="tel:+905438511612" className="text-[#b64983]">
            +90 (543) 851 16 12
          </a>{" "}
          aracılığıyla iletmelidir.
        </p>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">
          Madde 5 - Ödeme ve Güvenlik
        </h2>
        <p>
          Alıcı, sipariş işlemi sırasında belirtilen ödeme yöntemlerinden birini
          kullanarak ödemenin tamamını gerçekleştirmelidir.
        </p>
        <p>
          Satıcı, ödeme işlemleri sırasında Alıcı’nın kredi kartı bilgilerinin
          güvenliğini sağlamak için gerekli teknolojik önlemleri alır.
        </p>
        <p>
          Kredi kartı ile yapılan ödemelerde kart sahibinin rızası dışında bir
          işlem tespit edilirse, Alıcı kendi bankasına başvurarak işlemin
          iptalini sağlayabilir.
        </p>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">
          Madde 6 - Uyuşmazlıkların Çözümü
        </h2>
        <p>
          Bu sözleşmeden kaynaklanan ihtilaflarda, Tüketici Hakem Heyetleri veya
          Alıcı’nın ve Satıcı’nın bulunduğu yerleşim yerindeki Tüketici
          Mahkemeleri yetkilidir.
        </p>
      </div>

      <div className="px-4 mx-auto lg:max-w-5xl mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Madde 7 - Yürürlük</h2>
        <p>
          Bu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı tarihte
          yürürlüğe girer.
        </p>
      </div>

      <Footer />
    </main>
  );
};

export default RemoteSalesContract;
