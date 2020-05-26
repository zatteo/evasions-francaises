<template>
  <div>
    <div v-if="alternatives[currentAlternative]" class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-12 col-md-8 text-left">
            <div v-if="destination">
              <h3 class="d-inline-block mb-0">
                {{ alternatives.length }}
                {{ alternatives.length > 1 ? 'alternatives' : 'alternative' }}
                pour "{{ destination.label }}"
              </h3>
              <span
                v-for="category in destination.categories"
                :key="category"
                class="badge badge-info ml-1"
              >
                {{ category }}
              </span>
            </div>
            <div v-else>
              <h3 class="d-inline-block mb-0">
                Alternative au hasard
              </h3>
            </div>
          </div>
          <div class="col-12 col-md-4 text-right">
            <button
              @click="nextAlternative()"
              type="button"
              class="btn btn-primary"
              :disabled="alternatives.length <= 1"
            >
              Une autre alternative !
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <Alternative
          :alternative="alternatives[currentAlternative]"
          :destination="destination"
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
    destination: Object,
    alternatives: Array,
    didSomething: Boolean,
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
  watch: {
    alternatives: {
      handler() {
        this.currentAlternative = 0;
      },
    },
  },
};

</script>

<style scoped>

</style>
