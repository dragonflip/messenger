import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 576,
      sm: 768,
      md: 991,
      lg: 1200,
    },
    mobileBreakpoint: 768,
  },
});
