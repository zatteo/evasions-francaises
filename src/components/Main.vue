<template>
  <div class="main">
    <div class="search">
      <h1>Qui a dit qu'il fallait prendre l'avion pour s'évader ?</h1>
      <b>Entrez votre destination lointaine et découvrez les plus belles alternatives à moins de 1000km.</b>
      <br>
      <div class="search-bar">
        <v-select :value="selected" @input="setSelected" :options="places" :placeholder="`Bali, Grand Canyon, et ${places.length - 2} autres destinations...`"></v-select>
        <button @click="resetSelected">reset</button>
      </div>
      <br>
    </div>

    <div class="result">
      <!-- <div v-if="placeFound">
        <Place :place="placeFound"/>
      </div> -->
      <AlternativeList v-if="alternativesFound.length > 0" :alternatives="alternativesFound"/>
    </div>

    <h2>Pourquoi ce site ?</h2>
    <b>Avec l'avion, le crédit carbone individuel annuel est dépassé en une seule fois .</b>
      <ul>
        <li>L’empreinte carbone moyenne d’un français est de 12 tonnes d’équivalent CO2 par an (en prenant en compte les émissions importées/exportées).</li>
        <br><br>
        <li>Pour atteindre la neutralité carbone à l’échelle mondiale, il faudrait que chacun émette au maximum 1,5 tonne par an et donc diviser par 6 ses propres émissions.</li>
        <br><br>
        <li>Un aller retour Paris-New-York émettant 2,5 tonnes d’équivalent CO2 par passager, les longs trajets en avion ne sont pas compatibles avec le budget carbone des Français.</li>
      </ul>
  </div>
</template>

<script>
// import Place from './Place'
import AlternativeList from './AlternativeList'

import loadedAlternatives from '../assets/alternatives';
import loadedPlaces from '../assets/places';

export default {
  name: 'Main',
  components: {
    // Place,
    AlternativeList,
  },
  props: {
    msg: String
  },
  data() {
    return {
      places: loadedPlaces,
      alternatives: loadedAlternatives,
      selected: '',
      placeFound: undefined,
      alternativesFound: []
    }
  },
  methods: {
      setSelected(search) {
      this.selected = search
      const place = this.places.find((d) => search.label === d.label);

      if (place) {
        this.placeFound = place;
        this.alternativesFound = this.alternatives.filter((a) => place.alternatives.includes(a.label));
      } else {
        this.placeFound = undefined;
        this.alternativesFound = [];
      }
    },
    resetSelected() {
      this.selected = '';
      this.placeFound = undefined;
      this.alternativesFound = [];
    }
  },
}
</script>

<style scoped>
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

.search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #39cccc;
  width: 95%;
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
  width: 60%;
}
</style>
