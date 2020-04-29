<template>
  <div class="alternative pure-g">
    <div class="pure-u-1">
      <h3>{{ alternative.label }}</h3>
    </div>
    <div class="pure-u-1 pure-u-md-1-3" style="border: 1px solid red;">
      Description
    </div>
    <div class="pure-u-1 pure-u-md-2-3" style="border: 1px solid red; max-width: 200px;">
      <div v-if="alternative.images.length > 0">
        <agile class="main-agile" ref="main" :options="options1" :as-nav-for="asNavFor1">
          <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
            <img :src="`assets/images/${slide.path}`">
          </div>
        </agile>
        <agile class="thumbnails" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
          <div class="slide slide--thumbniail" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`" @click="$refs.thumbnails.goTo(index)">
            <img :src="`assets/images/${slide.path}`">
          </div>
          <template slot="prevButton">
            <span>previous</span>
          </template>

          <template slot="nextButton">
            <span>next</span>
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
    alternative: Object
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
				slidesToShow: 3,
				responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 1000,
            settings: {
              navButtons: true
            }
          }
        ]
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.main-agile {
	margin-bottom: 30px;
}

.thumbnails {
	margin: 0 -5px;
	width: calc(100% + 10px);
}

.agile__slide {
	align-items: center;
	box-sizing: border-box;
	color: #fff;
	display: flex;
	height: 450px;
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