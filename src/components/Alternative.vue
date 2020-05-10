<template>
  <div class="alternative pure-g">
    <div class="pure-u-1 title-wrapper">
      <h3>{{ alternative.label }}</h3>
    </div>
    <div class="pure-u-1 pure-u-md-1-3 description-wrapper">
      Description de l'endroit...

      <div>
        Distance : {{ alternative.distance }} km (au lieu de {{ place.emission }} km)
        <br>
        CO² : -x t de CO² ({{ alternative.emission }} t au lieu de {{ place.emission }} t)
      </div>
    </div>
    <div class="pure-u-1 pure-u-md-2-3">
      <div v-if="alternative.images.length > 0">
        <agile class="main-agile" ref="main" :options="options1" :as-nav-for="asNavFor1">
          <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
            <img :src="`assets/images/${slide.path}`">
          </div>
        </agile>
        <agile v-if="alternative.images.length > 1" class="thumbnails" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
          <div class="slide slide--thumbniail" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`" @click="$refs.thumbnails.goTo(index)">
            <img :src="`assets/images/${slide.path}`">
          </div>
          <template slot="prevButton">
            <span>&#60;</span>
          </template>

          <template slot="nextButton">
            <span>&#62;</span>
          </template>
        </agile>
      </div>
    </div>
  </div>
</template>

<script>
import { VueAgile } from 'vue-agile'

export default {
  name: 'Alternative',
  components: {
    agile: VueAgile
  },
  props: {
    alternative: Object,
    place: Object,
  },
  data () {
		return {
			asNavFor1: [],
			asNavFor2: [],
			options1: {
				dots: false,
				fade: true,
				navButtons: false
			},
			options2: {
				autoplay: true,
				centerMode: true,
				dots: false,
				navButtons: false,
				slidesToShow: 5,
      },
    }
  },
  computed: {
    slides() {
      return this.alternative.images;
    }
  },
  mounted () {
		this.asNavFor1.push(this.$refs.thumbnails)
		this.asNavFor2.push(this.$refs.main)
	}
}
</script>

<style scoped>
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

.title-wrapper {
  text-align: left;
}

.description-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.alternative {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.main-agile {
}

.thumbnails {

}

.agile__slide {
	align-items: center;
	box-sizing: border-box;
	color: #fff;
	display: flex;
	justify-content: center;
}

.agile__slide--thumbniail {
  cursor: pointer;
  height: 100px;
  padding: 0 5px;
  transition: opacity .3s;
}

.agile__slide--thumbniail:hover {
  opacity: .75
}

/* .agile__slide img {
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
} */
</style>