import axios from "axios";
import store from "@/store";
import router from "@/router";
import Swal from "sweetalert2";
import VueAxios from "vue-axios";

class ApiService {
  static vueInstance;

  static init(app) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      "https://service-project-yr23.onrender.com";
    ApiService.vueInstance.axios.interceptors.request.use(
      (config) => {
        const token = JSON.parse(localStorage.getItem("user"))?.token || "";
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    ApiService.vueInstance.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Session Expired!",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            router.push("sign-in");
            store.dispatch("logout");
          });
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  static get(resource, slug = "") {
    if (slug === "") {
      return ApiService.vueInstance.axios.get(`${resource}`);
    }
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  static post(resource, params, isFormData = false) {
    let headers = {};
    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }
    return ApiService.vueInstance.axios.post(`${resource}`, params, {
      headers,
    });
  }

  static put(resource, params) {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  static delete(resource, slug) {
    return ApiService.vueInstance.axios.delete(`${resource}/${slug}`);
  }
}

export default ApiService;
