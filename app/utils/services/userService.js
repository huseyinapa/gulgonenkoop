import axios from "axios";

class UserService {
  registerUser(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `https://www.gulgonenkoop.com/api_gulgonen/user/register.php`,
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

  loginUser(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `https://www.gulgonenkoop.com/api_gulgonen/user/login.php`,
          userData
        );

        // console.log(`Response: ${response.data.data}`);
        if (response.data.success) {p
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

  getUser(data) {
    var url = `https://www.gulgonenkoop.com/api_gulgonen/user/get.php`;

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
        .catch((error) => {
          reject("Bir hata oluştu!");
        });
    });
  }

  getUserData(email) {
    var url = `https://www.gulgonenkoop.com/api_gulgonen/user/check_email.php`;

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
