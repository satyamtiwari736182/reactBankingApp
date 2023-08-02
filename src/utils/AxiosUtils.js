import axios from 'axios';

const client = axios.create({ baseURL: "http://localhost:8080/api/user" });
const axiosClient = ({ ...options }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    client.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    return client(options);
}
export default axiosClient;