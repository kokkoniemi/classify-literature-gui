import Vue from 'vue';
import Vuex from 'vuex';
import { records } from '../helpers/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 1,
    pageLength: 25,
    pageItems: [],
    currentItemId: null,
  },
  mutations: {
    SET_PAGE(state, payload) {
      state.page = payload;
    },
    SET_CURRENT_ITEM(state, payload) {
      state.currentItemId = payload.id;
    },
    SET_PAGE_ITEMS(state, payload) {
      state.pageItems = payload;
    },
  },
  getters: {
    currentItem: ({ currentItemId, pageItems }) => !currentItemId ? null : pageItems.find(item => item.id == currentItemId),
  },
  actions: {
    async setPage({ commit, dispatch, state }, payload) {
      await commit('SET_PAGE', payload);
      await dispatch('fetchPageItems');
      await dispatch('setCurrentItem', state.pageItems[0]);
    },
    setCurrentItem({ commit }, payload) {
      commit('SET_CURRENT_ITEM', payload);
    },
    async fetchPageItems({ commit, state, getters, dispatch }) {
      const { page, pageLength } = state;
      const { currentItem } = getters;

      const items = await records.index({
        offset: (page - 1) * pageLength,
        limit: pageLength
      });

      commit('SET_PAGE_ITEMS', items.data);
      if (currentItem === null) {
        await dispatch('setCurrentItem', items.data[0]);
      }
    },
    async setItemStatus({ commit, state, getters }, payload) {
      const { pageItems } = state;
      const { currentItem } = getters;
      if (currentItem) {
        const item = await records.update(currentItem.id, { status: payload });
        await commit('SET_CURRENT_ITEM', item.data);
        const index = pageItems.findIndex((item) => item.id === currentItem.id);
        const newItems = [...pageItems];
        newItems[index] = item.data;
        commit('SET_PAGE_ITEMS', newItems);
      }
    }
  },
  modules: {
  }
});