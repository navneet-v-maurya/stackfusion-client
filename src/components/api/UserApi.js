import axios from "axios";

let URl = "https://stackfusion-server.onrender.com/user";

export const addUserApi = (data) => axios.post(`${URl}/adduser`, data);
export const getDataApi = () => axios.get(`${URl}/getdata`);
