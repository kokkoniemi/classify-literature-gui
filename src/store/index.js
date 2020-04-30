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
    statusFilter: ""
  },
  mutations: {
    SET_PAGE(state, payload) {
      state.page = payload;
    },
    SET_CURRENT_ITEM(state, payload) {
      state.currentItemId = !payload ? null : payload.id;
    },
    SET_PAGE_ITEMS(state, payload) {
      state.pageItems = payload;
    },
    SET_STATUS_FILTER(state, payload) {
      state.statusFilter = payload;
    }
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
    async setStatusFilter({ commit, dispatch }, payload) {
      await commit('SET_STATUS_FILTER', payload);
      dispatch("fetchPageItems");
    },
    async fetchPageItems({ commit, state, getters, dispatch }, where) {
      const { page, pageLength, statusFilter } = state;
      const { currentItem } = getters;

      const items = await records.index({
        offset: (page - 1) * pageLength,
        limit: pageLength,
        ...where,
        ...(statusFilter !== "" && { status: statusFilter })
      });

      commit('SET_PAGE_ITEMS', items.data);
      if (currentItem === null
        || !items.data.find(item => item.id === currentItem.id)) {
        await dispatch('setCurrentItem', items.data[0]);
      }
    },
    async setItemStatus({ commit, state, getters }, payload) {
      const { pageItems, statusFilter } = state;
      const { currentItem } = getters;
      if (currentItem) {
        const item = await records.update(currentItem.id, { status: payload });
        const index = pageItems.findIndex((item) => item.id === currentItem.id);
        let newItems = [...pageItems];
        let nextItem = null;
        if (statusFilter !== "" && statusFilter !== item.data.status) {
          newItems = newItems.filter(oldItem => oldItem.id !== item.data.id);
          nextItem = pageItems.length > index + 1 ? pageItems[index + 1] : pageItems[pageItems.length - 1];
        } else {
          nextItem = item.data;
          newItems[index] = item.data;
        }
        await commit('SET_CURRENT_ITEM', nextItem);
        await commit('SET_PAGE_ITEMS', newItems);
      }
    }
  },
  modules: {
  }
});