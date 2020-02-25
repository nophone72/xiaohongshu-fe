<template>
  <div class="comments-container">
    <div class="title">
      <p>笔记评论</p>
    </div>
    <div class="comments" v-for="(comment, index) in commentList" :key="index">
      <div class="author">
        <div class="left">
          <img src="" />
          <div class="name-time">
            <span class="name">{{comment.user.name}}</span>
            <span class="time"></span>
          </div>
        </div>

        <div class="thumb"></div>
      </div>
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
    position: relative;

    p {
      margin-left: 15px;
    }

    &::before {
      content: "";
      width: 6px;
      height: 100%;
      display: inline-block;
      background-color: rgb(233, 36, 36);
      position: absolute;
    }
  }

  .comments {
    width: 485px;

    .author {
      width: 100%;
      height: 40.2px;
      background-color: rebeccapurple;
      display: flex;
      justify-content: space-between;
    }

    .commentContent {
      width: 100%;
      height: 50px;
      background-color: rgb(209, 195, 70);
    }
  }
}
</style>
