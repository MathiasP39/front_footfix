import axios from "axios";

export const API_service = axios.create( {
    baseURL: import.meta.env.VITE_BACK_URL,
    withCredentials:true
}
)