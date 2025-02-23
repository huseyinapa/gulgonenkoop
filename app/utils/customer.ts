import axios from "axios";
import { api_url } from "./api";

interface CustomerResponse {
    success: boolean;
    data: {
        id: string;
        name: string;
        surname: string;
        email: string;
        permission: string;
        last_login: string;
        date: string;
    } | null;
    message: string;
}

class CustomerManager {
    async login(data: FormData): Promise<boolean> {
        try {
            const response = await axios.post(
                `${api_url}/api_gulgonen/customer/login.php`,
                data
            );

            if (response.data.success && response.data.data) {
                const userData = response.data.data;

                localStorage.setItem("id", userData.id);
                localStorage.setItem("name", userData.name);
                localStorage.setItem("surname", userData.surname);
                localStorage.setItem("email", userData.email);
                localStorage.setItem("permission", userData.permission);
                localStorage.setItem("last_login", userData.last_login);
                localStorage.setItem("date", userData.date);

                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    }

    async register(data: FormData): Promise<boolean> {
        try {
            const response = await axios.post(
                `${api_url}/api_gulgonen/customer/register.php`,
                data
            );
            return response.data.success;
        } catch (error) {
            console.error("Register error:", error);
            return false;
        }
    }
}

export default CustomerManager; 