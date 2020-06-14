<template>
  <div id="app">
    <h1 class="app-name">Include/exclude literature<input type="text" :class="[!this.nick && 'empty']" placeholder="Nickname" v-model="nickname" /></h1>
    <div class="main-container" v-if="this.nick">
      <sidebar></sidebar>
      <classifier></classifier>
    </div>
    <div v-else class="message">
      Start by typing your nickname or initials in the blinking box above
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Sidebar from "./components/Sidebar.vue";
import Classifier from "./components/Classifier.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Classifier,
  },
  computed: {
    ...mapState(['nick']),
    nickname: {
      get() {
        return this.nick;
      },
      set(value) {
        this.updateNick(value);
      }
    }
  },
  methods: {
    ...mapActions(['updateNick']),
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "./scss/nprogress.scss";

.vs__dropdown-toggle {
  border-radius: 0 !important;
  height: 32px;
}

.vs__open-indicator {
  transform: scale(0.6);
}

.vs--single.vs--open .vs__selected {
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: auto;
}
.main-container {
  display: flex;
  flex-direction: row;
}
.app-name {
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  input {
    margin-bottom: 5px;
    border: 0;
    padding: 5px;
    height: 20px;
    width: 100px;
    transition: background-color 0.2s ease-in, border-color 0.2s ease-in;
    font-family:'Times New Roman', Times, serif;
    font-style: italic;
    font-weight: 600;
    font-size: 14px;

    &:hover,
    &:focus {
      background: #eaeaea;
    }

    &.empty {
      animation: blink 1.4s infinite;
    }
  }
}

.message {
  padding: 100px 10px;
  text-align: center;
}

@keyframes blink {
  0% { background: transparent; }
  50% { background: #eaeaea; }
  100% { background: auto; }
}
</style>
