<template>
  <div id="app">
    <MyHeader />
    <div><router-view /></div>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader.vue';

export default {
  components: {
    MyHeader,
  },
};
</script>

<style lang="less">
@import '~@/assets/styles/index.less';

body {
  min-height: 101vh;
}
</style>
