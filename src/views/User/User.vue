<template>
  <div class="MyPage">
    <div class="user-container">
      <div class="pic">
        <img :src="user.image" />
      </div>
      <div class="info">
        <div class="nickname">
          {{user.nickname || '昵称加载中'}}
          <img v-if="user.level" :src="user.level.image" />
        </div>
        <div class="desc">
          {{user.desc || '(主人还没有简介哦)'}}
        </div>
        <div class="location">
          <i class="icon-Locationpinmarker iconfont"></i>
          {{user.location}}
        </div>
        <div class="liked">
          <span>
            <p>关注</p>
            <p>{{changeNum(user.follows)}}</p>
          </span>
          <span>
            <p>粉丝</p>
            <p>{{changeNum(user.fans)}}</p>
          </span>
          <span>
            <p>获赞与收藏</p>
            <p>{{changeNum(user.collected+user.liked)}}</p>
          </span>
        </div>
      </div>
    </div>
    <div class="notes-collect">
      <div class="head">
        <router-link
          class="notes"
          :to="`/user/${user.id}/note`"
          @click.native="status('note')"
        >笔记</router-link>
        <router-link
          class="collected"
          :to="`/user/${user.id}/collect`"
          @click.native="status('collect')"
        >收藏</router-link>
      </div>
      <div class="content">
        <router-view :status="symbol" v-if="Object.keys(user).length" />
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/apis/note';
import { changeNum } from '@/utils';

export default {
  data() {
    return {
      user: {},
      id: this.$route.params.id,
      symbol: this.$route.name,
    };
  },

  methods: {
    status(symbol) {
      this.symbol = symbol;
    },

    async fetchUser() {
      try {
        const { data, success } = await getUser(this.id);
        if (success) {
          this.user = data;
        } else {
          throw new Error('接口错误');
        }
      } catch (error) {
        console.log(error);
      }
    },

    changeNum,
  },

  created() {
    this.fetchUser();
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      this.id = to.params.id;
      this.user = {};
      this.fetchUser();
    }
    next();
  },

};
</script>

<style lang="less" scoped>
.MyPage {
  .notes-collect {
    margin: 30px 0;

    .content {
      min-height: 100vh;
    }

    .head {
      font-size: 18px;
      display: flex;
      justify-content: center;
      height: 30px;
      color: #555;

      .notes,
      .collected {
        margin-right: 50px;
        position: relative;
        cursor: pointer;
        text-decoration: none;

        &::after {
          content: "";
          background-color: rgb(214, 209, 209);
          display: inline-block;
          width: 90px;
          height: 1.5px;
          position: absolute;
          bottom: -1px;
          left: -20px;
        }

        &.router-link-exact-active {
          &::after {
            content: "";
            background-color: rgb(223, 41, 41);
            display: inline-block;
            width: 90px;
            height: 1.5px;
            position: absolute;
            bottom: -1px;
            left: -20px;
          }
        }
      }
    }
  }

  .user-container {
    margin: 50px auto;
    height: 240px;
    width: 940px;
    border: 1px solid #f1f2f6;
    border-radius: 8px;
    position: relative;

    .pic {
      height: 100%;
      padding: 40px;
      display: inline-block;

      img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background: rgb(230, 224, 224);

        // margin: 0 auto; ??
      }
    }

    .info {
      display: inline-block;
      position: absolute;
      top: 0;

      .nickname {
        font-size: 20px;
        margin-top: 35px;
        margin-bottom: 15px;

        img {
          width: 20px;
          height: 20px;
        }
      }
      .desc {
        font-size: 16px;
        color: #555;
        width: 600px;
        height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .location {
        i {
          font-size: 23px;
        }
        color: rgb(146, 150, 149);
        margin: 15px 0;
      }
      .liked {
        margin: 35px 0;
        display: flex;
        justify-content: space-between;
        width: 300px;
        font-size: 18px;

        span p:first-child {
          color: rgb(110, 112, 112);
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
