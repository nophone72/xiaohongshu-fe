<template>
  <div class="container">
    {{ noteData.title }}
    <div class="noteContainer">
      <div class="imgs">
        <Swiper :imgList="noteData.images_list" />
      </div>
    </div>
    <div class="authorAndRecommend"></div>
  </div>
</template>

<script>
import getNote from '@/apis/note';
import Swiper from '@/components/Swiper/Swiper.vue';

export default {
  data() {
    return {
      noteData: {},
    };
  },

  async created() {
    this.fetchNode();
  },

  methods: {
    async fetchNode() {
      try {
        const { data, success } = await getNote(this.$route.params.id);
        if (success) {
          const [originData] = data;
          const { note_list: nodeList } = originData;
          const [noteData] = nodeList;
          this.noteData = noteData;
        } else {
          throw new Error('接口调用错误');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  components: {
    Swiper,
  },
};
</script>

<style></style>
