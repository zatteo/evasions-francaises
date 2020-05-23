<template>
  <div>
    <ul>
      <li v-for="alternative in alternatives" :key="alternative.label">
        {{ alternative.label }}
      </li>
    </ul>
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
