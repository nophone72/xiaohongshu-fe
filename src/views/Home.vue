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

export default {
  name: 'Home',

  data() {
    return {
      feedData: [],
    };
  },

  async created() {
    const params = {
      oid: 'recommend',
      page: 1,
      page_size: 10,
    };

    try {
      const { data, success } = await getHomeFeed(params);
      if (success) {
        this.feedData = data;
      } else {
        throw new Error('接口调用错误');
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    feedCards(i) {
      return this.feedData.filter((item, index) => index % 5 === i - 1);
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
}
</style>
