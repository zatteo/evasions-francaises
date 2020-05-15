<template>
  <div class="card">
    <h3 class="card-header">{{ alternative.label }}</h3>
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-md-4 description-wrapper">
          <div class="card description-card">
            <div class="card-body">
              <h4 class="card-title text-muted">Description</h4>
              <p>
                blablabla
              </p>
            </div>
          </div>
          <div v-if="place" class="card">
            <div class="card-body">
              <h4 class="card-title text-muted">Bilan carbone</h4>
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
              <br>
              <a href="" v-b-modal.map-modal @click.prevent>
                Afficher sur une carte
              </a>

              <b-modal
                id="map-modal"
                title="Carte"
              >
                <div class="map">
                  <img :src="`assets/maps/${alternative.label}.jpg`">
                </div>
                <template v-slot:modal-footer="{ ok }">
                  <b-button size="sm" variant="success" @click="ok()">
                    OK
                  </b-button>
                </template>
              </b-modal>
            </div>
          </div>
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
    <div class="card-footer text-muted">
      <button @click="$emit('nextAlternative')" type="button" class="btn btn-primary">
        Une autre alternative !
      </button>
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
