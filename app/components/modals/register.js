"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import UserService from "../../utils/services/userService";
import create from "../../utils/id/createID";

const RegistrationModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userService = new UserService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("E-posta ve parola alanları boş bırakılamaz!");
      return;
    }

    let userDataForm = new FormData();
    userDataForm.append("email", email);

    try {
      const userData = await userService.checkUserEmail(userDataForm);

      if (userData) {
        alert("Bir sorun oluştu. Girilen e-postaya sahip bir hesap zaten var!");
        return;
      } else {
        const id = await create.userIdentifier();
        // alert(id);
        const date = Date.now();

        let formData = new FormData();
        formData.append("id", id);
        formData.append("name", "");
        formData.append("surname", "");
        formData.append("email", email);
        formData.append("password", password);
        formData.append("permission", 0);
        formData.append("last_login", date);
        formData.append("date", date);

        const response = await userService.registerUser(formData);
        // console.log("log: ", response);

        if (response) {
          localStorage.setItem("id", id);
          localStorage.setItem("name", "");
          localStorage.setItem("surname", "");
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("permission", 0);
          localStorage.setItem("last_login", date);
          localStorage.setItem("date", date);

          //   trackGAEvent("Kullanıcı girişi", "Kayıt Butonu", "Kayıt yapıldı");

          window.location.reload();

          toast.success(`${email} başarıyla kayıt olundu ve giriş yapıldı!`);
        } else {
          toast.error("Kayıtlı hesap bulunamadı!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Beklenmedik bir sorun oluştu.");
    }
  };

  return (
    <dialog
      id="register_modal"
      className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <a className="modal-box">
        <h3 className="font-bold text-lg text-center ">KAYIT OL</h3>
        <form method="dialog" className="modal-middle">
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label" autoCorrect="email" htmlFor="email">
              <span className="label-text">E-posta Adresi</span>
            </label>
            <input
              type="email"
              id="reg_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered rounded-md w-full"
            />
          </div>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label" autoCorrect="password" htmlFor="password">
              <span className="label-text">Şifre</span>
            </label>
            <input
              type="password"
              id="reg_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered rounded-md w-full"
            />
          </div>
        </form>
        <div className="modal-action justify-between">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm">Hesabın var mı?</span>
            <button
              className="btn-link"
              onClick={() => {
                document.getElementById("register_modal").close();
                document.getElementById("login_modal").showModal();
              }}
            >
              Giriş Yap
            </button>
          </div>
          <div className="btn-group-horizontal flex justify-end space-x-2">
            <button
              className="btn"
              onClick={() => document.getElementById("register_modal").close()}
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              className="btn glass p-2 bg-[#c21546] hover:bg-[#8f0f33] text-white transition-colors duration-300 ease-in-out"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </a>
    </dialog>
  );
};

export default RegistrationModal;
