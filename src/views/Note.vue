<template>
  <div class="container">
    <div class="note-container">
      <div class="img-or-video">
        <Swiper v-if="noteData.type === 'normal'" :imgList="noteData.imageList" />
        <Video
          v-else-if="noteData.type === 'video'"
          :url="noteData.video.url"
          :poster="noteData.imageList[0].url"
        />
      </div>
      <div class="word">
        <Aticle
          :title="noteData.title"
          :description="noteData.desc"
          :ats="noteData.ats"
          :liked_count="noteData.likes"
          :collected_count="noteData.collects"
          :comments_count="noteData.comments"
          :time="noteData.time"
        />
      </div>
      <Comments
        class="comments"
        :authorId="user.id"
      />
    </div>
    <div class="author-and-recommend">
      <div class="author">
        <h3>笔记作者</h3>
        <div class="info" @click="jumpToUser(user.id)">
          <div class="pic"><img :src="user.image"></div>
          <div class="name">
            <div
              class="nickname">
              {{user.nickname}}
              <img v-if="user.level" :src="user.level.image" /></div> <!-- ?? -->
            <div class="desc">{{user.desc}}</div>
          </div>
        </div>
        <div class="liked">
          <span><p>笔记</p><p v-text="changeNum(user.notes)"></p></span>
          <span><p>粉丝</p><p>{{changeNum(user.fans)}}</p></span>
          <span><p>获赞与收藏</p><p>{{changeNum(user.collected+user.liked)}}</p></span>
        </div>
      </div>
      <Related />
    </div>
  </div>
</template>

<script>
import { getNote, getUser } from '@/apis/note';
import Swiper from '@/components/Swiper/Swiper.vue';
import Aticle from '@/components/Aticle.vue';
import { changeNum } from '@/utils/index';
import Comments from '@/components/Comments.vue';
import Video from '@/components/Video.vue';
import Related from '@/components/Related.vue';

export default {
  data() {
    return {
      noteData: {},
      user: {},
      noteId: this.$route.params.id,
    };
  },

  created() {
    this.fetchNode();
    window.scrollTo(0, 0);
  },

  beforeRouteUpdate(to, from, next) {
    this.noteId = to.params.id;
    this.fetchNode();
    next();
  },

  methods: {
    jumpToUser(id) {
      if (id !== undefined) { this.$router.push({ path: `/user/${id}` }); }
    },

    changeNum,
    async fetchNode() {
      try {
        const { data, success } = await getNote(this.noteId);
        if (success) {
          this.noteData = data;
          const { user } = data;
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
    Video,
    Related,
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

    .img-or-video {
      width: 100%;
      min-height: 500px;
    }

    .comments {
      width: 100%;
    }
  }

  .author-and-recommend {
    width: 320px;
    flex-shrink: 0;
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
            opacity: 0.6;
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
            opacity: 0.6;
            margin: 12px 0 7px 0;
          }

          p:last-child {
            opacity: 0.8;
          }


        }
      }
    }
  }

}
</style>
