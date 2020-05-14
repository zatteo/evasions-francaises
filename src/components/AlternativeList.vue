<template>
  <div class="alternative">
    <Alternative :alternative="alternatives[currentAlternative]"/>
    <button v-if="alternatives.length > 0" @click="next()" class="btn btn-primary btn-lg alternative-button">Une autre alternative !</button>
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
  data() {
    return {
      currentAlternative: 0,
    }
  },
  methods: {
    next() {
      this.currentAlternative = (this.currentAlternative + 1) % this.alternatives.length;
    }
  }
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

.alternative-button {
  margin-top: 2%;
}

.alternative {
  padding: 1%;
}

.btn-primary {
  background-color: #3fac8c !important;
  border-color: #3fac8c !important;
}
</style>
