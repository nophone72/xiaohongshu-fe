<template>
  <div class="fall-container">
    <div class="colom-container" :class="{containerLoading: fetching}">
      <div class="colomn" v-for="i in num" :key="i" ref="columns">
        <FeedCard v-for="feed in feedCards(i)" :key="feed.data.id" :feedData="feed.data" />
      </div>
    </div>
    <Loading class="loading" v-if="fetching" />
  </div>
</template>

<script>
import FeedCard from '@/components/FeedCard/FeedCard.vue';
import Loading from '@/components/Loading/Loading.vue';


export default {
  data() {
    return {
      noteList: [],
    };
  },

  props: {
    fetching: Boolean,
    num: Number,
    data: Array,
  },

  watch: {
    data() {
      this.pushData(this.data);
    },
  },

  mounted() {
    this.pushData(this.data);
  },

  methods: {
    reset() {
      this.noteList = [];
    },

    feedCards(i) {
      return this.noteList.filter((item) => item.column === i - 1);
    },

    pushData(data) {
      const { columns } = this.$refs;

      const realPushData = (i) => {
        if (i >= data.length) return;
        const min = Math.min(...columns.map((item) => item.clientHeight));
        const index = columns.findIndex((item) => item.clientHeight === min);

        this.noteList.push({
          column: index,
          data: data[i],
        });

        requestAnimationFrame(() => realPushData(i + 1));
      };

      requestAnimationFrame(() => realPushData(0));
    },
  },

  components: {
    FeedCard,
    Loading,
  },
};
</script>

<style lang="less" scoped>
.fall-container {
  position: relative;
  min-height: calc(100vh - 100px);

  .loading {
    position: absolute;
    bottom: 180px;
    left: 50%;
    transform: translateX(-50%);
  }

  .colom-container {
    display: flex;
    padding: 6px 120px;
    justify-content: center;
    align-items: flex-start;
  }

  .containerLoading {
    opacity: 70%;
    filter: blur(.5px);
  }

  .colomn {
    margin: 0 15px;
    width: 220px;
  }
}
</style>
