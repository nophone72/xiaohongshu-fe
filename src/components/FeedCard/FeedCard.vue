<template>
  <div class="feed-card" >
    <i class="icon-bofang iconfont" v-if="feedData.type === 'video'"></i>
    <img class="cover" :src="feedData.cover.url" :style="coverStyle">
    <h3 class="title">{{ feedData.title }}</h3>
    <div class="info">
      <div class="user">
        <img class="user-img" :src="feedData.user.image" />
        <span class="name">{{ feedData.user.nickname }}</span>
      </div>
      <span class="icon"><i class="iconfont icon-like"></i>{{ feedData.likes }}</span>
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
  position: relative;

  .icon-bofang {
    color: rgb(230, 238, 238);
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .cover {
    width: 100%;

  }

  .title {
    font-size: 16px;
    padding: 10px;
    line-height: 20px;
    letter-spacing: 1.2px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;

    .user {
      display: flex;
      align-items: center;

      .user-img {
        width: 35px;
        border-radius: 50%;
        margin: 0 10px 0 0;
      }

      .name {
        font-size: 13px;
      }
    }

    .icon .icon-like {
      color: red;
      padding: 5px;
    }
  }
}
</style>
