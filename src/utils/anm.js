export default class Anm {
  constructor() {
    this.stepTimer = null;
  }

  static getStepTitle(title) {
    this.clearTimer(this.stepTimer);
    let index = 0;
    this.stepTimer = setInterval(() => {
      index++;
      if (index > title.length) {
        this.clearTimer(this.stepTimer);
        return;
      }
      // eslint-disable-next-line
      // debugger;
      return title.substring(0, index);
    }, 100);
  }

  clearTimer(timer) {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
}
