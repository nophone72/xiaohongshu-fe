<template>
  <div class="comments-container">
    <div class="title">
      <p>笔记评论</p>
    </div>
    <div class="comments" v-for="(comment, index) in commentList" :key="index">
      <div class="author">
        <div class="left">
          <img :src="comment.user.image">
          <div class="name-time">
            <span class="name">{{comment.user&&comment.user.nickname}}</span>
            <span class="time">{{setTime(comment.time)}}</span>
          </div>
        </div>

        <div class="icon-dianzan1 iconfont"><span>{{comment.likes}}</span></div>
      </div>
      <div class="commentContent" v-html="emojComment(comment.content)"></div>
      <div class="reply" v-for="subReply in comment.sub_comments" :key="subReply.id">
        <span class="reply-name">
          {{subReply.user.nickname}}
          <span v-if="authorId === subReply.user.id">(作者)</span>：
        </span>
        <span class="reply-content" v-html="emojComment(subReply.content)"></span>
      </div>
    </div>
    <div class="showMore">
      <span v-if="!commentList.length">
        <i class="icon-wantempty iconfont"></i>
        <span class="empty">啊哦，还没有评论哦~</span>
      </span>
      <span class="word" @click="showMore" v-else-if="commentList.length < commentsTotal">
        查看更多评论
      </span>
      <span v-else class="noword">
        没有更多了
      </span>
    </div>
  </div>
</template>

<script>
import { getComment } from '@/apis/note';
import { setTime, emojComment } from '@/utils';

export default {
  props: {
    authorId: String,
  },

  data() {
    return {
      commentList: [],
      endId: '',
      fetching: true,
      commentsTotal: 0,
    };
  },

  methods: {
    setTime,

    emojComment,

    async fetchComment() {
      try {
        const { data, success } = await getComment(this.$route.params.id, {
          page_size: 3,
          end_id: this.endId,
        });

        if (success) {
          const { comments, comments_total: commentsTotal } = data;
          this.commentsTotal = commentsTotal;
          this.commentList.push(...comments);
          if (comments.length) {
            this.endId = comments[comments.length - 1].id;
          }
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }

      this.fetching = false;
    },

    showMore() {
      if (this.fetching) return;
      this.fetching = true;
      this.fetchComment();
    },
  },

  created() {
    this.fetchComment();
  },
};
</script>

<style lang="less" scoped>
.comments-container {

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

  .showMore {
    width: 100%;
    text-align: center;
    margin-top: 15px;
    color: rgb(112, 153, 230);

    .iconfont {
      font-size: 150px;
    }

    .empty {
      display: block;
      margin-top: 20px;
      font-size: 28px;
    }

    .word {
      cursor: pointer;
    }
  }

  .comments {
    margin: 20px 0 0 15px;
    border-bottom: 1.5px solid rgba(237, 240, 233, 0.637);

    .author {
      width: 100%;
      height: 40.2px;
      display: flex;
      justify-content: space-between;

      .iconfont {
        font-size: 22px;
        color: rgb(163, 154, 154);

        span {
          font-size: 16px;
          margin-left: 5px;
        }
      }

      .left {
        display: flex;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .name-time {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .name {
            font-size: 14px;
          }

          .time {
            color: rgb(163, 154, 154);
            font-size: 13px;
          }
        }
      }
    }

    .commentContent {
      margin: 15px 0 18px 42px;
      font-size: 14px;
      line-height: 25px;
    }

    .reply {
      padding: 8px 15px;
      margin: 20px 0 20px 42px;
      font-size: 14px;
      color: #333;
      background-color: rgb(248, 250, 249);
      line-height: 25px;
      border-radius: 5px;
    }
  }
}
</style>
<style>
.emoj {
  width: 20px;
  height: 20px;
  margin: 0 2px;
  vertical-align: sub;
}
</style>
