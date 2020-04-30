import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./assets/style/gg.scss";
import "./assets/style/anm.scss";
import "./assets/style/cover.scss";

import animated from "animate.css";

Vue.config.productionTip = false;

Vue.use(animated);
Vue.use(ElementUI);


function startup() {
	new Vue({
		router,
		// store,
		render: (h) => h(App),
	}).$mount("#app");
}

// eslint-disable-next-line
startup();
