import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";as
import routes from "./router";

Vue.use(VueRouter);

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const router = new VueRouter({
  mode: "hash",
  routes
});

router.beforeEach((to, from, next) => {
  /* if (to.path == "/") {
    store.commit("setRoot", true);
  }
  if (to.matched.length > 1) {
    store.commit("setSubjectName", to.matched[0].name);
    store.commit("setChildName", to.name);
  } else {
    store.commit("setSubjectName", to.name);
  }
  store.commit("setRoot", false); */
  next();
});

export default router;
