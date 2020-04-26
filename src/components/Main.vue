<template>
  <div class="main">
    <h1>Entrez votre destination</h1>
    <b>Qui a dit qu'il fallait aller à Bali pour décompresser ? Les plus beaux paysages sont à côté de nous :)</b>
    <br>
    <div style="width: 600px;">
       <v-select :value="selected" @input="setSelected" :options="places" :placeholder="`Bali, Grand Canyon, et ${places.length - 2} autres destinations...`"></v-select>
    </div>
    <br>
    <div v-if="placeFound">
      <Place :place="placeFound"/>
    </div>
    <AlternativeList :alternatives="alternativesFound"/>

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
import Place from './Place'
import AlternativeList from './AlternativeList'

import loadedAlternatives from '../assets/alternatives';
import loadedPlaces from '../assets/places';

export default {
  name: 'Main',
  components: {
    Place,
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
</style>
