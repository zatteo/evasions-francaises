<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card search-card">
            <a href="/" @click.prevent="resetSelected(true)">
              <!-- <p class="title">Évasions françaises</p<img > -->
              <img src="/assets/logo_text_green.png" class="title">

            </a>
            <p
              class="search-text"
            >
             Cherchez votre prochaine destination parmi plus de {{ $loadedAlternatives.length }}
             alternatives françaises aux plus belles destinations du monde, ou
            <a href="" v-b-modal.propose-alternative-modal @click.prevent>
              proposez votre alternative</a>.
            </p>
            <br />
            <div class="search-bar">
              <v-select
                :value="selected"
                @input="setSelected"
                :reduce="destination => destination.slug"
                label="title"
                :options="sortedDestinations"
                :placeholder="`Bali, Grand Canyon, ...`"
              ></v-select>
              <div class="search-toolbar text-legend">
                <span class="search-location">
                  Votre localisation : {{ location.name }} ({{location.latitude}}
                  : {{location.longitude}})
                  <a
                    href=""
                    v-b-modal.get-location-modal @click.prevent
                  >
                    Me localiser
                  </a>
                </span>
                <span>
                  Distance maximale :
                  <input
                    id="distance"
                    class="search-distance"
                    v-model="filters.distance"
                    type="number"
                    step="10"
                  >
                  km
                </span>
              </div>
            </div>
            <div class="row">
              <button
                type="button"
                class="btn btn-primary btn-toolbar" @click="setRandomDestination"
              >
                Une destination au hasard
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
              :alternatives="alternatives"
              :didSomething="didSomething"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <NewsletterForm/>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card why-card">
            <div class="card-body">
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
                <a href="" v-b-modal.propose-alternative-modal @click.prevent>
                  proposer votre alternative
                </a>.
              </p>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <img class="why-icon" src="/assets/map.png">
                  <p class="why-icon-text">Soutenir le tourisme local</p>
                </div>
                <div class="col-12 col-sm-6">
                  <img class="why-icon" src="/assets/pollution.png">
                  <p class="why-icon-text">Réduire les émissions de CO₂ liées au tourisme</p>
                </div>
              </div>
              <p>
                Fait avec <i data-feather="heart"></i> en confinement. Hébergé en 🇫🇷 chez <a href="https://scalingo.com/fr" target="_blank">Scalingo</a>. Fond d'écran par <a href="https://twitter.com/ladydaner">ladydaner</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GetLocationModal v-on:locationReceived="setLocation"/>
    <ProposeAlternativeModal/>
  </div>
</template>

<script>

import AlternativeList from '../components/AlternativeList.vue';
import ProposeAlternativeModal from '../components/modals/ProposeAlternativeModal.vue';
import GetLocationModal from '../components/modals/GetLocationModal.vue';
import NewsletterForm from '../components/NewsletterForm.vue';

export default {
  name: 'Main',
  components: {
    AlternativeList,
    ProposeAlternativeModal,
    GetLocationModal,
    NewsletterForm,
  },
  mounted() {
    const { destinationSlug } = this;

    if (destinationSlug) {
      this.selected = destinationSlug;
      this.destination = this.fullDestinations.find((a) => a.slug === this.destinationSlug);
    }

    // eslint-disable-next-line no-undef
    feather.replace();
  },
  props: [
    'destinationSlug',
  ],
  data() {
    return {
      didSomething: false,
      selected: '',
      destination: undefined,
      alternatives: [],
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
    sortedDestinations() {
      const {
        $loadedDestinations,
      } = this;

      return $loadedDestinations.sort((a, b) => a.label.localeCompare(b.label)).map((d) => ({
        title: `${d.label}${d.country ? `, ${d.country}` : ''}`,
        ...d,
      }));
    },
    fullDestinations() {
      const {
        $loadedDestinations,
        location,
        calculateDistance,
        calculateEmission,
      } = this;

      return $loadedDestinations.map((destination) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          destination.latitude,
          destination.longitude,
        );

        const emission = calculateEmission(distance, 'plane');

        return {
          ...destination,
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
    setSelected(searchedSlug) {
      this.didSomething = true;

      if (searchedSlug === null) {
        this.resetSelected();
      }

      this.selected = searchedSlug;
      const destination = this.fullDestinations.find((d) => searchedSlug === d.slug);

      if (destination) {
        this.destination = destination;

        this.alternatives = this.fullAlternatives.filter(
          (a) => destination.categories.filter((category) => a.categories.includes(category)).length > 0 && (this.filters.distance === '' || a.distance <= this.filters.distance),
        );
      } else {
        this.destination = undefined;
        this.alternatives = [];
      }
    },
    resetSelected(full) {
      this.selected = '';
      this.destination = undefined;
      this.alternatives = [];

      if (full) {
        this.didSomething = false;
        this.$router.push('/');
      }
    },
    setRandomDestination() {
      this.resetSelected();

      this.setSelected(this.fullDestinations[parseInt(
        Math.random() * this.fullDestinations.length, 10,
      )].slug);
    },
    setLocation(location) {
      this.location = location;
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

@font-face {
  font-family: Sacramento;
  src: url("/assets/fonts/Sacramento/Sacramento-Regular.ttf");
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
  max-width: 70%;
}

@media (min-width: 768px) {
  .title {
    max-width: 300px;
  }
}

.search-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1%;
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

.why-icon {
  width: 20%;
}

</style>
