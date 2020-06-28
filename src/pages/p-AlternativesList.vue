<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="card w-100">
          <div class="card-header text-left">
            <h4>
              Toutes les alternatives
            </h4>
          </div>
          <div class="card-body text-left">
            <ul>
              <li v-for="alternative in alternatives" :key="alternative.label">
                <router-link
                  :to="`/alternative/${alternative.slug}`"
                >
                  {{ alternative.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import loadedAlternatives from '../assets/alternatives.json';

export default {
  name: 'AlternativeList',
  data() {
    return {
      alternatives: loadedAlternatives,
    };
  },
};

</script>

<style>

</style>
