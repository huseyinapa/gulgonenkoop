// export const paymentProgress = async () => {
//   {
//     if (orderProgress) return;

//     const userInfo = await getUserInfo();

//     if (!isChecked) {
//       return toast.error(
//         '"Mesafeli Satış Sözleşmesini" onaylamanız gerekmektedir.'
//       );
//     } else if (Object.keys(address).length === 0) {
//       return toast.error("Teslimat adresini doldurunuz.");
//     } else if (
//       !paymentData.cardHolderName ||
//       paymentData.cardHolderName.trim() === ""
//     ) {
//       // setEffect(true);
//       return toast.error("Kredi kartı sahibi adı boş bırakılamaz.");
//     } else if (
//       !paymentData.cardNumber ||
//       paymentData.cardNumber.length < 16 ||
//       paymentData.cardNumber.trim() === ""
//     ) {
//       // setEffect(true);
//       return toast.error(
//         "Kredi kartı numarası eksik yada boş, kontrol ediniz."
//       );
//     } else if (
//       !paymentData.expiryDate ||
//       paymentData.expiryDate.trim() === ""
//     ) {
//       // setEffect(true);
//       return toast.error("Son kullanma tarihi boş bırakılamaz.");
//     } else if (!paymentData.cvv || paymentData.cvv.trim() === "") {
//       // setEffect(true);
//       return toast.error("Kredi kartı cvv boş bırakılamaz.");
//     }
//     // else if (paymentData) {
//     //   return toast.error("Kart bilgileri eksik yada boş bırakılmış!");
//     // }

//     console.log(userInfo);
//     console.log(userData);

//     try {
//       if (userData.ip === undefined) getIP();
//       if (userInfo === null)
//         return toast.error("Beklenmedik bir sorun oluştu. Hata: P-FLN");

//       console.log(address);

//       console.log(paymentData);

//       console.log(userData);
//       // Siparis onaylanirken indicator dondur

//       const stockControl = await checkStock(items);

//       if (!stockControl) return;

//       const cartItems = JSON.stringify(items);
//       console.log(cartItems);

//       setOrderProgress(true);

//       var paymentProcess = await new PaymentManager().request(
//         userInfo,
//         cartItems,
//         paymentData
//       );

//       // console.log(paymentProcess);
//       // console.log(paymentProcess.pay);
//       // console.log(paymentProcess.pay.data.status);

//       if (paymentProcess.pay.data.status === "success") {
//         // await cartManager.
//         console.log(paymentProcess);
//         await fallingOutofCart(paymentProcess, items);
//         //* İlk olarak stok kontrolu sonrasında ödeme yapılacak eğer başarılı olursa stoktan düşüp order table a ekleyecek

//         // ! router.push(`/home?userid=test&orderid=testt`);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error);
//     }
//     setOrderProgress(false);
//   }
// };
