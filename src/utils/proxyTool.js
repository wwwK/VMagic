export default class ProxyTool {
  constructor() {}

  static Reactive(data, cb) {
    let res = null;
    let timer = null;

    res = data instanceof Array ? [] : {};
    debugger;//eslint-disable-line
    for (let key in data) {
      if (typeof data[key] === "object") {
        res[key] = ProxyTool.Reactive(data[key], cb);
      } else {
        res[key] = data[key];
      }
    }

    return new Proxy(res, {
      get(target, key) {
        return Reflect.get(target, key);
      },
      set(target, key, val) {
        let res = Reflect.set(target, key, val);
        clearTimeout(timer);
        timer = setTimeout(() => {
          cb && cb();
        }, 0);
        return res;
      },
    });
  }
}
