<template>
  <div class="comments-container">
    <div class="title">笔记评论</div>
    <div
      class="comments"
      v-for="(comment, index) in commentList"
      :key="index"
    >
      <div class="author"></div>
      <div class="commentContent">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.comments-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .title {
    width: 100%;
    font-size: 16px;
    font-weight: bold;

    &::before {
      content: '';
      width: 25px;
      height: 10px;
      display: inline-block;
      background-color: rgb(233, 36, 36);
    }
  }

  .comments {
    width: 485px;

    .author {
      width: 100%;
      height: 40.2px;
      background-color: rebeccapurple
    }

    .commentContent {
      width: 100%;
      height: 50px;
      background-color: rgb(209, 195, 70);
    }
  }
}
</style>
