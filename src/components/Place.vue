<template>
  <div class="place">
    <h2>Votre destination</h2>
    {{ place.label }} se trouve à X km de la France ! OMG vous n'allez quand même pas faire ça ? Ça correspond à Y t de CO² !
  </div>
</template>

<script>
export default {
  name: 'Place',
  props: {
    place: Object
  },
  data() {
    return {
    }
  },
  methods: {
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
