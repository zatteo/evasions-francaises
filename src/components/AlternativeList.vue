<template>
  <div>
    <div v-if="destination" class="card">
      <div class="card-header text-left">
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
    <div v-for="alternative in alternatives" :key="alternative.slug">
      <Alternative
        :alternative="alternative"
        :destination="destination"
      />
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
  metaInfo() {
    return {
      title: this.metaTitle,
    };
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
  computed: {
    metaTitle() {
      const { destination } = this;
      if (destination) {
        return `Toutes les alternatives à "${destination.label}", pour des voyages plus écoresponsables !`;
      }

      return 'Trouvez les alternatives françaises aux plus belles destinations du monde !';
    },
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
};

</script>

<style scoped>

</style>
