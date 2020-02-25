<template>
  <div class="container">
    <div class="note-container">
      <div class="imgs">
        <Swiper :imgList="noteData.images_list" />
      </div>
      <div class="word">
        <Aticle
          :title="noteData.title"
          :description="noteData.desc"
          :ats="noteData.ats"
          :liked_count="noteData.liked_count"
          :collected_count="noteData.collected_count"
          :comments_count="noteData.comments_count"
          :time="noteData.time"
        />
      </div>
      <Comments
        class="comments"
        :commentList="commentList"
      />
    </div>
    <div class="author-and-recommend">
      <div class="author">
        <h3>笔记作者</h3>
        <div class="info">
          <div class="pic"><img :src="user.image"></div>
          <div class="name">
            <div
              class="nickname">
              {{user.nickname}}
              <img v-if="user.level" :src="user.level.image" /></div>
            <div class="desc">{{user.desc}}</div>
          </div>
        </div>
        <div class="liked">
          <span><p>笔记</p><p v-text="changeNum(user.notes)"></p></span>
          <span><p>粉丝</p>{{changeNum(user.fans)}}</span>
          <span><p>获赞与收藏</p>{{changeNum(user.collected+user.liked)}}</span>
        </div>
      </div>
      <div class="recommend">
      </div>
    </div>
  </div>
</template>

<script>
import { getNote, getUser } from '@/apis/note';
import Swiper from '@/components/Swiper/Swiper.vue';
import Aticle from '@/components/Aticle.vue';
import { changeNum } from '@/utils/index';
import Comments from '@/components/Comments.vue';

export default {
  data() {
    return {
      noteData: {},
      user: {},
      commentList: [],
    };
  },

  async created() {
    this.fetchNode();
  },

  methods: {
    changeNum,
    async fetchNode() {
      try {
        const { data, success } = await getNote(this.$route.params.id);
        if (success) {
          const [originData] = data;
          const { note_list: nodeList, user } = originData;
          const [noteData] = nodeList;
          const { comment_list: commentList } = originData;
          this.commentList = commentList;
          this.noteData = noteData;
          this.fetchUser(user.id);
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUser(id) {
      try {
        const { data, success } = await getUser(id);
        if (success) {
          this.user = data;
        } else {
          throw new Error('接口错误');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  components: {
    Swiper,
    Aticle,
    Comments,
  },
};
</script>

<style lang='less' scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 20px;

  .note-container {
    width: 500px;
    margin-right: 30px;

    .comments {
      background-color: aquamarine;
      width: 100%;
    }
  }

  .author-and-recommend {
    width: 320px;
    display: inline-block;

    .author {
      width: 100%;
      height: 176px;
      margin: 0 0 20px;
      border: solid rgb(223, 219, 219) 1px;
      border-radius: 5px;

      h3 {
        height: 40px;
        font-size: 16px;
        border-bottom: 1px solid rgb(228, 223, 223);
        line-height: 40px;
        padding-left: 15px;
      }

      .info {
        height: 80px;
        display: flex;
        align-items: center;
        width: 270px;
        cursor: pointer;

        .pic {
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 15px;
          }
        }

        .name {
          .nickname {
            font-size: 16px;
            margin: 12px 0;
          }

          img {
            width: 18px;
            height: 16px;
          }

          .desc {
            width: 200px;
            font-size: 16px;
            opacity: 60%;
            height: 30px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }

      .liked {
        border-top: 1px solid rgb(228, 223, 223);
        width: 270px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        span {
          display: flex;
          flex-direction: column;
          font-size: 14px;

          p:first-child {
            opacity: 60%;
            margin: 12px 0 7px 0;
          }

          p:last-child {
            opacity: 80%;
          }


        }
      }
    }

    .recommend {
      background-color: red;
      width: 100%;
      height: 400px;
    }
  }

}
</style>
