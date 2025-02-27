"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddressModalProps {
  setAddress: (address: any) => void;
}

export default function AddressModal({ setAddress }: AddressModalProps) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [addressData, setAddressData] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      localStorage.removeItem("city");
    }

    setCity();

    const deliveryAddressString = localStorage.getItem("delivery.address");
    const deliveryAddress = JSON.parse(deliveryAddressString ?? "{}");
    setUserInfo(deliveryAddress);

    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // console.log(userInfo);

  function handleBeforeUnload() {
    if (Object.keys(userInfo).length === 2) {
      localStorage.removeItem("city");
      localStorage.removeItem("district");
      console.log("Silindi");
    }
    console.log("Yenilendi");
  }

  // window.onbeforeunload olayına bir listener ekleyerek handleBeforeUnload fonksiyonunu çağırıyoruz

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(name);
    // console.log(surname);
    // console.log(phone);
    // console.log(identityNumber);
    // console.log(city);
    // console.log(district);
    // console.log(address);
    // console.log(zipCode);

    if (
      name &&
      surname &&
      phone &&
      identityNumber &&
      city !== "İl Seçiniz" &&
      district !== "İlçe Seçiniz" &&
      address &&
      zipCode
    ) {
      // console.log(JSON.stringify(userInfo));

      localStorage.setItem("delivery.address", JSON.stringify(userInfo));

      setAddress(userInfo);
      toast.success("Teslimat bilgileri kaydedildi.");
      (document.getElementById("address_modal") as HTMLDialogElement)?.close();
    } else {
      setAddress({});
      toast.error("Teslimat bilgileri kaydedilemedi");
    }
  };

  const {
    name,
    surname,
    phone,
    identityNumber,
    city,
    district,
    address,
    zipCode,
  } = userInfo as any;

  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));

    // localStorage.setItem(field, value);

    setAddressData(userInfo as any);

    // console.log("user info2: ", userInfo);ss
  };

  // console.log(userIönfo);

  return (
    <dialog id="address_modal" className="modal modal-bottom md:modal-middle">
      <div className="modal-box space-y-3">
        <h3 className="sticky font-bold text-lg text-center">
          Teslimat Adresi
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 lg:gap-4 grid-cols-2 lg:grid-cols-2 place-items-center">
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="name"
                className="text-sm md:text-base text-gray-600"
              >
                İsim
              </label>
              <input
                type="name"
                id="name"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={name}
                onChange={(e) => handleUserInfoChange("name", e.target.value)}
                required
              />
            </div>
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="surname"
                className="text-sm md:text-base text-gray-600"
              >
                Soyisim
              </label>
              <input
                type="surname"
                id="surname"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={surname}
                onChange={(e) =>
                  handleUserInfoChange("surname", e.target.value)
                }
                required
              />
            </div>
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="phone"
                className="text-sm md:text-base text-gray-600"
              >
                Telefon Numarası
              </label>
              <input
                type="text"
                id="phone"
                placeholder="+90..."
                className="border border-gray-300 p-2 rounded-md w-full"
                value={phone}
                onChange={(e) => handleUserInfoChange("phone", e.target.value)}
                required
              />
            </div>
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="identityNumber"
                className="text-sm md:text-base text-gray-600"
              >
                T.C. Kimlik Numarası
              </label>
              <input
                id="identityNumber"
                type="text"
                name="identityNumber"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={identityNumber}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Girilen değer yalnızca rakamlardan oluşuyorsa
                  if (/^\d*$/.test(inputValue)) {
                    handleUserInfoChange("identityNumber", inputValue);
                  }
                }}
                required
              />
            </div>
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="city"
                className="text-sm md:text-base text-gray-600"
              >
                İl Seçiniz
              </label>
              <select
                id="city"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={city || ""}
                onChange={(e) => handleCitySelect(e.target.value)}
                required
              >
                <option value="" disabled>
                  İl Seçiniz
                </option>
                {cities.map((city) => (
                  <option key={city["id"]} value={city["name"]}>
                    {city["name"]}
                  </option>
                ))}
              </select>
            </div>
            {/* {districts.length > 0 && ( */}
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="district"
                className="text-sm md:text-base text-gray-600"
              >
                İlçe Seçiniz
              </label>
              <select
                id="district"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={district || ""}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                required
              >
                <option value="" disabled>
                  İlçe Seçiniz
                </option>
                {districts.map((district) => (
                  <option key={district["id"]} value={district["name"]}>
                    {district["name"]}
                  </option>
                ))}
              </select>
            </div>
            {/* // )} */}

            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="address"
                className="text-sm md:text-base text-gray-600"
              >
                Adresiniz
              </label>
              <input
                type="text"
                id="address"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={address || ""}
                onChange={(e) =>
                  handleUserInfoChange("address", e.target.value)
                }
                required
              />
            </div>
            <div className="w-[150px] md:w-[200px]">
              <label
                htmlFor="zipCode"
                className="text-sm md:text-base text-gray-600"
              >
                Posta Kodu
              </label>
              <input
                id="zipCode"
                type="number"
                name="zipCode"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={zipCode}
                onChange={(e) =>
                  handleUserInfoChange("zipCode", e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="modal-action justify-between">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm">Sorun mu yaşıyorsunuz?</span>
              <a
                href="https://api.whatsapp.com/send?phone=905438511612"
                target="_blank"
                className="btn-link"
              >
                Bize ulaşın
              </a>
            </div>
            <div className="btn-group-horizontal flex justify-end space-x-2">
              <button
                className="btn"
                onClick={() => (document.getElementById("address_modal") as HTMLDialogElement)?.close()}
              >
                İptal Et
              </button>
              <button
                type="submit"
                className="btn glass p-2 bg-[#c21546] hover:bg-[#8f0f33] text-white transition-colors duration-300 ease-in-out"
              >
                Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );

  async function setCity() {
    const api_cities = await fetch("/api/address");
    const cities = (await api_cities.json()).data;

    // console.log(cities);

    const storedCity = localStorage.getItem("city");

    // console.log(api_cities);

    const sortedCities = cities
      .slice()
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    setCities(sortedCities);

    for (let index = 0; index < sortedCities.length; index++) {
      if (sortedCities[index]["name"] === storedCity) {
        const api_districts = sortedCities[index]["districts"];
        setDistricts(api_districts || []);
        break;
      }
    }
  }

  async function handleCitySelect(city: string) {
    handleUserInfoChange("city", city);

    const api_cities = await fetch("/api/address");
    const cities = (await api_cities.json()).data;

    for (let index = 0; index < cities.length; index++) {
      if (cities[index]["name"] === city) {
        const element = cities[index]["districts"];
        setDistricts(element || []);
        // console.log(districts);
      }
    }

    handleUserInfoChange("district", "");

    localStorage.setItem("city", city);
    localStorage.removeItem("district");
  }

  async function handleDistrictSelect(district: string) {
    handleUserInfoChange("district", district);

    localStorage.setItem("district", district);
  }
}
