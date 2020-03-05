<template>
  <div class="all-container">
    <i class="icon-ziyuan iconfont" @click="handleClick('left')"></i>
    <div class="cat-container" ref="catContainer">
      <div class="content">
        <div
          class="title"
          v-for="cat in catList"
          :key="cat.oid"
          @click="setOid(cat.oid)"
          :class="{active: cat.oid === $store.state.oid}"
        >{{cat.name}}</div>
      </div>
    </div>
    <i class="icon-ziyuan1 iconfont" @click="handleClick('right')"></i>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getCategories } from '@/apis/categories';

export default {
  data() {
    return {
      catList: [],
    };
  },

  created() {
    this.fetchCategories();
  },

  methods: {
    handleClick(direction) {
      if (direction === 'left') {
        this.$refs.catContainer.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else if (direction === 'right') {
        this.$refs.catContainer.scrollTo({
          left: this.$refs.catContainer.scrollWidth,
          behavior: 'smooth',
        });
      }
    },

    async fetchCategories() {
      try {
        const { data, success } = await getCategories();
        if (success) {
          this.catList = data;
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }
    },

    ...mapMutations(['setOid']),
  },
};
</script>

<style lang="less" scoped>
.all-container {
  position: relative;
  margin-left: 100px;
  bottom: -28px;

  .iconfont {
    color: rgb(207, 209, 209);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
  }

  .icon-ziyuan {
    left: -15px;
  }

  .icon-ziyuan1 {
    right: -15px;
  }

  .cat-container {
    width: 48vw;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .content {
      display: inline-block;
      white-space: nowrap;
    }

    .title {
      display: inline-block;
      margin: 8px 10px;
      padding: 2px 5px 0 5px;
      height: 22px;
      border: 1px solid rgb(236, 211, 211);
      border-radius: 5px;
      box-shadow: 0.5px 0.5px wheat;
      cursor: pointer;

        &.active {
          box-shadow: 0.5px 0.5px 3px 1px rgb(223, 199, 199);
          background-color: rgb(241, 180, 180);
        }
    }

  }
}
</style>
