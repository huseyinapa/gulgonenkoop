import React from 'react';
import Header from '../_components/home/header';
import Footer from '../_components/home/footer';

const Magaza = () => {
  return (
    <main data-theme="garden" className="w-auto h-screen">
      <title>S.S. Gülgönen | Mağaza</title>
      <Header />

      <div className="flex flex-col justify-center items-center m-8 gap-6">
        <h1 className='font-bold text-2xl'>Mağaza Adresimiz</h1>

        <p className='text-center'>Kasap, Cemal Paşa Cd. No:4, 32090 Gönen/Isparta</p>
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.8624203754352!2d30.511191411499464!3d37.95699827182295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c5c0b2524bc7cd%3A0x70e152c7eb013e97!2sS.S.G%C3%BClg%C3%B6nen%20Tarimsal%20Kalkinma%20Kooperatifi!5e0!3m2!1str!2str!4v1733392124637!5m2!1str!2str"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Magaza;