<template>
  <div>
    <div class="container">
      <div class="row">
        <div>
          <Alternative
            v-if="currentAlternative"
            :alternative="currentAlternative"
          />
        </div>
      </div>
      <div class="row">
        <div class="card w-100">
          <div class="card-header text-left">
            <h4>
              Les destinations ressemblantes
            </h4>
          </div>
          <div class="card-body">
            <ul v-for="destination in destinations" :key="destination.slug" class="row">
              <li>
                <router-link :to="`/destination/${destination.slug}`">
                  {{ destination.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Alternative from '../components/Alternative.vue';

export default {
  name: 'p-Alternative',
  components: {
    Alternative,
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
      currentAlternative: false,
    };
  },
  computed: {
    destinations() {
      const { $loadedDestinations, currentAlternative } = this;

      return $loadedDestinations.filter(
        (d) => d.categories.filter((category) => currentAlternative.categories && currentAlternative.categories.includes(category)).length > 0,
      );
    },
  },
};

</script>

<style>

</style>
