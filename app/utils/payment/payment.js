class PaymentManager {
  async pay() {
    const url = "https://api.gulgonenkoop.com/api/payment";

    const [expireMonth, expireYear] = paymentData.expiryDate.split("/");

    const gsmNumber = userData.phone.includes("+90")
      ? userData.phone
      : userData.phone.includes("0")
      ? `+9${userData.phone}`
      : `+90${userData.phone}`;

    const basketItems = cartItems.map((item) => ({
      id: item.pid,
      name: item.name,
      category1: "Gül ürünü",
      category2: "Gül ürünü", //! sonrasında kategori eklenebilir
      itemType: "PHYSICAL",
      price: (parseFloat(item.price) * item.amount).toFixed(2),
    }));

    const totalPrice = basketItems.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );

    const payData = {
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

    try {
      // console.log("pay data: ", payData);
      const pay = await axios.post(url, payData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      // console.log(pay.data.success);
      // alert(pay);
      // console.log(pay.data);

      if (pay.data.data.status !== "success") {
        toast.error(pay.data.message);
      } else {
        _paymentData(payData);
        fallingOutofCart(payData, pay.data); //stoktan düşme
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Beklenmedik sorun oluştu. Hata kodu: UP");
    }
  }
}

export default PaymentManager;
