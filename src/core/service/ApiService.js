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
    let lastNotificationTime = 0;
    const notificationInterval = 2000;
    ApiService.vueInstance.axios.interceptors.response.use(
      async (response) => {
        if (
          !localStorage.getItem("user") &&
          router.currentRoute._value.path !== "/log-in" &&
          router.currentRoute._value.path !== "/register"
        ) {
          const currentTime = Date.now();
          if (currentTime - lastNotificationTime > notificationInterval) {
            lastNotificationTime = currentTime;
            await Swal.fire({
              title: "Session Expired!",
              icon: "warning",
              showConfirmButton: false,
              timer: 2000,
            }).then(async () => {
              await store.dispatch("LogOut");
            });
          }
        }
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
            store.dispatch("LogOut");
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

  static post(resource, params) {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  static put(resource, params) {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  static delete(resource, slug) {
    return ApiService.vueInstance.axios.delete(`${resource}/${slug}`);
  }
}

export default ApiService;
