<template>
  <div class="mcHeader" v-cloak>
    <div class="left-nav">
      <el-button size="mini" icon="el-icon-arrow-left" @click="goHome()"></el-button>
      <span>{{subjectName}}</span>
    </div>
    <div class="center">
      <img src="../../../assets/logo.png" />
      <div class="title" v-cloak>{{appName}}</div>
      <div class="line"></div>
      <span class="date">{{nowDate}}</span>
      <span class="time">{{nowTime}}</span>
    </div>
    <div class="right-nav">
      <label>
        <i class="el-icon-s-custom"></i>
        <div>{{userName}}</div>
      </label>
      <el-button size="mini" icon="el-icon-s-tools"></el-button>
      <el-button size="mini" icon="el-icon-switch-button"></el-button>
    </div>
  </div>
</template>

<script>
import { getAppName } from "../../../api/appInfoService";
import Format from "../../../utils/format";
export default {
  data() {
    return {
      appName: "",
      timerID: null,
      now: "",
      nowDate: "",
      nowTime: "",
      subjectName: "",
      userName: "Admin"
    };
  },
  mounted() {
    this.getAppName();
    this.subjectName = this.$store.state.page.currentSubjectName;
    this.getTime();
    this.timerID = setInterval(this.getTime, 1000);
  },
  methods: {
    getTime() {
      this.now = new Date();
      this.nowDate = Format.formatDate(this.now, "yyyy/MM/dd");
      this.nowTime = Format.formatDate(this.now, "HH:mm:ss");
    },
    goHome() {
      this.$store.commit("setSubjectName", "");
      this.$router.push({
        path: "/"
      });
    },
    async getAppName() {
      let res = await getAppName();
      this.appName = res.data.content;
    }
  },
  destroyed() {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }
};
</script>

<style lang="scss" scope>
.mcHeader {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../../assets/img/main/header-bg.png") center center
    no-repeat;
  background-size: cover;

  .center {
    position: absolute;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-items: center;
    align-items: center;

    img {
      height: 34px;
      width: auto;
      margin-top: 4px;
    }

    .title {
      font-family: "cf_MsYh_Bold";
      color: #26265d;
      font-size: 30px;
      font-weight: bold;
      text-align: justify;
      text-align-last: justify;
      margin: 0 10px;
    }

    .line {
      height: 40px;
      width: 1px;
      background: #7d869a;
    }

    // 不能自动宽度，防止居中抖动
    .date {
      color: #26265d;
      font-family: "cf_BebasNb";
      font-size: 40px;
      margin: 0 10px;
      min-width: 10px;
      text-align: center;
    }

    .time {
      color: #4665cc;
      font-family: "cf_BebasNb";
      font-size: 40px;
      min-width: 100px;
      text-align: center;
    }
  }

  .el-button {
    background: #26265d;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.65);
    color: #fff;
    font-size: 20px;
    border-radius: 0;
    vertical-align: middle;
  }

  .left-nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;

    span {
      vertical-align: middle;
      margin-left: 10px;
    }

    .el-button {
      font-size: 24px;
      padding: 4px 2px;
      height: 36px;
      border-radius: 0 5px 5px 0;
    }
  }

  .right-nav {
    position: absolute;
    right: 10px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: right;
    align-items: center;

    .el-button {
      padding: 7px 11px;
      width: 45px;
    }

    label {
      display: inline-block;
      height: 44px;
      line-height: 22px;
      color: #333;
      font-size: 14px;
      text-align: center;
      margin-right: 10px;

      i {
        font-size: 16px;
        border: 1px solid #333;
        border-radius: 100%;
        padding: 4px;
        margin-bottom: -4px;
      }
    }
  }
}
</style>