<template>
  <div class="cat-container">
    <div class="content">
       <div
          class="title"
          v-for="cat in catList"
          :key="cat.oid"
          @click="setOid(cat.oid)"
        >{{cat.name}}</div>
    <i class="icon-ziyuan1 iconfont"></i>
    </div>
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
.cat-container {
  width: 48.7vw;
  margin-left: 100px;
  overflow: auto;
  position: relative;

    &::-webkit-scrollbar {
      display: none;
    }


  .content {
    display: inline-block;
    white-space: nowrap;
  }

  .iconfont {
    color: rgb(154, 158, 158);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
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
  }
}
</style>
