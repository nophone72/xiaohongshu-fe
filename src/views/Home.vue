<template>
  <Fall :fetching="fetching" ref="fall" :num="5" :data="orignData"/>
</template>

<script>
import { getHomeFeed } from '@/apis/home';
import throttle from 'lodash/throttle';
import { mapState, mapMutations } from 'vuex';
import Fall from '@/components/Fall.vue';

export default {
  name: 'Home',

  data() {
    return {
      feedData: [],
      page: 1,
      pageSize: 10,
      fetching: false,
      orignData: [],
    };
  },

  computed: {
    ...mapState(['oid']),
  },

  created() {
    this.setIsShowCat(true);
    this.fetchData();
    this.handleScrollThrottle = throttle(this.handleScroll, 200);
  },

  mounted() {
    window.addEventListener('scroll', this.handleScrollThrottle); // dom操作放这
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScrollThrottle);
    this.setIsShowCat(false);
  },

  watch: {
    oid() {
      this.feedData = [];
      this.endId = '';
      this.$refs.fall.reset();
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
      return this.feedData.filter((item) => item.column === i - 1);
    },

    async fetchData() {
      if (this.fetching) return;
      this.fetching = true;
      try {
        const { data, success } = await getHomeFeed({
          category: this.oid,
          page: this.page,
          pageSize: this.pageSize,
        });
        if (success) {
          this.orignData = data;
          this.page += 1;
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }
      this.fetching = false;
    },

    ...mapMutations(['setIsShowCat']),
  },

  components: {
    Fall,
  },
};
</script>

<style lang="less" scoped>
</style>
