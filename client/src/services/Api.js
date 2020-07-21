import axios from "axios";
import Storage from "./Storage";
import Config from "../config";

class Api {
  constructor() {
    let service = axios.create({
      baseURL: Config.API_BASE_URL,
    });
    service.interceptors.request.use(this.requestInterceptor);
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  requestInterceptor = async (config) => {
    const token = await Storage.getItem("access_token");
    const refresh_token = await Storage.getItem("refresh_token");
    const ps_token = await Storage.getItem("ps_access_token");
    const ps_refresh_token = await Storage.getItem("ps_refresh_token");
    config.headers["Content-Type"] = "application/json";
    if (ps_token && config.url.indexOf("pisp") !== -1) {
      config.headers["Authorization"] = "Bearer " + ps_token;
      config.headers["refresh_token"] = ps_refresh_token;
    } else if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["refresh_token"] = refresh_token;
    }
    return config;
  };

  handleSuccess(response) {
    if (response.status === 200 || response.status === 201) {
      const { data } = response;
      if (
        data &&
        data.access_token &&
        response.config.url.indexOf("pisp") !== -1
      ) {
        const { access_token, refresh_token } = data;
        Storage.setItem("ps_access_token", access_token);
        Storage.setItem("ps_refresh_token", refresh_token);
      } else if (data && data.access_token) {
        const { access_token, refresh_token } = data;
        Storage.setItem("access_token", access_token);
        Storage.setItem("refresh_token", refresh_token);
      } else if (!data && response.config.url.indexOf("saveData") !== -1) {
        response.data = {
          success: true,
        };
      }
    }
    return response;
  }

  handleError = (error) => {
    // switch (error.response.status) {
    //   case 401:
    //     this.redirectTo(document, "/");
    //     break;
    //   case 404:
    //     this.redirectTo(document, "/404");
    //     break;
    //   default:
    //     this.redirectTo(document, "/500");
    //     break;
    // }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path) {
    return this.service
      .get(path)
      .then((response) => Promise.resolve(response.data, response.status));
  }

  patch(path, payload) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => Promise.resolve(response.data, response.status));
  }

  post(path, payload) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => Promise.resolve(response.data, response.status));
  }
}

export default new Api();
