import { io } from "socket.io-client";

export default {
  install(Vue, options) {
    Vue.prototype.socket = io({ transports: ["websocket"] });
  },
};
