<template>
  <div class="UCN-container">
    <div class="CN-container" v-if="allData.length">
      <Fall :fetching="fetching" :num="4" :data="orignData" />
    </div>
    <div class="empty" v-else-if="!fetching">
      <i class="icon-wantempty iconfont"></i>
      <span class="word">这里还是空的哦</span>
    </div>
  </div>
</template>

<script>
import { getUserCollect } from '@/apis/userCollect';
import { getUserNote } from '@/apis/userNote';
import throttle from 'lodash/throttle';
import Fall from '@/components/Fall.vue';


export default {
  data() {
    return {
      page: 1,
      pageSize: 12,

      num: 1,
      bottom_start: '',

      fetching: false,
      allData: [],

      orignData: [],
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
      this.page = 1;
      this.pageSize = 12;

      this.num = 1;
      this.bottom_start = '';
      this.allData = [];
      this.orignData = [];

      this.fetching = false;
    },

    fetchData() {
      if (this.fetching) return;
      this.fetching = true;
      if (this.status === 'note') this.fetchUserNote();
      else if (this.status === 'collect') this.fetchUserCollect();
    },

    handleScroll() {
      if (this.fetching) return;
      const el = document.documentElement;
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 150
        && this.orignData.length
      ) {
        this.page += 1;
        this.fetchData();
      }
    },

    async fetchUserNote() {
      this.fetching = true;
      try {
        const { data, success } = await getUserNote(this.$route.params.id, {
          page_size: this.pageSize,
          page: this.page,
        });

        if (success) {
          const { notes } = data;
          this.orignData = notes;
          this.allData.push(...notes);
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
          if (data.length) {
            this.orignData = data;
            this.bottom_start = data[data.length - 1].id;
            this.allData.push(...data);
          }
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
    Fall,
  },
};
</script>

<style lang="less" scoped>
.CN-container {
  margin-top: 20px;
}

.empty {
  margin: 60px auto;
  width: 400px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: rgb(112, 153, 230);

  .word {
    font-size: 20px;
    font-weight: 300;
  }

  .iconfont {
    font-size: 100px;
  }
}
</style>
