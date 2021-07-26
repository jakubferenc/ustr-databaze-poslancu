<template lang="pug">

  .poslanec-detail.page

    .main-title-container
      h1.typography-main-title.no-margin-bottom(v-if="!showFullNameWithTitles") {{poslanec.Jmeno}} {{poslanec.Prijmeni}}
      h1.typography-main-title.no-margin-bottom(v-if="showFullNameWithTitles") {{tituly}} {{poslanec.CeleJmeno}}
      a(href="#" @click="toggleFullNameWithTitles($event)").button-show-full-name.typography-body-text
        span(v-if="!showFullNameWithTitles") Zobrazit celé jméno a tituly
        span(v-if="showFullNameWithTitles") Skrýt celé jméno s tituly


    .section-padding-h-margin-v.section-content-max-width

      .poslanec-main-info-container

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
                    div {{adresaNarozeni.city}}
                    div {{adresaNarozeni.country}}

              .column.is-one-third-widescreen
                .metadata-section
                  .metadata-section-title.typography-metadata-section-title
                    h3 Úmrtí
                  .metadata-section-content.typography-item-detail-text
                    div {{poslanec.DatumUmrtiZobrazene}}
                    div {{adresaUmrti.city}}
                    div {{adresaUmrti.country}}

              .column.is-one-third-widescreen
                .metadata-section
                  .metadata-section-title.typography-metadata-section-title
                    h3 Vyznání
                  .metadata-section-content.typography-item-detail-text
                    div {{nabozenstviNarozeni}}

            .columns
              .column.is-one-third-widescreen

                .metadata-section
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


    .parlament-detail-events.section-padding(style="background: white")

      h2.typography-section-title Důležité události

      CasovaOsa(:Data="casovaOsaData" v-if="casovaOsaData")


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

          console.log(this.poslanec);

      },

      computed: {

        casovaOsaData() {


          let casovaOsaPolozky = [];

          casovaOsaPolozky = [...casovaOsaPolozky, {

            datum_udalosti: this.poslanec.DatumNarozeni.split("T")[0],
            dulezita: true,
            nazev_udalosti: 'Datum narození',

          }];

          casovaOsaPolozky = [...casovaOsaPolozky, {

            datum_udalosti: this.poslanec.DatumUmrti.split("T")[0],
            dulezita: true,
            nazev_udalosti: 'Datum úmrtí',

          }];

          const casovePolozkyMandatyCalculated = this.poslanec.Mandaty.reduce((acc, mandat, index) => {

            acc.push({

              datum_udalosti: mandat.DatumZacatku.split("T")[0],
              dulezita: false,
              nazev_udalosti: `Začátek mandátu (${mandat.DatumZacatkuZobrazene} — ${mandat.DatumKonceZobrazene})`,

            });

            acc.push({

              datum_udalosti: mandat.DatumKonce.split("T")[0],
              dulezita: false,
              nazev_udalosti: `Konec mandátu (${mandat.DatumZacatkuZobrazene} — ${mandat.DatumKonceZobrazene})`,

            });

            return acc;

          }, [])

          casovaOsaPolozky = [...casovaOsaPolozky,...casovePolozkyMandatyCalculated];
          casovaOsaPolozky = casovaOsaPolozky.sort((a, b) => (a.datum_udalosti > b.datum_udalosti) ? 1 : (a.datum_udalosti < b.datum_udalosti ) ? -1 : 0)

          return casovaOsaPolozky;



        },

        tituly() {

          return this.poslanec.Tituly.join(" ");

        },

        pocetMandatu() {
          return this.poslanec.Mandaty.length;
        },

        profese() {

          const profeseArray = this.poslanec.Mandaty.reduce((acc, mandat) => {

            return [{
              profese: mandat.Profese === null ? 'Neuvedeno' : mandat.Profese,
              datumZacatku: mandat.DatumZacatkuZobrazene,
              datumKonce: mandat.DatumKonceZobrazene,
              mandatId: mandat.Id
            }];

          }, [{}]);


          return profeseArray;

        },

        nabozenstviNarozeni() {

          const nabozenstviNarozeni = this.poslanec.NabozenstviNarozeni;

          if (nabozenstviNarozeni === null) {
            return 'Neuvedeno'; // :TODO: It would be better to get the string via config, not hard-coded into the code here
          } else {
            return nabozenstviNarozeni;
          }

        },

        adresaNarozeni() {

          // the current form of the string "City | Information, Country"

          // :TODO: Refactor, make the function global
          const addressObject = this.poslanec.Adresy.filter(adresa => adresa.Druh === 1)[0] ?? undefined;
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
            class: 'alt-bg subpage-poslanci'
          }
        }
      }

  }
</script>
