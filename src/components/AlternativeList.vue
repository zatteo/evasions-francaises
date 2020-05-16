<template>
  <div>
    <div v-if="alternatives[currentAlternative]" class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-12 col-md-8 text-left">
            <h3 class="d-inline-block mb-0">
              {{ alternatives.length }}
              {{ alternatives.length > 1 ? 'alternatives' : 'alternative' }}
              pour "{{ place.label }}"
            </h3>
            <span
              v-for="category in place.categories"
              :key="category"
              class="badge badge-info ml-1"
            >
              {{ category }}
            </span>
          </div>
          <div class="col-12 col-md-4 text-right">
            <button @click="nextAlternative()" type="button" class="btn btn-primary">
              Une autre alternative !
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <Alternative
          :alternative="alternatives[currentAlternative]"
          :place="place"
        />
      </div>
    </div>
    <div v-else-if="didSomething" class="card">
      <h3 class="card-header">Aucune alternative n'a été trouvée</h3>
      <div class="card-body">
        Essayez peut-être de chercher une autre destination, voir d'augmenter la distance maximale ?
      </div>
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
    didSomething: Boolean,
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
