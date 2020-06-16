<template>
  <div class="card">
    <div class="card-header text-left">
      <h4 class="d-inline-block mb-0">
        {{ destination.label }}
      </h4>
      <!-- <span
        v-for="validCategory in validCategories"
        :key="`validCategory-${validCategory}`"
        class="badge badge-info ml-1"
      >
        {{ validCategory }}
      </span> -->
    </div>
    <div class="card-body">
      <p v-html="destination.label" class="text-justify"></p>
      <br>
      <!-- <ShareNetwork
        network="facebook"
        :url="`https://evasions-francaises.fr${this.$route.path}`"
        :title="`Avec Évasions françaises,
        trouvez les alternatives françaises aux plus belles destinations du monde !`"
        class="share-button"
      >
        <i data-feather="facebook"></i>
      </ShareNetwork>
      &nbsp;
      <ShareNetwork
        network="twitter"
        :url="`https://evasions-francaises.fr${this.$route.path}`"
        :title="`Avec Évasions françaises,
        trouvez les alternatives françaises aux plus belles destinations du monde !`"
        class="share-button"
      >
        <i data-feather="twitter"></i>
      </ShareNetwork> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Destination',
  props: {
    destination: Object,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};

</script>

<style scoped>

.share-button {
  cursor: pointer;
}

.share-button:hover {
  text-decoration: underline;
}

</style>
