<template>
  <div class="place">
    <h2>Votre destination</h2>
    {{ place.label }} se trouve à X km de la France !
    OMG vous n'allez quand même pas faire ça ? Ça correspond à Y t de CO² !
  </div>
</template>

<script>
export default {
  name: 'Place',
  props: {
    place: Object,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>


</style>
