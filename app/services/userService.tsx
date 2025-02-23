import axios from "axios";
import { api_url } from "../utils/api";

class UserService {
  registerUser(userData:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/user/register.php`,
          userData
        );

        // console.log("Register service: ", response);
        console.log(response.data);

        response.data.success ? resolve(true) : reject(false);
      } catch (error) {
        console.error("Register error:", error);
        reject(false);
      }
    });
  }

  loginUser(userData:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${api_url}/api_gulgonen/user/login.php`,
          userData
        );

        // console.log(`Response: ${response.data.data}`);
        if (response.data.success) {
          resolve(response);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.error("Login error:", error);
        reject(error);
      }
    });
  }

  getUserData(data:string) {
    var url = `${api_url}/api_gulgonen/user/get.php`;

    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => {
          response.data.success
            ? response.data.data !== null
              ? resolve(response.data.data)
              : resolve(null)
            : resolve(response.data.message);

          // if (response.data.success) {
          //   if (response.data.data !== null) {
          //     resolve(response.data.data);
          //   } else {
          //     resolve(null);
          //   }
          // } else {
          //   resolve(response.data.message);
          // }
        })
        .catch((error:any) => {
          reject("Bir hata oluştu!");
        });
    });
  }

  checkUserEmail(email:string) {
    var url = `${api_url}/api_gulgonen/user/check_email.php`;

    return new Promise((resolve, reject) => {
      axios
        .post(url, email)
        .then((response) => {
          if (response.data.success) {
            if (response.data.data !== null) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(false);
        });
    });
  }
}

export default UserService;
