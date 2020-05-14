<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Pacifico");

html,
body {
  height: 100%;
}

body {
  /*background-color: white;*/
  background-image: url("./assets/backgrounds/verdon.jpg");
  background-repeat: no-repeat;
  background-position: left top;
  background-attachment: fixed;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: #39cccc; */
  min-width: 100%;
  min-height: 100%;
}
</style>
