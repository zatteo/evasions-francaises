<template>
  <div class="container">
    <div class="main">
      <div class="row">
        <div class="col-12">
          <div class="search">
            <p class="title">Destinations Alternatives</p>
            <p class="search-title">"Qui a dit qu'il fallait prendre l'avion pour s'évader ?"</p>
            <b
              class="search-text"
            >Entrez votre destination lointaine et découvrez les plus belles alternatives à moins de 1000km.</b>
            <br />
            <div class="search-bar">
              <v-select
                :value="selected"
                @input="setSelected"
                :options="places"
                :placeholder="`Bali, Grand Canyon, et ${places.length - 2} autres destinations...`"
              ></v-select>
              <button
                type="button"
                class="btn btn-primary btn-lg search-button"
                @click="resetSelected"
              >
                reset
              </button>
            </div>
            <div class="location">
              Votre localisation : {{ location.name }} ({{location.latitude}} : {{location.longitude}})
              <button @click="getLocation">Me géolocaliser</button>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="result">
            <!-- <div v-if="placeFound">
        <Place :place="placeFound"/>
            </div>-->
            <AlternativeList v-if="alternativesFound.length > 0" :alternatives="alternativesFound" :place="placeFound" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="why">
            <p class="why-title">Pourquoi ce site ?</p>
            <b>Avec l'avion, le crédit carbone individuel annuel est dépassé en une seule fois .</b>
            <ul>
              <li>L’empreinte carbone moyenne d’un français est de 12 tonnes d’équivalent CO2 par an (en prenant en compte les émissions importées/exportées).</li>
              <br />
              <br />
              <li>Pour atteindre la neutralité carbone à l’échelle mondiale, il faudrait que chacun émette au maximum 1,5 tonne par an et donc diviser par 6 ses propres émissions.</li>
              <br />
              <br />
              <li>Un aller retour Paris-New-York émettant 2,5 tonnes d’équivalent CO2 par passager, les longs trajets en avion ne sont pas compatibles avec le budget carbone des Français.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Place from './Place'
import AlternativeList from "./AlternativeList";

import loadedAlternatives from "../assets/alternatives";
import loadedPlaces from "../assets/places";

export default {
  name: "Main",
  components: {
    // Place,
    AlternativeList
  },
  props: {
    msg: String
  },
  data() {
    return {
      places: loadedPlaces,
      alternatives: loadedAlternatives,
      selected: "",
      placeFound: undefined,
      alternativesFound: [],
      location: {
        name: 'Paris',
        latitude: 48.8534,
        longitude: 2.3488,
      }
    };
  },
  computed: {
    fullPlaces() {
      const { places, location, calculateDistance, calculateEmission } = this;

      return places.map((place) => {
        const distance = calculateDistance(location.latitude, location.longitude, place.latitude, place.longitude);

        const emission = calculateEmission(distance, 'plane');

        return {
          ...place,
          distance,
          emission,
        }
      });
    },
    fullAlternatives() {
      const { alternatives, location, calculateDistance, calculateEmission } = this;

      return alternatives.map((alternative) => {
        const distance = calculateDistance(location.latitude, location.longitude, alternative.latitude, alternative.longitude);

        const emission = calculateEmission(distance, 'plane');

        return {
          ...alternative,
          distance,
          emission,
        }
      });
    },
  },
  methods: {
    setSelected(search) {
      this.selected = search;
      const place = this.fullPlaces.find(d => search.label === d.label);

      if (place) {
        this.placeFound = place;
        this.alternativesFound = this.fullAlternatives.filter(a =>
          place.alternatives.includes(a.label)
        );
      } else {
        this.placeFound = undefined;
        this.alternativesFound = [];
      }
    },
    resetSelected() {
      this.selected = "";
      this.placeFound = undefined;
      this.alternativesFound = [];
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.location.name = 'GPS';
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
        }, (error) => {
          console.log(error)
        }, { timeout: 10000 });
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    },
    toRad(Value) {
      return Value * Math.PI / 180;
    },
    calculateEmission(distance, transport) {
      let emission;

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

      return emission.toFixed(2);
    }
  },
  watch: {
    fullAlternatives() {
      this.setSelected(this.selected);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico");
@font-face {
  font-family: PacificoLight;
  src: url("./../assets/Pacifico-Light.ttf");
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-button {
  margin-top: 2%;
}

.btn-primary {
  background-color: #3fac8c !important;
  border-color: #3fac8c !important;
}

.title {
  margin: 2% 0 0 0;
  font-size: 4rem;
  font-family: "Pacifico";
}

.search {
  padding: 3% 3% 0 3%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
}

.search-title {
  font-family: "PacificoLight";
  padding: 0 0 5% 0;
  font-size: 2rem;
}

.why {
  padding-top: 2%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
}

.why-title {
  font-family: "PacificoLight";
  font-size: 3rem;
}

.search-bar {
  min-width: 300px;
  max-width: 800px;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.result {
  margin-top: 10px;
  background-color: #fefefe;
  border-radius: 10px;
}

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 1s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
