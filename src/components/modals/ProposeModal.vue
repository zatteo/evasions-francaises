<!-- eslint-disable -->
<template>
  <b-modal
    id="propose-modal"
    title="Proposer une alternative"
  >
    <div class="propose">
      <p>
        Pour proposer une alternative, rien de plus simple !
        Envoyez-nous un petit message par mail à l'adresse
        <a href="mailto:bonjour@evasions-francaises.fr">
          bonjour@evasions-francaises.fr
        </a> ou par le chat en bas à droite de votre écran !
      </p>
      <p>
        Quelles informations sont utiles ?
        <ul>
          <li>Les destinations proches</li>
          <li>Une description</li>
          <li>La longitude</li>
          <li>La latitude</li>
        </ul>
      </p>
      Merci !
    </div>
    <template v-slot:modal-footer="{ ok }">
      <b-button size="sm" variant="success" @click="ok()">
        OK
      </b-button>
    </template>
  </b-modal>
</template>

<script>

export default {
  name: 'ProposeModal',
};

</script>

<style scoped>

</style>
