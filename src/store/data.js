import { records } from '../helpers/api';

const initialState = {
    page: 1,
    pageLength: 100,
    items: [],
    itemCount: 0,
    statusFilter: "",
};

const getters = {
    items: (state) => state.items,
    itemCount: (state) => state.itemCount,
    pageLength: (state) => state.pageLength
};

const mutations = {
    SET_PAGE_LENGTH(state, payload) {
        state.pageLength = payload;
    },
    SET_ITEMS(state, payload) {
        state.items = payload;
    },
    SET_ITEM_COUNT(state, payload) {
        state.itemCount = payload;
    },
    SET_STATUS_FILTER(state, payload) {
        state.statusFilter = payload;
    },
};

const actions = {
    async fetchItems({ commit, state }, where) {
        const { page, pageLength, statusFilter } = state;

        const items = await records.index({
            offset: (page - 1) * pageLength,
            limit: pageLength,
            ...where,
            ...(statusFilter !== "" && { status: statusFilter })
        });

        commit('SET_ITEMS', items.data.records.map(({ id, title, author, url, comment, status, editedBy }) => ({ id, title, author, url, comment, status, editedBy })));
        commit('SET_ITEM_COUNT', items.data.count);
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
