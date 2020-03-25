<template>
<div class="related-container" @scroll="handleScroll" :class="{down: fetching}">
  <div class="head">相关笔记</div>
  <a
    class="related-content"
    v-for="related in relatedList"
    :key="related.id"
    @click="handleClick(related.id)"
  >
    <span class="cover"><img :src="related.cover.url"></span>
    <span class="word">
      <span class="title">{{related.title}}</span>
      <span class="liked"><i class="icon-like2 iconfont"></i>{{related.likes}}</span>
    </span>
  </a>
  <div class="showMore">
    <Loading class="loading" v-if="fetching" />
    <div v-if="!fetching&&empty">没有更多啦</div>
  </div>
</div>
</template>

<script>
import { getRelated } from '@/apis/note';
import Loading from '@/components/Loading/Loading.vue';

export default {
  data() {
    return {
      relatedList: [],
      page: 1,
      fetching: false,
      empty: false,
      pageSize: 9,
    };
  },

  components: {
    Loading,
  },

  created() {
    this.fetchRelated();
  },

  watch: {
    $route() {
      this.clearAll();
      this.fetchRelated();
    },
  },

  methods: {
    clearAll() {
      this.relatedList = [];
      this.page = 1;
      this.fetching = false;
      this.empty = false;
    },

    handleClick(id) {
      this.$router.push({ path: `/note/${id}` });
    },

    handleScroll(e) {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 50) {
        if (this.fetching || this.empty) return;
        this.page += 1;
        this.fetchRelated();
        this.fetching = true;
      }
    },

    async fetchRelated() {
      try {
        const { data, success } = await getRelated(this.$route.params.id, {
          pageSize: this.pageSize,
          page: this.page,
        });

        if (success) {
          this.relatedList.push(...data);
          this.empty = data.length < this.pageSize;
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }

      this.fetching = false;
    },
  },
};
</script>

<style lang="less" scoped>
.related-container {

  border: 1px solid #dfdbdb;
  width: 100%;
  height: 430px;
  overflow: auto;
  border-radius: 5px;

  .head {
    font-size: 16px;
    padding: 10px 20px;
    border-bottom: 1px solid #dfdbdb;
  }

  .showMore {
    text-align: center;
    color: rgb(134, 165, 224);
    position: relative;

    .loading {
      position: absolute;
      bottom: 0;
      left: 60px;
    }
  }

  .related-content {
    display: block;
    height: 80px;
    margin: 10px 20px;
    text-decoration: none;
    color: #555;
    display: flex;

    &:hover {
      cursor: pointer;
      color:#c0392b
    }

    .cover {
      img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        object-fit: cover;
      }
    }

    .word {
      margin: 5px 10px;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      flex-direction: column;

      .title {
        height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }

      .liked {
        margin-top: 10px;

        .iconfont {
          font-size: 12px;
          margin-right: 8px;
        }

      }

    }
  }
}

.down {
  opacity: 0.6;
}
</style>
