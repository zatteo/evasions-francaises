<template>
  <Alternative
    v-if="alternatives[currentAlternative]"
    :alternative="alternatives[currentAlternative]"
    :place="place"
    v-on:nextAlternative="nextAlternative()"
  />
  <div v-else class="card">
    <h3 class="card-header">Aucune alternative n'a été trouvée</h3>
    <div class="card-body">
      Essayez peut-être de chercher une autre destination, voir d'augmenter la distance maximale ?
    </div>
  </div>
</template>

<script>

import Alternative from './Alternative.vue';

export default {
  name: 'AlternativeList',
  components: {
    Alternative,
  },
  props: {
    alternatives: Array,
    place: Object,
  },
  data() {
    return {
      currentAlternative: 0,
    };
  },
  methods: {
    nextAlternative() {
      this.currentAlternative = (this.currentAlternative + 1) % this.alternatives.length;
    },
  },
};

</script>

<style scoped>


</style>
