<template>
  <div class="home">
    <div class="colomn" v-for="i in 5" :key="i">
      <FeedCard v-for="feed in feedCards(i)" :key="feed.id" :feedData="feed" />
    </div>
  </div>
</template>

<script>
import { getHomeFeed } from '@/apis/home';
import FeedCard from '@/components/FeedCard/FeedCard.vue';
import throttle from 'lodash/throttle';

export default {
  name: 'Home',

  data() {
    return {
      feedData: [],
      params: {
        oid: 'homefeed.fitness_v2',
        endId: '',
      },
      fetching: false,
    };
  },

  created() {
    this.fetchData();
    this.handleScrollThrottle = throttle(this.handleScroll, 200);
  },

  mounted() {
    window.addEventListener('scroll', this.handleScrollThrottle);// dom操作放这
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScrollThrottle);
  },

  methods: {
    handleScroll() {
      if (this.fetching) return;
      const el = document.documentElement;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
        this.fetching = true;
        this.fetchData();
      }
    },

    feedCards(i) {
      return this.feedData.filter((item, index) => index % 5 === i - 1);
    },

    async fetchData() {
      try {
        const { data, success } = await getHomeFeed(this.params);
        console.log(data, success);
        if (success) {
          this.params.endId = this.feedData[this.feedData.length - 1].cursor_score;
          this.feedData.push(...data);
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }
      this.fetching = false;
    },
  },

  components: {
    FeedCard,
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  padding: 20px 120px;
  justify-content: space-around;

  .colomn {
    margin: 0 15px;
  }
}
</style>
