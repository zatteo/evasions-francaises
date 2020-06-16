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
      meta: [
        ...this.openGraphTags,
      ],
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
        return `Évasions françaises - ${destination.label}`;
      }

      return 'Trouvez les alternatives françaises aux plus belles destinations du monde !';
    },
    openGraphTags() {
      const { destination, alternatives } = this;
      if (destination) {
        const tags = [
          { vmid: 'og:title', name: 'og:title', content: `Pourquoi aller ${destination.preposition} ${destination.label} quand on a ces paysages en France ?` },
          { vmid: 'og:description', name: 'og:description', content: 'Trouvez les alternatives françaises aux plus belles destinations du monde !' },
        ];

        if (alternatives.length > 0 && alternatives[0].images.length > 0) {
          tags.push({ vmid: 'og:image', name: 'og:image', content: `https://evasions-francaises.fr/assets/images/medium/${alternatives[0].images[0].path}` });
        }

        return tags;
      }

      return [];
    },
  },
  methods: {
    setURL() {
      const { destination } = this;

      if (destination) {
        const newRoute = `/destination/${destination.slug}/`;
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
