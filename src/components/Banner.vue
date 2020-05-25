<!-- eslint-disable -->
<template>
  <div :class="`d-none d-${display}`">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="bottom">
      <div style="display: flex; flex: 1; justify-content: center;">
        <div class="sib-form" style="text-align: center; background-color: transparent;">
          <div id="sib-form-container" class="sib-form-container">
            <div id="sib-container" class="sib-container--large sib-container--vertical" style="text-align:center; background-color:transparent;">
              <form id="sib-form" method="POST" target="_blank" action="https://49647813.sibforms.com/serve/MUIEAIDNAj1BpQurHFg13yAKRQu1avO9JBfwFNrDDhv1hmu6BEqlLWPjcwQhHpYV42SqRl38duzdVzrDGiDs7zo4VZY2HEyy98yRhwWzJpySEwEMcdvbTrbUmgFo7f5IwlpElOpEAdjVSBh3ZiL_MIhd5HIEEuvAmjzlOBEsFxXYNl3pKElD5sMlv_aiHMHoRtjhPCjL5zdlPLf4">
                <div style="padding: 8px 0;">
                  <div class="sib-form-block" style="font-size:18px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#ffffff; background-color:transparent; border-width:px;">
                    <p>Vous ne trouvez pas votre bonheur ? Recevez les prochaines alternatives dans votre boite mail !</p>
                    <p style="font-size:16px; font-weight:normal;"> </p>
                  </div>
                </div>
                <div>
                  <div class="sib-input sib-form-block">
                    <div class="form__entry entry_block">
                      <div class="form__label-row ">

                        <div class="entry__field">
                          <input class="input" maxlength="200" type="text" id="PRENOM" name="PRENOM" autocomplete="off" placeholder="PRENOM" data-required="true" required />
                        </div>
                      </div>

                      <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;">
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="sib-input sib-form-block">
                    <div class="form__entry entry_block">
                      <div class="form__label-row ">

                        <div class="entry__field">
                          <input class="input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="EMAIL" data-required="true" required />
                        </div>
                      </div>

                      <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;">
                      </label>
                    </div>
                  </div>
                </div>
                <div style="padding: 8px 0;">
                  <div class="sib-form-block" style="text-align: left">
                    <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#FFFFFF; background-color:#3E4857; border-radius:3px; border-width:0px;"
                      form="sib-form" type="submit">
                      <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                        <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                        />
                      </svg>
                      JE M&#039;INSCRIS
                    </button>
                  </div>
                </div>
                <input type="text" name="email_address_check" value="" class="input--hidden">
                <input type="hidden" name="locale" value="fr">
                <input type="hidden" name="html_type" value="simple">
              </form>
            </div>
          </div>
        </div>
      </div>
      <a class="close-banner" @click="display = 'none'">
        <i data-feather="x"></i>
      </a>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'Banner',
  props: {
    didSomething: Boolean,
    alternatives: Array,
    place: Object,
  },
  mounted() {
    // eslint-disable-next-line no-undef
    feather.replace();
  },
  data() {
    return {
      display: 'md-flex',
    };
  },
};

</script>

<style scoped>

/* supprimer max-width et border dans sib-container */
/* supprimer padding dans les input */
.sib-form {
  padding: 0;
}

#sib-container {
  padding: 0;
}

#sib-form {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  #sib-form {
    flex-direction: row;
    align-items: center;
  }
}

.close-banner {
  color: white !important;
  position: absolute;
  top: 5px;
  right: 5px;
}

</style>
