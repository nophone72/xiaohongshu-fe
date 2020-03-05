import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oid: 'recommend',
    isShowCat: false,
  },
  mutations: {
    setOid(state, payload) {
      state.oid = payload;
    },

    setIsShowCat(state, payload) {
      state.isShowCat = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
