<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="less">
@import '~@/assets/styles/index.less';
</style>
