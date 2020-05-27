<template>
  <div>
    <div v-for="alternative in alternatives" :key="alternative.slug">
      <Alternative
        :alternative="alternative"
        :destination="destination"
      />
    </div>
    <!-- <div class="card">
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
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="card">
      <h3 class="card-header">Aucune alternative n'a été trouvée</h3>
      <div class="card-body">
        Essayez peut-être de chercher une autre destination, voir d'augmenter la distance maximale ?
      </div>
    </div> -->
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
  mounted() {
    // eslint-disable-next-line no-undef
    feather.replace();
    this.setURL();
  },
  updated() {
    this.setURL();
  },
  data() {
    return {
    };
  },
  methods: {
    setURL() {
      const { destination } = this;

      if (destination) {
        const newRoute = `/destination/${destination.slug}`;
        if (this.$route.path !== newRoute) {
          this.$router.push(newRoute);
        }
      }
    },
  },
  watch: {
  },
};

</script>

<style scoped>

</style>
