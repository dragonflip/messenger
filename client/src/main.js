import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import settings from "./plugins/settings";

// UNCOMMENT AFTER DEPLOY
// Vue.config.productionTip = false;

Vue.use(settings);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
