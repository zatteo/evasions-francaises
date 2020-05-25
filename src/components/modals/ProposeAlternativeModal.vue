<!-- eslint-disable -->
<template>
  <b-modal
    id="propose-alternative-modal"
    title="Proposer une alternative"
  >
    <div class="propose-alternative">
      <p>
        Pour proposer une alternative, rien de plus simple !
        Envoyez-nous un petit message par mail à l'adresse
        <a href="mailto:bonjour@evasions-francaises.fr">
          bonjour@evasions-francaises.fr
        </a> ou par le chat en bas à droite de votre écran.
      </p>
      <p>
        Parmi ces informations, plus vous nous en donnez, mieux c'est !
        <ul>
          <li>Les destinations correspondantes</li>
          <li>Une description</li>
          <li>La longitude</li>
          <li>La latitude</li>
        </ul>
      </p>
      Merci ! On a hâte de lire vos propositions 😉
    </div>
    <template v-slot:modal-footer="{ ok }">
      <b-button class="btn btn-primary" size="sm" @click="ok()">
        OK
      </b-button>
    </template>
  </b-modal>
</template>

<script>

export default {
  name: 'ProposeAlternativeModal',
};

</script>

<style scoped>

</style>
