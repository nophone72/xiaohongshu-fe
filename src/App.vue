<template>
  <div id="app">
    <MyHeader />
    <router-view />
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
</style>
