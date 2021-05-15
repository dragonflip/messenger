import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import socket from "./plugins/socket";

// UNCOMMENT AFTER DEPLOY
// Vue.config.productionTip = false;

Vue.use(socket);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
