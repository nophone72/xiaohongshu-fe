<template>
  <div class="feed-card">
    <img class="cover" :src="feedData.cover.url" :style="coverStyle">
    <h3 class="title">{{ feedData.title }}</h3>
    <div class="info">
      <div class="user">
        <img class="user-img" :src="feedData.user.image" />
        <span class="name">{{ feedData.user.nickname }}</span>
      </div>

      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feedData: Object,
  },

  computed: {
    coverStyle() {
      const { cover: { height, width } } = this.feedData;

      return {
        width: '220px',
        // eslint-disable-next-line no-mixed-operators
        height: `${height / width * 220}px`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.feed-card {
  width: 220px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  margin: 0 0 20px 0;
  border-radius: 10px;
  overflow: hidden;

  .cover {
    width: 100%;
  }

  .title {
    font-size: 14px;
    padding: 10px;
    line-height: 20px;
  }

  .user {
    padding: 5px;

    .user-img {
      width: 50px;
    }
  }
}
</style>
