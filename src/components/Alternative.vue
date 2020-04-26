<template>
  <div class="alternative">
    <h3>{{ alternative.label }}</h3>
    <div style="width: 500px;">
    <div v-if="alternative.images.length > 0">
      <VueAgile>
        <div v-for="path in alternative.images" :key="path" class="slide">
          <img :src="`assets/images/${path}`">
        </div>
      </VueAgile>
    </div>
    </div>
  </div>
</template>

<script>
import { VueAgile } from 'vue-agile'

export default {
  name: 'Alternative',
  components: {
    VueAgile
  },
  props: {
    alternative: Object
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.agile__slide {
	align-items: center;
	box-sizing: border-box;
	color: #fff;
	display: flex;
	height: 450px;
	justify-content: center;
}
</style>
