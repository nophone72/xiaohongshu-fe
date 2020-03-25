<template>
  <div class="swiper">
    <div class="main">
      <div class="img-window">
        <ul class="img-container" :style="imgContainerStyle">
          <li v-for="(img, i) in imgList" :key="img.fileid">
            <transition :name="direction">
              <div
                v-show="index === i"
                :style="{'background-image': `url(${img.url})`}"
                class="img"
              ></div>
            </transition>
          </li>
        </ul>
        <div class="control">
          <i class="iconfont icon-ziyuan" @click="handleLeft"></i>
          <i class="iconfont icon-ziyuan1" @click="handleRight"></i>
        </div>
      </div>
    </div>
    <div class="img-preview">
      <div
        class="small-img"
        v-for="(img, i) in imgList"
        :key="img.fileid"
        :style="{'background-image': `url(${img.url})`}"
        @click="changeImg(i)"
        :class="{active: index === i}"
      ></div>
    </div>
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
      index: 0,
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
      this.index = (this.index - 1 + this.imgList.length) % this.imgList.length;
    },

    handleRight() {
      this.direction = 'right';
      this.index = (this.index + 1) % this.imgList.length;
    },

    changeImg(i) {
      this.direction = this.index > i ? 'left' : 'right';
      this.index = i;
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  display: flex;
  width: 500px;
  flex-wrap: wrap;
  justify-content: center;

  .img-preview {
    width: 100%;
    display: flex;
    margin: 20px;
    justify-content: center;

    .small-img {
      width: 40px;
      height: 40px;
      margin: 0 3px;
      background: no-repeat center / cover;
      border-radius: 5px;
      box-sizing: border-box;
      opacity: 0.6;
      transition: .5s;

      &:hover {
        cursor: pointer;
      }
    }

    .active {
      border: red 1px solid;
      opacity: 1;
      box-shadow: 0 0 5px 1px rgb(218, 139, 139);
    }
  }
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
          position: absolute;
        }
      }

      .control {
        #control-icon {
          position: absolute;
          top: 50%;
          font-size: 35px;
          color: rgb(168, 175, 168);
          transform: translateY(-50%);

          &:hover {
            color: #888;
            cursor: pointer;
          }
        }

        .icon-ziyuan {
          #control-icon();
          left: 10px;
        }

        .icon-ziyuan1 {
          #control-icon();
          right: 10px;
        }
      }
    }
  }
}

.right-leave-to,
.left-enter {
  transform: translateX(-100%);
}

.right-enter,
.left-leave-to {
  transform: translateX(100%);
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all .8s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}
</style>
