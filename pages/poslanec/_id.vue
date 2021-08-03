<template lang="pug">

  .poslanec-detail.page

    .poslanec-main-metadata.alt-bg

      .section-content-max-width

        .main-title-container
          h1.typography-main-title.no-margin-bottom(v-if="!showFullNameWithTitles") {{poslanec.Jmeno}} {{poslanec.Prijmeni}}
          h1.typography-main-title.no-margin-bottom(v-if="showFullNameWithTitles") {{tituly}} {{poslanec.CeleJmeno}}
          a(href="#" @click="toggleFullNameWithTitles($event)").button-show-full-name.typography-body-text
            span(v-if="!showFullNameWithTitles") Zobrazit celé jméno a tituly
            span(v-if="showFullNameWithTitles") Skrýt celé jméno s tituly


        .poslanec-main-info-container.section-padding

          .columns
            .column.is-two-fifths-widescreen


              .gallery-widget-container
                .gallery-widget



            .column.is-three-fifths-widescreen

              .columns
                .column.is-one-third-widescreen

                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3 Narozen/a :TODO:
                    .metadata-section-content.typography-item-detail-text
                      div {{poslanec.DatumNarozeniZobrazene}}
                      //- div(v-if="adresaNarozeni.mesto") {{adresaNarozeni.mesto}}
                      //- div {{adresaNarozeni.zeme}}

                .column.is-one-third-widescreen
                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3 Úmrtí
                    .metadata-section-content.typography-item-detail-text
                      div {{poslanec.DatumUmrtiZobrazene}}
                      //- div(v-if="adresaUmrti.mesto") {{adresaUmrti.mesto}}
                      //- div {{adresaUmrti.zeme}}

                .column.is-one-third-widescreen
                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3 Vyznání
                    .metadata-section-content.typography-item-detail-text
                      div {{nabozenstviNarozeni}}

              .columns
                .column.is-one-third-widescreen

                  .metadata-section(v-if="profese")
                    .metadata-section-title.typography-metadata-section-title
                      h3 Profese
                    .metadata-section-content.typography-item-detail-text
                      div.profese(v-for="profeseItem in profese" :key="profese.mandatId")
                        div.profese-title {{profeseItem.profese}}
                        div.profese-date-range (během mandátu {{profeseItem.datumZacatku}} &mdash; {{profeseItem.datumKonce}})

                .column.is-one-third-widescreen
                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3 Vzdělání
                    .metadata-section-content.typography-item-detail-text
                      div {{poslanec.Vzdelani}}

                .column.is-one-third-widescreen
                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3 Počet mandátů
                    .metadata-section-content.typography-item-detail-text
                      div {{pocetMandatu}}


    .parlament-detail-events.section-padding-h-margin-v

      h2.typography-section-title Důležité události poslance

      CasovaOsa(:Data="poslanec.casova_osa" v-if="poslanec.casova_osa")

    .section-padding-h-margin-v.typography-has-no-h-padding

      h2.typography-section-title Mandáty poslance ({{poslanec.Mandaty.length}})

      <MandatRadek v-for="mandat in poslanec.Mandaty" :key="mandat.Id" :Mandat="mandat"/>

      //- MandatRadek(
      //-   v-for="mandat in poslanec.Mandaty" :key="mandat.Id"
      //-   :Id="mandat.Id"
      //- )


</template>

<style lang="sass">
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"


.profese
  .profese-date-range
    font-size: 16px

.gallery-widget-container
  +from($widescreen)
    padding-right: $margin-until-desktop


.gallery-widget

  background: red

  +from($widescreen)
    height: 380px



.metadata-section
  margin-bottom: $margin-until-desktop

  .metadata-section-title
    margin-bottom: 1em

.main-title-container
  margin: 0 auto
  width: 75%
  text-align: center


  .button-show-full-name
    font-size: 12px

</style>

<script>

  export default {

      components: {  },

      async asyncData({params, error, payload, store, $axios}) {

        if (payload) {
          return {
            poslanec: payload
          }
        } else {

          //:TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items

          await store.dispatch("getPoslanecDetail", {poslanecId: params.id});

          return {
            poslanec: store.state.poslanec
          }

        }

      },

      data() {
        return {
          showFullNameWithTitles: false,
          poslanec: {
            Adresy: undefined
          }
        }
      },

      methods: {

        toggleFullNameWithTitles(e) {

          e.preventDefault();
          this.showFullNameWithTitles = !this.showFullNameWithTitles;


        },

      },

      mounted() {

        console.log(this.poslanec.Mandaty);


      },

      computed: {


        tituly() {

          return this.poslanec.Tituly.join(" ") ?? false;

        },

        pocetMandatu() {
          return this.poslanec?.Mandaty?.length || 'Neuvedeno';
        },

        profese() {

          if (this.poslanec.Mandaty) {

            const profeseArray = this.poslanec.Mandaty.reduce((acc, mandat) => {

              return [{
                profese: mandat.Profese === null ? 'Neuvedeno' : mandat.Profese,
                datumZacatku: mandat.DatumZacatkuZobrazene,
                datumKonce: mandat.DatumKonceZobrazene,
                mandatId: mandat.Id
              }];

            }, [{}]);


            return profeseArray;

          } else {
            return false;
          }

        },

        nabozenstviNarozeni() {

          const nabozenstviNarozeni = this.poslanec?.NabozenstviNarozeni;

          if (nabozenstviNarozeni === null) {
            return 'Neuvedeno'; // :TODO: It would be better to get the string via config, not hard-coded into the code here
          } else {
            return nabozenstviNarozeni;
          }

        },

        adresaNarozeni() {

          // the current form of the string "City | Information, Country"
          if (this.poslanec.Adresy) {

            // :TODO: Refactor, make the function global
            const addressObject = this.poslanec.Adresy.filter(adresa => adresa.Druh === 1)[0] ?? undefined;
            if (addressObject) {

              const parts = addressObject.Nazev.split('|');
              const city = parts[0];

              const countryParts = parts[1].split(',');
              const country = countryParts[countryParts.length-1];

              return {

                mesto: city,
                zeme: country,

              }

            }

          }

        },

        adresaUmrti() {

          // the current form of the string "City | Information, Country"

          // :TODO: Refactor, make the function global
          const addressObject = this.poslanec.Adresy.filter(adresa => adresa.Druh === 5)[0] ?? undefined;
          if (addressObject) {

            const parts = addressObject.Nazev.split('|');
            const city = parts[0];
            const countryParts = parts[1].split(',');
            const country = countryParts[countryParts.length-1];

            return {

              city,
              country,

            }

          }

        }


      },

      head () {
        return {
          title: `DOPLNIT — ${this.$config.globalTitle}`, // :TODO:
          link: [{
            rel:'stylesheet',
            href:'//unpkg.com/leaflet/dist/leaflet.css'
          },
          {
            rel:'stylesheet',
            href:'//api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css'
          }],
          htmlAttrs: {
            class: 'subpage-poslanci'
          }
        }
      }

  }
</script>
