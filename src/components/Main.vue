<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card search-card">
          <p class="title">Destinations alternatives</p>
          <p class="search-title">"Qui a dit qu'il fallait prendre l'avion pour s'évader ?"</p>
          <p
            class="search-text"
          >
            Entrez votre destination lointaine et
            découvrez les plus belles alternatives à moins de
            <input
              id="distance"
              class="search-distance"
              v-model="filters.distance"
              type="number"
              step="10"
            >
            km.
          </p>
          <br />
          <div class="search-bar">
            <v-select
              :value="selected"
              @input="setSelected"
              :options="places"
              :placeholder="`Bali, Grand Canyon, ...`"
            ></v-select>
            <div class="text-legend">
              Votre localisation : {{ location.name }} ({{location.latitude}}
              : {{location.longitude}})
              <a
                href="" @click.prevent="getLocation"
              >
                Me géolocaliser
              </a>
            </div>
          </div>
          <div class="row">
            <button
              type="button"
              class="btn btn-primary btn-toolbar" @click="setRandomAlternative"
            >
              Une alternative au hasard
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="result">
          <AlternativeList
            :didSomething="didSomething"
            :alternatives="alternativesFound"
            :place="placeFound"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card why-card">
          <p class="why-title">Pourquoi ce site ?</p>
          <div class="row">
            <div class="col-12 col-sm-6">
              <img class="why-icon" src="assets/map.png">
              <p class="why-icon-text">Promouvoir le tourisme local</p>
            </div>
            <div class="col-12 col-sm-6">
              <img class="why-icon" src="assets/pollution.png">
              <p class="why-icon-text">Réduire les émissions de CO2 liées au tourisme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AlternativeList from './AlternativeList.vue';

import loadedAlternatives from '../assets/alternatives.json';
import loadedPlaces from '../assets/places.json';

export default {
  name: 'Main',
  components: {
    AlternativeList,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      didSomething: false,
      places: loadedPlaces,
      alternatives: loadedAlternatives,
      selected: '',
      placeFound: undefined,
      alternativesFound: [],
      categoriesFound: [],
      location: {
        name: 'Paris',
        latitude: 48.8534,
        longitude: 2.3488,
      },
      filters: {
        distance: '1000',
      },
    };
  },
  computed: {
    fullPlaces() {
      const {
        places,
        location,
        calculateDistance,
        calculateEmission,
      } = this;

      return places.map((place) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          place.latitude,
          place.longitude,
        );

        const emission = calculateEmission(distance, 'plane');

        return {
          ...place,
          distance,
          emission,
        };
      });
    },
    fullAlternatives() {
      const {
        alternatives,
        location,
        calculateDistance,
        calculateEmission,
      } = this;

      return alternatives.map((alternative) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          alternative.latitude,
          alternative.longitude,
        );

        const emission = calculateEmission(distance, 'plane');

        return {
          ...alternative,
          distance,
          emission,
        };
      });
    },
  },
  methods: {
    setSelected(search) {
      this.didSomething = true;

      if (search === null) {
        this.resetSelected();
      }

      const { filters } = this;
      this.selected = search;
      const place = this.fullPlaces.find((d) => search.label === d.label);

      if (place) {
        this.placeFound = place;

        this.alternativesFound = this.fullAlternatives.filter(
          (a) => place.categories.filter((category) => a.categories.includes(category)).length > 0 && (filters.distance === '' || a.distance <= filters.distance),
        );
      } else {
        this.placeFound = undefined;
        this.alternativesFound = [];
        this.categoriesFound = [];
      }
    },
    resetSelected() {
      this.selected = '';
      this.placeFound = undefined;
      this.alternativesFound = [];
    },
    setRandomAlternative() {
      const { fullAlternatives } = this;
      // eslint-disable-next-line no-unused-vars
      let { alternativesFound } = this;

      this.resetSelected();

      alternativesFound = [fullAlternatives[parseInt(Math.random() * fullAlternatives.length, 10)]];
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.location.name = 'GPS';
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
        }, (error) => {
          console.log(error);
        }, { timeout: 10000 });
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // km
      const dLat = this.toRad(lat2 - lat1);
      const dLon = this.toRad(lon2 - lon1);
      const lat1rad = this.toRad(lat1);
      const lat2rad = this.toRad(lat2);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1rad) * Math.cos(lat2rad);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;

      return parseInt(d.toFixed(2), 10);
    },
    toRad(Value) {
      return (Value * Math.PI) / 180;
    },
    calculateEmission(distance, transport) {
      let emission;

      // https://www.eea.europa.eu/media/infographics/co2-emissions-from-passenger-transport/view
      switch (transport) {
        case 'plane':
          emission = distance * 0.000285;
          break;
        case 'train':
          emission = distance * 0.000014;
          break;
        default:
          emission = distance * 0.000285;
          break;
      }

      return parseFloat(emission.toFixed(2), 10);
    },
  },
  watch: {
    filters: {
      handler() {
        this.setSelected(this.selected);
      },
      deep: true,
    },
    fullAlternatives: {
      handler() {
        this.setSelected(this.selected);
      },
    },
  },
};

</script>

<style>

@import url("https://fonts.googleapis.com/css?family=Pacifico");

@font-face {
  font-family: PacificoLight;
  src: url("./../assets/Pacifico-Light.ttf");
}

a {
  color: #3fac8c !important;
}

.card {
  margin-top: 10px;
}

.btn-primary, .badge-primary {
  background-color: #3fac8c !important;
  border-color: #3fac8c !important;
}

.btn-info, .badge-info {
  background-color: #cccccc !important;
  border-color: #cccccc !important;
}

</style>

<style scoped>

.btn-toolbar {
  margin: 4px;
}

.text-legend {
  margin-top: 2px;
  font-size: 0.85rem;
  font-style: italic;
  color: #6c757d !important
}

.title {
  margin: 2% 0 0 0;
  font-family: "Pacifico";
  font-size: 4rem;
}

.search-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-title {
  margin: 0 0 2% 0;
  font-family: "PacificoLight";
  font-size: 2rem;
}

.search-bar {
  min-width: 300px;
  max-width: 800px;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.search-distance {
  width: auto;
}

.why {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.why-title {
  font-family: "PacificoLight";
  font-size: 3rem;
}

.why-icon {
  width: 20%;
}

</style>
