import axios from "axios";

export const API_service = axios.create( {
    baseURL:'http://localhost:3333/api/v1/',
    withCredentials:true
}
)