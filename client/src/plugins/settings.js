import { io } from "socket.io-client";

export default {
  install(Vue, options) {
    Vue.prototype.socket = io({
      transports: ["websocket"],
      query: {
        token: localStorage.token || null,
        user_id: localStorage.user_id || null,
        visibility: document.visibilityState === "visible",
      },
    });

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
