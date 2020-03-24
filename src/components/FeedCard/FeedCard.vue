<template>
  <div class="feed-card" @click="handleClick">
    <i class="icon-play iconfont" v-if="feedData.type === 'video'"></i>
    <img class="cover" v-lazy="feedData.cover.url" :style="coverStyle">
    <h3 class="title">{{ feedData.title }}</h3>
    <div class="info">
      <div class="user">
        <img class="user-img" v-lazy="feedData.user.images" />
        <span class="name">{{ feedData.user.nickname }}</span>
      </div>
      <span class="icon"><i class="iconfont icon-like2"></i>{{ feedData.likes }}</span>
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
      const { cover } = this.feedData;
      const { height, width } = cover;

      return {
        width: '220px',
        // eslint-disable-next-line no-mixed-operators
        height: `${height / width * 220}px`,
      };
    },
  },

  methods: {
    handleClick() {
      this.$router.push({ path: `/note/${this.feedData.id}` });
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

  &:hover {
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 2, 4, .2);
    }
  }

  .icon-play {
    color: rgb(230, 238, 238);
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .cover {
    width: 100%;
    background: #ddd;
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
        height: 35px;
        border-radius: 50%;
        margin: 0 10px 0 0;
      }

      .name {
        font-size: 13px;
      }
    }

    .icon .icon-like2 {
      color: red;
      padding: 5px;
    }
  }
}
</style>
