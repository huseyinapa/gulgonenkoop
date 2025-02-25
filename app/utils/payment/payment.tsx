import { PaymentData, PayResponse } from "@/app/types/payment";
import axios from "axios";
import toast from "react-hot-toast";

export type PaymentResponse = {
  pay: PayResponse | null;
  data: any | null;
};

class PaymentManager {
  async request(userData: any, cartItems: any, paymentData: any): Promise<PaymentResponse> {
    console.log(userData);
    console.log(paymentData);
    console.log(cartItems);

    const convertedItems = JSON.parse(cartItems) || [];
    // console.log(convertedItems);

    // console.log(userData);
    // console.log(cartItems);
    // console.log(paymentData);

    const url = "https://api.gulgonenkoop.com/api/payment";

    const [expireMonth, expireYear] = paymentData.expiryDate.split("/");

    console.log(userData.phone);
    const phone = userData.phone?.replace(/[^0-9 ]/g, " ").trim();
    console.log(phone);

    const gsmNumber = phone.includes("+90")
      ? userData.phone
      : userData.phone.includes("0")
        ? `+9${userData.phone}`
        : `+90${userData.phone}`;

    const basketItems = convertedItems.map((item: any) => ({
      id: item.pid,
      name: item.name,
      category1: "Gül ürünü",
      category2: "Gül ürünü", //! sonrasında kategori eklenebilir
      itemType: "PHYSICAL",
      price: (parseFloat(item.price) * item.amount).toFixed(2),
    }));

    const totalPrice = basketItems.reduce(
      (total: number, item: any) => total + parseFloat(item.price),
      0
    );

    const payData: PaymentData = {
      price: totalPrice,
      paymentCard: {
        cardHolderName: paymentData.cardHolderName,
        cardNumber: paymentData.cardNumber,
        expireMonth: expireMonth,
        expireYear: `20${expireYear}`,
        cvc: paymentData.cvv,
        registerCard: "0",
      },
      buyer: {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        gsmNumber: gsmNumber,
        email: userData.email,
        identityNumber: userData.identityNumber,
        lastLoginDate: userData.last_login,
        registrationDate: userData.date,
        registrationAddress: userData.address,
        ip: userData.ip,
        city: userData.city,
        country: "Türkiye",
        zipCode: userData.zipCode,
      },
      shippingAddress: {
        contactName: `${userData.name} ${userData.surname}`,
        city: userData.city,
        country: "Türkiye",
        address: userData.address,
        zipCode: userData.zipCode,
      },
      billingAddress: {
        contactName: `${userData.name} ${userData.surname}`,
        city: userData.city,
        country: "Türkiye",
        address: userData.address,
        zipCode: userData.zipCode,
      },
      basketItems: basketItems,
    };

    console.log(payData);

    try {
      console.log("pay data: ", payData);
      const { data: paymentResponse }: { data: PayResponse } = await axios.post(url, payData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      console.log(paymentResponse.success);
      console.log(paymentResponse);
      console.log(paymentResponse.data);
      // if (paymentResponse.data.status !== "success") {
      //   console.log(paymentResponse.data);
      //   toast.error(paymentResponse.message);
      //   return { pay: paymentResponse.data, data: payData };
      // } else {
      //   // _paymentData(payData);
      //   // fallingOutofCart(payData, pay.data); //stoktan düşme
      //   toast.success(
      //     'Ödeme işlemi başarılı, siparişiniz için teşekkür ederiz. Sipariş durumunu "Siparişlerim" kısmından takip edebilirsiniz.'
      //   );
      //   return { pay: paymentResponse.data, data: payData };
      // }

      return { pay: paymentResponse, data: payData } as PaymentResponse;
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Beklenmedik sorun oluştu. Hata kodu: UP");
      return { pay: null, data: null };
    }
  }
}

export default PaymentManager;
