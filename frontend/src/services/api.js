import axios from "axios";

export const contactListApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 8 * 1000,
});

// export const contactListApi = axios.create({
//   baseURL: "https://m6-desafio-fullstack-eldertakahashi.onrender.com",
//   timeout: 8 * 1000,
// });
