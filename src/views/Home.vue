<template>
  <div class="home">
    <div class="column" v-for="i in 5" :key="i">
      <FeedCard v-for="feed in filterData(i)" :key="feed.id" :feedData="feed"></FeedCard>
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
      pageSize: 20,
    };

    try {
      const { data, success } = await getHomeFeed(params);
      if (success) {
        this.feedData = data;
        console.log(this.feedData);
      } else {
        throw new Error('接口调用错误');
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    /**
     * 把数据均分成5份
     * @param {number} i 第几列
     * @returns {array} 第 i 列的数据
     */
    filterData(i) {
      return this.feedData.filter((feed, index) => index % 5 === i - 1);
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
  padding: 20px 110px;
  justify-content: space-around;
}
</style>
