import axios from "axios";
import VueAxios from "vue-axios";

class ApiService {
  static vueInstance;

  static init(app) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      "https://service-project-yr23.onrender.com";
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
