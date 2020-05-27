<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
};

</script>

<style>
html,
body {
  background-color: #3fac8c !important;
  height: 100%;
}

@media (min-width: 768px) {
  body {
    background-image: url("./assets/backgrounds/valensole.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: left top;
    background-attachment: fixed;
  }
}

#app {
  font-family: Quattrocento, Helvetica, Arial, sans-serif;
  text-align: center;
  min-width: 100%;
  min-height: 100%;
}

.MMjVD {
  bottom: 10px !important;
}

@media (min-width: 768px) {
  .MMjVD {
    bottom: 20px !important;
  }
}

</style>
