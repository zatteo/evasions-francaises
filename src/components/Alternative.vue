<template>
  <div class="row">
    <div class="col">
      <div class="alternative pure-g">
        <div class="pure-u-1 title-wrapper">
          <h3>{{ alternative.label }}</h3>
        </div>
        <div class="pure-u-1 pure-u-md-1-3 description-wrapper">
          Morbi ut sem mollis, vehicula urna id, convallis velit. Aliquam ex urna, mollis eget commodo eu, viverra ut est. Aliquam at nulla quam. Sed consectetur dictum neque, ac convallis quam molestie non. Sed tempor accumsan laoreet. Duis vitae suscipit risus. Aliquam interdum fermentum placerat. Suspendisse pellentesque consequat orci, pellentesque porttitor massa facilisis eu. Suspendisse et lorem euismod, dapibus quam eget, tincidunt quam. Etiam ornare lacus ac dui egestas gravida.
          <div>
            Distance : x km (au lieu de y km)
            <br />CO² économisé : x t de CO²
          </div>
        </div>
        <div class="pure-u-1 pure-u-md-2-3">
          <div v-if="alternative.images.length > 0">
            <agile class="main-agile" ref="main" :options="options1" :as-nav-for="asNavFor1">
              <div
                class="slide"
                v-for="(slide, index) in slides"
                :key="index"
                :class="`slide--${index}`"
              >
                <img class="image" :src="`assets/images/${slide.path}`" />
              </div>
            </agile>
            <agile
              v-if="alternative.images.length > 1"
              class="thumbnails"
              ref="thumbnails"
              :options="options2"
              :as-nav-for="asNavFor2"
            >
              <div
                class="slide slide--thumbniail"
                v-for="(slide, index) in slides"
                :key="index"
                :class="`slide--${index}`"
                @click="$refs.thumbnails.goTo(index)"
              >
                <img class="image" :src="`assets/images/${slide.path}`" />
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
    </div>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";

export default {
  name: "Alternative",
  components: {
    agile: VueAgile
  },
  props: {
    alternative: Object
  },
  data() {
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
        slidesToShow: 5
      }
    };
  },
  computed: {
    slides() {
      return this.alternative.images;
    }
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  }
};
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

.image {
  max-width: 600px;
}

.title-wrapper {
  font-family: "Pacifico";
  text-align: left;
  margin: 1%;
}

.description-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: justify;
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
  transition: opacity 0.3s;
}

.agile__slide--thumbniail:hover {
  opacity: 0.75;
}

/* .agile__slide img {
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
} */
</style>