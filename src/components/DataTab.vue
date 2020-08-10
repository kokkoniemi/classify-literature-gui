<template>
  <section id="data-tab">
    <hot-table
      :data="items"
      :colHeaders="colHeaders"
      :readOnly="true"
      :width="'100%'"
      :style="style"
      :fixedColumnsLeft="1"
      :colWidths="colWidths"
      :manualColumnResize="true"
      :manualRowResize="true"
      licenseKey="non-commercial-and-evaluation"
      ref="hotTableComponent"
    ></hot-table>
  </section>
</template>
<script>
import HotTable from "@handsontable/vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DataTab",
  components: {
    HotTable,
  },
  data: function () {
    return {
      columns: [
        { data: "id" },
        { data: "title" },
        { data: "author" },
        { data: "url" },
        { data: "comment" },
        { data: "status" },
        { data: "editedBy" },
      ],
      colHeaders: [
        "ID",
        "Title",
        "Author info",
        "URL",
        "Comment",
        "Status",
        "Edited by",
      ],
      colWidths: [50, 500, 400, 300, 300, 100, 100],
    };
  },
  computed: {
    ...mapGetters({
      items: "data/items",
      pageLength: "data/pageLength",
    }),
    style() {
      return `width: 100%; height: 100%; overflow: hidden;`;
    },
  },
  async mounted() {
    await this.fetchItems();
    this.$refs.hotTableComponent.hotInstance.loadData(this.items);
  },
  methods: {
    ...mapActions({ fetchItems: "data/fetchItems" }),
  },
};
</script>
<style lang="scss" scoped>
#data-tab {
  position: relative;
  min-height: 100%;
  height: 80vh;
}
</style>