import axios from "axios";

const brasilApiClient = axios.create({
  baseURL: "https://brasilapi.com.br/api/",
});

export { brasilApiClient };
