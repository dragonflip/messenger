import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
// import 'mdbvue/lib/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import vuetify from "@/plugins/vuetify";

Vue.use(VueMaterial);
Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
