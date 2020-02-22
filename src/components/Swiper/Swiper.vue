<template>
  <div class="swiper">
    <div class="main">
      <div class="img-window">
        <ul class="img-container" :style="imgContainerStyle">
          <li
            class="img"
            v-for="img in imgList"
            :key="img.fileid"
            :style="{ 'background-image': `url(${img.url})` }"
          ></li>
        </ul>
        <div class="control">
          <i class="iconfont icon-left-circle"></i>
          <i class="iconfont icon-right-circle"></i>
        </div>
      </div>
    </div>
    <div class="img-preview"></div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  computed: {
    imgContainerStyle() {
      return {
        width: `${500 * this.imgList.length}px`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  .main {
    .img-window {
      width: 500px;
      height: 500px;
      overflow: hidden;
      position: relative;

      .img-container {
        display: flex;

        .img {
          width: 500px;
          height: 500px;
          background: no-repeat center / contain;
        }
      }

      .control {
        #control-icon {
          position: absolute;
          top: 50%;
          font-size: 50px;
          color: rgb(76, 80, 76);
          transform: translateY(-50%);
        }

        .icon-left-circle {
          #control-icon();
          left: 10px;
        }

        .icon-right-circle {
          #control-icon();
          right: 10px;
        }
      }
    }
  }
}
</style>
