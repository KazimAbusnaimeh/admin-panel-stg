import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import router from "./router";
import ApiService from "./core/service/ApiService";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);

ApiService.init(app);

app.mount("#app");
