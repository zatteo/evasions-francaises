<template>
  <div>
    <div class="container">
      <div class="row">
        <div>
          <Alternative
            :alternative="currentAlternative"
          />
        </div>
      </div>
      <div v-for="destination in destinations" :key="destination.slug" class="row">
        <Destination :destination="destination"/>
      </div>
    </div>
  </div>
</template>

<script>

import Alternative from '../components/Alternative.vue';
import Destination from '../components/c-Destination.vue';


export default {
  name: 'p-Alternative',
  components: {
    Alternative,
    Destination,
  },
  props: [
    'alternativeSlug',
  ],
  mounted() {
    const { $loadedAlternatives, alternativeSlug } = this;

    this.currentAlternative = $loadedAlternatives.find((a) => alternativeSlug === a.slug);
  },
  data() {
    return {
      currentAlternative: {},
    };
  },
  computed: {
    destinations() {
      const { $loadedDestinations, currentAlternative } = this;

      return $loadedDestinations.filter(
        (d) => d.categories.filter((category) => currentAlternative.categories.includes(category)).length > 0,
      );
    },
  },
};

</script>

<style>

</style>
