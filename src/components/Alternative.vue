<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 description-wrapper">
        <div class="card description-card">
          <div class="card-body">
            <h4 class="card-title text-muted">
              {{ alternative.label }}
            </h4>
            <p v-html="alternative.description"></p>
            <div v-if="place">
              <!-- <button type="button" class="btn btn-primary"> -->
                <h5><span class="badge badge-primary" style="font-size: 85%; font-weight: normal;">
                  Distance
                  <b>{{ distanceDifference }} km</b>
                </span></h5>
              <!-- </button> -->
              &nbsp;
              <!-- <button type="button" class="btn btn-primary"> -->
                <h5><span class="badge badge-primary" style="font-size: 85%; font-weight: normal;">
                  CO²
                  <b>{{ emissionDifferenceInPercent }} %</b>
                </span></h5>
              <!-- </button> -->
            </div>
            <br>
            <a href="" v-b-modal.map-modal @click.prevent>
              Afficher sur une carte
            </a>
            <br>
            <a :href="alternative.links && alternative.links[0]" target="_blank">
              En savoir plus
            </a>
          </div>
        </div>
        <b-modal
          id="map-modal"
          title="Carte"
        >
          <div class="map">
            <img
              :src="`assets/maps/${alternative.label}.jpg`"
              alt="La carte n'est pas disponible :/"
            >
          </div>
          <template v-slot:modal-footer="{ ok }">
            <b-button size="sm" variant="success" @click="ok()">
              OK
            </b-button>
          </template>
        </b-modal>
      </div>
      <div class="col-12 col-md-8">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <b-carousel-slide
            v-for="image in alternative.images"
            :key="image.path"
            :caption="image.description"
            :text="image.source"
          >
            <template v-slot:img>
              <img
                class="image"
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
    distanceDifference() {
      const { alternative, place } = this;

      return alternative.distance - place.distance;
    },
    emissionDifferenceInPercent() {
      const { alternative, place } = this;

      const emissionInPercent = ((alternative.emission - place.emission) / place.emission) * 100;

      return parseInt(emissionInPercent.toFixed(2), 10);
    },
  },
};

</script>

<style scoped>

.title-wrapper {
  text-align: left;
}

.description-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: justify;
}

.description-card {
  flex: 1;
  margin-bottom: 10px;
}

.carousel-item {
  background-color: white !important;
}

.image {
  max-height: 100%;
  width: auto;
}

.map {
  text-align: center;
}

.map img {
 width: 100%;
}

</style>
