"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import UserService from "../../../utils/services/userService";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userService = new UserService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("E-posta ve şifre alanları boş bırakılamaz!");
      return;
    }

    const date = Date.now();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      var response = await userService.loginUser(formData);
      // console.log(response.data);

      if (response !== null) {
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("name", "");
        localStorage.setItem("surname", "");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("permission", response.data.data.permission);
        localStorage.setItem("last_login", date);
        localStorage.setItem("date", date);

        // trackGAEvent("Kullanıcı girişi", "Giriş Butonu", "Giriş yapıldı");

        window.location.reload();
        toast.success(`${email} başarıyla giriş yapıldı!`);
      } else {
        toast.error("Kayıtlı hesap bulunamadı!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Beklenmedik bir sorun oluştu.");
    }
  };

  return (
    <dialog
      id="login_modal"
      className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">GİRİŞ YAP</h3>
        <form method="dialog" className="modal-middle" onSubmit={handleSubmit}>
          <div className="form-control w-full  max-w-xs mb-4">
            <label className="label" autoCorrect="email" htmlFor="email">
              <span className="label-text">E-posta Adresi</span>
            </label>
            <input
              type="email"
              id="login_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered rounded-md w-full"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label" autoCorrect="password" htmlFor="password">
              <span className="label-text">Şifre</span>
            </label>
            <input
              type="password"
              id="login_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered rounded-md w-full"
              required
            />
          </div>
        </form>
        <div className="modal-action justify-between">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm">Hesabın yok mu?</span>
            <button
              className="btn-link"
              onClick={() => {
                document.getElementById("login_modal").close();
                document.getElementById("register_modal").showModal();
              }}
            >
              Kayıt Ol
            </button>
          </div>
          <div className="btn-group-horizontal flex justify-end space-x-2">
            <button
              className="btn"
              onClick={() => document.getElementById("login_modal").close()}
            >
              İptal
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn glass p-2 bg-[#c21546] hover:bg-[#8f0f33] text-white transition-colors duration-300 ease-in-out"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default LoginModal;
