<template>
  <div class="home">
    <div class="colom-container">
      <div class="colomn" v-for="i in 5" :key="i" ref="i">
        <FeedCard v-for="feed in feedCards(i)" :key="feed.id" :feedData="feed" />
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeFeed } from '@/apis/home';
import FeedCard from '@/components/FeedCard/FeedCard.vue';
import throttle from 'lodash/throttle';
import { mapState } from 'vuex';

export default {
  name: 'Home',

  data() {
    return {
      feedData: [],
      endId: '',
      fetching: false,
    };
  },

  computed: {
    ...mapState(['oid']),
  },

  created() {
    this.fetchData();
    this.handleScrollThrottle = throttle(this.handleScroll, 200);
  },

  mounted() {
    window.addEventListener('scroll', this.handleScrollThrottle); // dom操作放这
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScrollThrottle);
  },

  watch: {
    oid() {
      this.feedData = [];
      this.endId = '';
      this.fetchData();
    },
  },

  methods: {
    handleScroll() {
      if (this.fetching) return;
      const el = document.documentElement;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
        this.fetchData();
      }
    },

    feedCards(i) {
      return this.feedData.filter((item, index) => index % 5 === i - 1);
    },

    async fetchData() {
      if (this.fetching) return;
      this.fetching = true;
      try {
        const { data, success } = await getHomeFeed({
          oid: this.oid,
          cursor_score: this.endId,
        });
        if (success) {
          this.feedData.push(...data);
          this.endId = this.feedData[
            this.feedData.length - 1
          ].cursor_score;
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

  .categories {
    width: 80vw;
    height: 40px;
    // background-color: rgb(241, 243, 245);
    margin: 6px auto;
    border-radius: 5px;
  }

  .colom-container {
    display: flex;
    padding: 6px 120px;
    justify-content: space-around;

  }

  .colomn {
    margin: 0 15px;
  }
}
</style>
