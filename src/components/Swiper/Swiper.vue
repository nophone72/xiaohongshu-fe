<template>
  <div class="swiper">
    <div class="main">
      <div class="img-window">
        <ul class="img-container" :style="imgContainerStyle">
          <li v-for="(img, i) in imgList" :key="img.fileid">
            <transition :name="direction">
              <div class="img" :style="{ 'background-image': `url(${img.url})` }"></div>
            </transition>
          </li>
        </ul>
        <div class="control">
          <i class="iconfont icon-left-circle" @click="handleLeft"></i>
          <i class="iconfont icon-right-circle" @click="handleRight"></i>
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

  data() {
    return {
      direction: '',
    };
  },

  computed: {
    imgContainerStyle() {
      return {
        width: `${500 * this.imgList.length}px`,
      };
    },
  },

  methods: {
    handleLeft() {
      this.direction = 'left';
    },

    handleRight() {
      this.direction = 'right';
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
      margin: 0 auto;
      overflow: hidden;
      position: relative;

      .img-container {
        display: flex;

        .img {
          width: 500px;
          height: 500px;
          background: no-repeat center / contain;
          position: absolute;
        }
      }

      .control {
        #control-icon {
          position: absolute;
          top: 50%;
          font-size: 50px;
          color: rgb(76, 80, 76);
          transform: translateY(-50%);

          &:hover {
            color: #888;
            cursor: pointer;
          }
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

.left-leave-to,
.right-enter {
  transform: translateX(-100%);
}

.left-enter,
.right-leave-to {
  transform: translateX(100%);
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transform: all 5s;
}
</style>
