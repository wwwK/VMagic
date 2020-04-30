<template>
  <div class="view-box">
    <slot name="title">
      <div class="title">
        <span class="vline"></span>
        <span v-cloak>{{ boxTitle }}</span>
        <span class="gardient"></span>
      </div>
    </slot>
    <section class="body">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boxTitle: '',
      timerID: null,
      show: false,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  mounted () {
    this.show = true;
    this.getStepTitle();
  },
  methods: {
    getStepTitle () {
      if (this.timerID) {
        this.clearTimer();
      }
      let index = 0;
      this.timerID = setInterval(() => {
        index++;
        if (index > this.title.length) {
          this.clearTimer();
          return;
        }
        // eslint-disable-next-line
        // debugger;
        this.boxTitle = this.title.substring(0, index);
      }, 100);
    },
    clearTimer () {
      clearInterval(this.timerID);
      this.timerID = null;
    },
  },
};
</script>

<style lang="scss">
.view-box {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
  // z-index: 10;

  > .title {
    position: relative;
    height: 38px;
    line-height: 36px;
    font-size: 20px;
    color: #4765cd;
    border-bottom: 4px solid #7a9aef;

    .gardient {
      position: absolute;
      height: 4px;
      bottom: -4px;
      width: calc(100% - 20px);
      left: 10px;
      z-index: 1;
      background: radial-gradient(rgba(0, 0, 0, 0.3), transparent);
      border: none;
    }

    .vline {
      position: absolute;
      display: block;
      top: 9px;
      left: 10px;
      padding: 0;
      height: 20px;
      width: 5px;
      background: #4765cd;
    }

    span {
      padding-left: 20px;
      // border-left: 5px solid #4765cd;
    }
  }

  > section {
    position: relative;
    width: 100%;
    height: calc(100% - 38px);
    line-height: calc(100% - 38px);
    text-align: center;
    padding: 5px 0;
    overflow: hidden;
  }
}
</style>
