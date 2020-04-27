<template>
  <section id="sidebar">
    <h3>Records of page #{{ page }}</h3>
    <ul class="item-list">
      <li
        v-for="item in pageItems"
        :key="item.id"
        @click="setCurrentItem(item)"
        class="item"
        :class="[
            item.status !== null && `item--${item.status}`,
            item.id === currentItem.id && 'item--current'
        ]"
      >
        <small>
          id:
          <b>{{ item.id }}</b>
        </small>&nbsp;
        <span class="item-title">{{ truncate(item.title) }}</span>
      </li>
    </ul>
    <ul class="pagination">
      <li
        @click="movePage(page - 1)"
        class="pagination-item"
        :class="[page <= 1 && 'pagination-item--disabled']"
      >← Previous</li>
      <li @click="movePage(page + 1)" class="pagination-item">Next →</li>
    </ul>
  </section>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters(["currentItem"]),
    ...mapState(["page", "pageItems"])
  },
  mounted() {
    this.fetchPageItems();
  },
  methods: {
    ...mapActions(["fetchPageItems", "setPage", "setCurrentItem"]),
    truncate(str) {
      return str.length > 20 ? `${str.substring(0, 20)}...` : str;
    },
    movePage(to) {
      if (to > 0) {
        this.setPage(to);
      }
    }
  }
};
</script>
<style scoped lang="scss">
#sidebar {
  min-width: 200px;
  border: 1px solid #eaeaea;
  padding: 5px;
  margin-right: 10px;
}
.item-list {
  list-style: none;
  padding: 0;

  .item {
    border-bottom: 1px solid #eaeaea;
    padding: 5px;
    font-size: 12px;
    position: relative;
    cursor: pointer;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }

    &--uncertain {
      background: #ffffb4;
    }

    &--excluded {
      background: #ffb4b4;
    }

    &--included {
      background: #c4ffb4;
    }

    &--current {
      opacity: 1;
      &::after {
        background: #3750dc;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        right: 0;
        top: 0;
        bottom: 0;
        width: 20px;
        content: ">";
      }
    }

    small {
      color: #000000aa;
    }
  }
}
.pagination {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .pagination-item {
    color: #3750dc;
    font-weight: 600;
    padding: 5px;
    cursor: pointer;

    &:hover {
      color: #233496;
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
