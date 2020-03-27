<template>
  <div class="container">
    <div id="mse"></div>
  </div>
</template>

<script>
import Player from 'xgplayer';

export default {
  props: {
    url: String,
    poster: String,
  },

  mounted() {
    this.player = new Player({
      id: 'mse',
      url: this.url,
      width: '100%',
      height: '500px',
      loop: true,
      poster: this.poster,
    });
  },

  watch: {
    url() {
      this.player.url = this.url;
      this.player.poster = this.poster;
    },
  },
};


</script>

<style lang="less" scoped>
.container {
  margin-bottom: 5px;
}
</style>
