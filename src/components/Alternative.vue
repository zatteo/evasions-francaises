<template>
  <div class="alternative row">
    <div class="col-12 title-wrapper">
      <h3>{{ alternative.label }}</h3>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 description-wrapper">
        Description de l'endroit...
        <div v-if="place">
          <b>
            Votre destination est plus de proche de
            {{ Math.abs(alternative.distance - place.distance) }} km
          </b>
          <br>
          {{ alternative.distance }} km au lieu de {{ place.distance }} km
          <br>
          <b>
            Émission de CO² :
            {{
              parseInt((((alternative.emission - place.emission) / place.emission ) * 100)
              .toFixed(2))
            }} %
          </b>
          <br>
          {{ alternative.emission }} t au lieu de {{ place.emission }} t
          <img style="width: 100%" :src="`assets/maps/${alternative.label}.jpg`">
        </div>
      </div>
      <div class="col-12 col-md-8">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            v-for="image in alternative.images"
            :key="image.path"
            :caption="image.description"
            :text="image.source"
          >
            <template v-slot:img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                :src="`assets/images/${image.path}`"
                alt="image slot"
              >
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Alternative',
  components: {
  },
  props: {
    alternative: Object,
    place: Object,
  },
  computed: {
    slides() {
      return this.alternative.images;
    },
  },
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

</style>
