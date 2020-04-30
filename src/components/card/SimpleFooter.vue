<template>
  <div class="mcFooter" v-cloak>{{ content }}</div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "版权所有：@2020"
    }
  }
};
</script>

<style lang="scss" scope>
.mcFooter {
  position: relative;
  width: 100%;
  height: 28px;
  // line-height: 28px;
  background: linear-gradient(to right, #0f0f24, #1b1b43 21%);
  color: #ccc;
  font-size: 12px;
  text-align: center;
}
</style>
