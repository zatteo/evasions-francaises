<!-- eslint-disable -->
<template>
  <b-modal
    id="map-modal"
    title="Carte"
  >
    <div class="map">
      <img
        :src="`assets/maps/${alternative.label}.jpg`"
        alt="La carte n'est pas disponible :/"
      >
    </div>
    <template v-slot:modal-footer="{ ok }">
      <b-button class="btn btn-primary" size="sm" @click="ok()">
        OK
      </b-button>
    </template>
  </b-modal>
</template>

<script>

export default {
  name: 'DisplayMapModal',
  props: {
    alternative: Object,
  },
};

</script>

<style scoped>

</style>
