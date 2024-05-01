import axios from "axios";

// Rastgele karakterler için kullanılacak karakterlerin havuzu
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Veri tabanında bulunan tüm kimlikleri getiren işlev
async function fetchAllIds() {
  try {
    const response = await axios.get(
      "http://51.21.106.119/api_gulgonen/user/getid.php"
    );
    // console.log(response.data);
    return response.data.success ? response.data.userIDS : [];
  } catch (error) {
    console.error("Error fetching ids:", error);
    return [];
  }
}

// Yeni bir kimlik oluşturan işlev
async function generateUniqueId() {
  const allIds = await fetchAllIds();

  let newId = "";
  do {
    // Rastgele 3 karakter seç
    for (let i = 0; i < 3; i++) {
      newId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  } while (allIds.includes(newId)); // Oluşturulan kimlik veri tabanında zaten var mı kontrol et

  return newId;
}

// Kullanıcı kimliği oluştur ve döndür
async function userIdentifier() {
  const newIdentifier = await generateUniqueId();
  return `U-${newIdentifier}`;
}

// Ürün kimliği oluştur ve döndür
async function productIdentifier() {
  const newIdentifier = await generateUniqueId();
  return `P-${newIdentifier}`;
}

export default { userIdentifier, productIdentifier };
