<template>
  <div class="article-container">
    <h2 class="title">{{title}}</h2>
    <div class="desc">
      <p
        class="paragragh"
        v-for="(p, index) in paragraphs"
        :key="index"
        v-html="p"
      ></p>
    </div>
    <div class="count">
      <span class="liked"><i class="icon-like iconfont"></i>{{liked_count}}</span>
      <span class="comments"><i class="icon-pinglun iconfont"></i> {{collected_count}}</span>
      <span class="collected"><i class="icon-shoucang iconfont"></i> {{comments_count}}</span>
    </div>
    <div
      class="time"
      @click="changeTime"
      title="轻点查看具体时间"
    >发布于 {{setTime(time, isFromTime)}}</div>
  </div>
</template>

<script>
import { setTime } from '@/utils/index';


export default {
  data() {
    return {
      isFromTime: true,
    };
  },

  props: {
    title: String,
    description: {
      default: '',
      type: String,
    },
    ats: {
      default: () => [],
      type: Array,
    },
    liked_count: Number,
    collected_count: Number,
    comments_count: Number,
    time: Number,
  },

  computed: {
    paragraphs() {
      const des = this.showAts();
      return des.split('\n');
    },
  },

  methods: {
    setTime,

    changeTime() {
      this.status = !this.status;
    },

    showAts() {
      let des = this.description;
      this.ats.forEach((element) => {
        des = des.replace(`@${element.name}`, `<a href="#" style="text-decoration:none;color:cornflowerblue">@${element.name}</a>`);
      });
      return des;
    },
  },
};
</script>

<style lang="less" scoped>
.article-container {
  .title {
    font-size: 24px;
    font-weight: 500;
  }

  .desc {
    .paragragh {
      font-size: 14px;
      margin: 20px 0 0 0;
      line-height: 20px;
    }
  }

  .count {
    margin: 30px 0 0 0;

    span {
      margin-right: 24px;
      display: inline-block;

      .iconfont {
        font-size: 21px;
        color: rgb(235, 59, 59);
        margin-right: 6px;
      }
    }

  }

  .time {
    margin: 40px 0;
    color: rgb(172, 161, 161);

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
