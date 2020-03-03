<template>
  <div class="CN-container">
    <div class="colom" v-for="i in 4" :key="i">
      <FeedCard v-for="note in noteCard(i) " :key="note.id" :feedData="note" />
    </div>
  </div>
</template>

<script>
import { getUserCollect } from '@/apis/userCollect';
import { getUserNote } from '@/apis/userNote';
import FeedCard from '@/components/FeedCard/FeedCard.vue';
import throttle from 'lodash/throttle';

export default {
  data() {
    return {
      noteList: [],

      page: 1,
      pageSize: 12,

      num: 1,
      bottom_start: '',

      fetching: false,
    };
  },

  props: {
    status: String,
  },

  created() {
    this.fetchData();
    this.handleScrollThrottle = throttle(this.handleScroll, 200);
  },

  mounted() {
    window.addEventListener('scroll', this.handleScrollThrottle);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScrollThrottle);
  },

  watch: {
    status() {
      this.clear();
      this.fetchData();
    },
  },

  methods: {
    clear() {
      this.noteList = [];

      this.page = 1;
      this.pageSize = 12;

      this.num = 1;
      this.bottom_start = '';

      this.fetching = false;
    },

    fetchData() {
      if (this.status === 'notes') this.fetchUserNote();
      else if (this.status === 'collected') this.fetchUserCollect();
    },

    handleScroll() {
      if (this.fetching) return;
      const el = document.documentElement;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) {
        this.page += 1;
        this.fetching = true;
        this.fetchData();
      }
    },

    noteCard(i) {
      return this.noteList.filter((item, index) => index % 4 === i - 1);
    },

    async fetchUserNote() {
      try {
        const { data, success } = await getUserNote(this.$route.params.id, {
          page_size: this.pageSize,
          page: this.page,
        });

        if (success) {
          const { notes } = data;
          this.noteList.push(...notes);
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }
      this.fetching = false;
    },

    async fetchUserCollect() {
      try {
        const { data, success } = await getUserCollect(this.$route.params.id, {
          num: this.num,
          bottom_start: this.bottom_start,
        });

        if (success) {
          this.noteList.push(...data);
          this.bottom_start = this.noteList[this.noteList.length - 1].id;
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
.CN-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  .colom {
    margin: 0 15px;
    width: 220px;
  }
}
</style>
