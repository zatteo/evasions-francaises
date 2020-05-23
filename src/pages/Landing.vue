<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card search-card">
            <router-link
              to="/"
            >
            <p class="title">Évasions françaises</p>
            </router-link>
            <p
              class="search-text"
            >
             Cherchez votre prochaine destination parmi plus de {{ $loadedAlternatives.length }}
             alternatives françaises aux plus belles destinations du monde, ou
            <a href="" v-b-modal.propose-modal @click.prevent>
              proposez votre alternative
            </a>.
            </p>
            <br />
            <div class="search-bar">
              <v-select
                :value="selected"
                @input="setSelected"
                :options="sortedPlaces"
                :placeholder="`Bali, Grand Canyon, ...`"
              ></v-select>
              <div class="search-toolbar text-legend">
                <span class="search-location">
                  Votre localisation : {{ location.name }} ({{location.latitude}}
                  : {{location.longitude}})
                  <a
                    href=""
                    @click.prevent="getLocation"
                  >
                    Me géolocaliser
                  </a>
                </span>
                <span>
                  Distance maximale
                  <input
                    id="distance"
                    class="search-distance"
                    v-model="filters.distance"
                    type="number"
                    step="10"
                  >
                </span>
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
              :destination="destination"
              :alternatives="alternativesFound"
              :alternative="alternative"
              :didSomething="didSomething"
              :place="placeFound"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card why-card">
            <p class="why-title">Pourquoi ?</p>
            <div class="row">
              <div class="col-12">
                <p>
                  Vous êtes comme nous ? Ouverts sur le monde, vous aimez voyager, vous évader,
                  découvrir d´autres paysages, d´autres cultures plus exotiques les unes que
                  les autres ?
                  <br><br>
                  Après deux mois de confinement, nous vous proposons de vous évader
                  de vos quatre murs pour partir à la découverte d´un pays exotique : la France !
                  <br><br>
                  Pour chacune de vos destinations de rêve, nous vous proposons des destinations
                  alternatives locales. Essayez, vous verrez : il est possible de faire le tour
                  du monde en France ! Avec en prime, au moins sur le trajet,
                  une meilleure empreinte environnementale. Et si vous voulez nous aider,
                  vous pouvez même
                  <a href="" v-b-modal.propose-modal @click.prevent>
                    proposer votre alternative
                  </a>.
                </p>
              </div>
              <div class="col-12 col-sm-6">
                <img class="why-icon" src="assets/map.png">
                <p class="why-icon-text">Promouvoir le tourisme local</p>
              </div>
              <div class="col-12 col-sm-6">
                <img class="why-icon" src="assets/pollution.png">
                <p class="why-icon-text">Réduire les émissions de CO₂ liées au tourisme</p>
              </div>
              <div class="col-12">
                <p>
                  Fait avec <i data-feather="heart"></i> en confinement. Hébergé en 🇫🇷 chez <a href="https://scalingo.com/fr" target="_blank">Scalingo</a>. Fond d'écran par <a href="https://twitter.com/ladydaner">ladydaner</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProposeModal/>
  </div>
</template>

<script>

import AlternativeList from '../components/AlternativeList.vue';
import ProposeModal from '../components/modals/ProposeModal.vue';

export default {
  name: 'Main',
  components: {
    AlternativeList,
    ProposeModal,
  },
  mounted() {
    // eslint-disable-next-line no-undef
    feather.replace();
  },
  props: [
    'destination',
    'alternative',
  ],
  data() {
    return {
      didSomething: false,
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
    sortedPlaces() {
      const {
        $loadedPlaces,
      } = this;

      return $loadedPlaces.sort((a, b) => a.label.localeCompare(b.label));
    },
    fullPlaces() {
      const {
        $loadedPlaces,
        location,
        calculateDistance,
        calculateEmission,
      } = this;

      return $loadedPlaces.map((place) => {
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
        $loadedAlternatives,
        location,
        calculateDistance,
        calculateEmission,
      } = this;

      return $loadedAlternatives.map((alternative) => {
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

      this.selected = search;
      const place = this.fullPlaces.find((d) => search.label === d.label);

      if (place) {
        this.placeFound = place;

        this.alternativesFound = this.fullAlternatives.filter(
          (a) => place.categories.filter((category) => a.categories.includes(category)).length > 0 && (this.filters.distance === '' || a.distance <= this.filters.distance),
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
      this.resetSelected();

      this.alternativesFound = [
        this.fullAlternatives[parseInt(Math.random() * this.fullAlternatives.length, 10)],
      ];
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

      // https://www.bbc.com/news/science-environment-49349566
      switch (transport) {
        case 'plane':
          emission = distance * 0.000102;
          break;
        case 'train':
          emission = distance * 0.000041;
          break;
        default:
          emission = distance * 0.000102;
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

.search-text {
  padding-top: 10px;
}

.search-bar {
  min-width: 300px;
  max-width: 800px;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.search-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
}

.search-location {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .search-toolbar {
    flex-direction: row;
    align-items: center;
  }
}

.search-distance {
  width: 70px;
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
