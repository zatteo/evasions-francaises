<template>
  <div class="card">
    <div class="card-header text-left">
      <h4 class="d-inline-block mb-0">
        {{ alternative.label }}
      </h4>
      <span
        v-for="validCategory in validCategories"
        :key="`validCategory-${validCategory}`"
        class="badge badge-info ml-1"
      >
        {{ validCategory }}
      </span>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-md-4 order-2 order-md-1 description-wrapper">
          <div class="card description-card">
            <div class="card-body">
              <p v-html="alternative.description" class="text-justify"></p>
              <!-- popover -->
              <div v-if="destination" :id="`popover-stats-${alternative.slug}`">
                <h5><span class="badge badge-primary" style="font-size: 85%; font-weight: normal;">
                  Distance
                  <b>{{ distanceDifference }} km</b>
                </span></h5>
                &nbsp;
                <h5><span class="badge badge-primary" style="font-size: 85%; font-weight: normal;">
                  CO₂
                  <b>{{ emissionDifferenceInPercent }} %</b>
                </span></h5>
                <b-popover :target="`popover-stats-${alternative.slug}`" triggers="hover" placement="top">
                  <template v-slot:title>Calcul des émissions de CO₂</template>
                  <p>
                    Les émissions de CO₂ sont calculées sur la base d'un passager en avion
                    pour la destination et l'alternative, en fonction des distances à vol d'oiseau.
                  </p>
                  <p>
                    <b>Distance</b> : {{ alternative.distance }}km
                    au lieu de {{ destination.distance }}km
                    <b>Émission</b> : {{ alternative.emission }}t de CO₂
                    au lieu de {{ destination.emission }}t de CO₂
                  </p>
                  <a href="https://www.bbc.com/news/science-environment-49349566" target="_blank">Source</a>
                </b-popover>
              </div>
              <br>
              <a href="" v-b-modal="`map-modal-${alternative.slug}`" @click.prevent>
                Afficher sur une carte
              </a>
              <br>
              <a :href="alternative.links && alternative.links[0]" target="_blank">
                En savoir plus
              </a>
              <br>
              <br>
              <i data-feather="alert-triangle" style="width: 16px; height: 16px;"></i>
              Coronavirus
              <i data-feather="alert-triangle" style="width: 16px; height: 16px;"></i>
              <br>
              <p class="font-italic">
                Le combat contre le coronavirus est notre responsabilité à tous.
                Respectez les consignes locales et les gestes barrières.
              </p>
            </div>
          </div>
          <DisplayMapModal :alternative="alternative"/>
        </div>
        <div class="col-12 col-md-8 order-1 order-md-2">
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            v-model="imageIndex"
          >
            <b-carousel-slide
              v-for="image in alternative.images"
              :key="image.path"
              :caption="image.description"
              :text="image.source ? `Crédit photo : ${image.source}` : ''"
              content-visible-up="md"
            >
              <template v-slot:img>
                <img
                  class="image"
                  width="1024"
                  height="480"
                  :src="`/assets/images/medium/${image.path}`"
                  alt="..."
                >
              </template>
            </b-carousel-slide>
          </b-carousel>
          <p class="carousel-caption-mobile">
            {{ caption.description }}
            {{ caption.source }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DisplayMapModal from './modals/DisplayMapModal.vue';

export default {
  name: 'Alternative',
  components: {
    DisplayMapModal,
  },
  props: {
    alternative: Object,
    destination: Object,
  },
  mounted() {
    // eslint-disable-next-line no-undef
    feather.replace();
  },
  data() {
    return {
      imageIndex: 0,
    };
  },
  computed: {
    distanceDifference() {
      const { alternative, destination } = this;

      return alternative.distance - destination.distance;
    },
    emissionDifferenceInPercent() {
      const { alternative, destination } = this;

      const emission = ((alternative.emission - destination.emission) / destination.emission);

      return parseInt((emission * 100).toFixed(2), 10);
    },
    validCategories() {
      const { alternative, destination } = this;

      return destination
      && destination.categories.filter((category) => alternative.categories.includes(category));
    },
    caption() {
      return {
        description: this.alternative.images[this.imageIndex].description || '',
        source: this.alternative.images[this.imageIndex].source ? `(par ${this.alternative.images[this.imageIndex].source})` : '',
      };
    },
  },
  methods: {
  },
  watch: {
    alternative: {
      handler() {
        this.imageIndex = 0;
      },
    },
  },
};

</script>

<style>

@media (min-width: 767px) {
  .carousel-caption-mobile {
    display: none;
  }
}

</style>

<style scoped>

.title-wrapper {
  text-align: left;
  margin-bottom: 10px;
}

.description-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.description-card {
  flex: 1;
  margin-top: 0px;
  margin-bottom: 10px;
}

.carousel-item {
  background-color: white !important;
}

@media (max-width: 767px) {
  .image {
    max-width: 100%;
    height: auto;
  }
}

@media (min-width: 768px) {
  .image {
    max-height: 100%;
    width: auto;
  }
}

</style>
