<template>
  <section id="classifier" v-if="currentItem">
    <h3>
      <small>id:</small>
      {{ currentItem.id }},
      <small>created:</small>
      {{currentItem.createdAt}},
      <small>status:</small>
      {{ currentItem.status }}
    </h3>
    <h1>{{ currentItem.title }}</h1>
    <p>{{ currentItem.author }}</p>
    <p>
      <a :href="currentItem.url">{{currentItem.url}}</a>
    </p>
    <p>
      <small>
        <b>Short description:</b>
      </small>
      <br />
      "{{ currentItem.description }}"
    </p>

    <p v-if="currentItem.abstract">
      <small>
        <b>Abstract:</b>
      </small>
      <br />
      <span class="abstract" v-html="nltobr(sanitizeAbstract(currentItem.abstract))"></span>
    </p>

    <div class="actions">
      <button
        @click="setExcluded"
        :class="[currentItem.status === 'excluded' && 'action--selected']"
        class="action action--exclude"
      >Exclude</button>
      <button
        @click="setUncertain"
        :class="[currentItem.status === 'uncertain' && 'action--selected']"
        class="action action--uncertain"
      >Uncertain</button>
      <button
        @click="setIncluded"
        :class="[currentItem.status === 'included' && 'action--selected']"
        class="action action--include"
      >Include</button>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Classifier",
  computed: {
    ...mapGetters(["currentItem"]),
    ...mapState(["pageItems", "pageLength", "page"])
  },
  methods: {
    ...mapActions(["setItemStatus", "setCurrentItem", "setPage"]),
    async setExcluded() {
      await this.setItemStatus("excluded");
      this.setNextItem();
    },
    async setUncertain() {
      await this.setItemStatus("uncertain");
      this.setNextItem();
    },
    async setIncluded() {
      await this.setItemStatus("included");
      this.setNextItem();
    },
    setNextItem() {
      const index = this.pageItems.findIndex(
        item => item.id === this.currentItem.id
      );
      if (index >= this.pageLength - 1) {
        this.setPage(this.page + 1);
      } else {
        this.setCurrentItem(this.pageItems[index + 1]);
      }
    },
    nltobr(str) {
      return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
    sanitizeAbstract(str) {
      return str.replace("Abstract:\n", "").replace("Abstract\n", "");
    }
  }
};
</script>
<style scoped lang="scss">
#classifier {
  margin-left: 20px;
  flex: 1;
  overflow: auto;
}

.abstract {
  line-height: 36px;
  font-family: Georgia;
  font-size: 18px;
}

.actions {
  margin-top: 60px;
  display: flex;

  .action {
    flex: 1;
    height: 40px;
    font-size: 20px;
    background: #c0c0c0;
    border: 1px solid #0000003a;
    cursor: pointer;

    &--exclude {
      background: #ffb4b4;
    }

    &--uncertain {
      background: #ffffb4;
    }

    &--include {
      background: #c4ffb4;
    }

    &--selected {
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>