<template>
  <div class="alternative">
    <h2>Les alternatives</h2>
    <div v-if="alternatives.length === 0">
      Oh, non il n'y a aucune solution :'(
    </div>
    <div v-for="alternative in alternatives" :key="alternative.label">
      <Alternative :alternative="alternative"/>
    </div>
  </div>
</template>

<script>
import Alternative from './Alternative'


export default {
  name: 'AlternativeList',
  components: {
    Alternative
  },
  props: {
    alternatives: Array
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
</style>
