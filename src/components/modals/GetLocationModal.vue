<!-- eslint-disable -->
<template>
  <b-modal
    id="get-location-modal"
    title="Me localiser"
  >
    <div class="get-location">
      <div class="input-group">
        <input
          class="form-control"
          v-model="userInput"
          type="text"
          placeholder="Entrez votre code postal"
        >
      </div>
      <a href="" @click.prevent="resetLocation">Réinitialiser</a>
    </div>
    <template v-slot:modal-footer="{ ok }">
      <b-button class="btn btn-primary" size="sm" @click="getLocation()">
        OK
      </b-button>
    </template>
  </b-modal>
</template>

<script>

export default {
  name: 'GetLocationModal',
  data() {
    return {
      userInput: '',
    };
  },
  methods: {
    getLocation() {
      if (this.userInput) {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${this.userInput}&type=locality`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.features && data.features[0]) {
              this.$emit('locationReceived', {
                name: data.features[0].properties.city,
                longitude: data.features[0].geometry.coordinates[0],
                latitude: data.features[0].geometry.coordinates[1],
              });
              this.$bvModal.hide('get-location-modal');
            }
          });
      }
    },
    resetLocation() {
      this.$emit('locationReceived', {
        name: 'Paris',
        latitude: 48.8534,
        longitude: 2.3488,
      });
      this.$bvModal.hide('get-location-modal');
    },
  },
};

</script>

<style scoped>

</style>
