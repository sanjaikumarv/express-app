import axios from "axios";
import { LOGOUT, REFRESH } from "./endpoints";
import BrowserDatabase from "@/utils/BrowserDatabase/BrowserDatabase";

let accessToken: string | null = BrowserDatabase.getItem("accessToken");

const tokenStorage = {
  setToken: (token: string) => {
    accessToken = token;
    BrowserDatabase.setItem(token, "accessToken");
  },
  getToken: () => {
    if (!accessToken) {
      accessToken = BrowserDatabase.getItem("accessToken");
    }
    return accessToken;
  },
  clearToken: () => {
    accessToken = null;
    BrowserDatabase.deleteItem("accessToken");
  },
};

export const makeSessionRefresh = async (isAccessTokenExist: string | null) => {
  try {
    const response = await axios.get(REFRESH);
    const newAccessToken = response.data.accessToken;
    if (!newAccessToken && isAccessTokenExist) {
      window.location.href = LOGOUT;
    }
    tokenStorage.setToken(newAccessToken);
    return newAccessToken;
  } catch (error: unknown) {
    console.log(error);
    tokenStorage.clearToken();
    window.location.href = LOGOUT;
  }
};

export default tokenStorage;
