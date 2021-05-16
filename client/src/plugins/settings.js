import { io } from "socket.io-client";

export default {
  install(Vue, options) {
    Vue.prototype.socket = io({ transports: ["websocket"] });

    Vue.prototype.isMobile = function () {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch {
        return false;
      }
    };
  },
};
