<template lang="pug">

  .poslanec-detail.page

    .poslanec-main-metadata.alt-bg

      .section-content-max-width

        .main-title-container
          h1.typography-main-title.no-margin-bottom(v-if="!showFullNameWithTitles") {{poslanec.Jmeno}} {{poslanec.Prijmeni}}
          h1.typography-main-title.no-margin-bottom(v-if="showFullNameWithTitles") {{poslanec.CeleJmeno}} <br> <span class="typography-section-title-smaller-line-height">{{tituly}}</span>
          a(href="#" @click="toggleFullNameWithTitles($event)").button-show-full-name.typography-body-text
            span(v-if="!showFullNameWithTitles") Zobrazit celé jméno a tituly
            span(v-if="showFullNameWithTitles") Skrýt celé jméno s tituly


        .poslanec-main-info-container.section-padding

          .columns
            .column.is-two-fifths-widescreen


              .gallery-widget-container
                .gallery-widget
                  img(v-if="profileImage" :src="profileImage")



            .column.is-three-fifths-widescreen

              .columns
                .column.is-one-third-widescreen

                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3
                        span(v-if="poslanec.Pohlavi === 1") Narozen
                        span(v-if="poslanec.Pohlavi === 2") Narozena
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
                    .metadata-section-content.typography-item-detail-text.metadata-content-multiple
                      div.profese.item(v-for="profeseItem in profese" :key="profese.mandatId")
                        div.profese-title {{profeseItem.profese}}
                        div.profese-date-range (během mandátu {{profeseItem.datumZacatku}} &mdash; {{profeseItem.datumKonce}})

                .column.is-one-third-widescreen
                  .metadata-section.metadata-section-education
                    .metadata-section-title.typography-metadata-section-title
                      h3 Vzdělání
                    .metadata-section-content.typography-item-detail-text(v-for="(vzdelaniItem, index) in poslanec.Vzdelani" :key="index")
                      div.metadata-content-multiple(v-if="poslanec.Vzdelani.length > 1")
                        div.item {{vzdelaniItem.Nazev}}
                      div(v-else)
                        div {{vzdelaniItem.Nazev}}

                .column.is-one-third-widescreen
                  .metadata-section
                    .metadata-section-title.typography-metadata-section-title
                      h3 Počet mandátů
                    .metadata-section-content.typography-item-detail-text
                      div {{pocetMandatu}}


    .parlament-detail-events.section-padding-h-margin-v

      h2.section-title Důležité události poslance

      CasovaOsa(:Data="poslanec.CasovaOsa" v-if="poslanec.CasovaOsa")

    .section-padding-h-margin-v.typography-has-no-h-padding

      h2.section-title Mandáty poslance ({{poslanec.Mandaty.length}})

      <MandatRadek v-for="mandat in poslanec.Mandaty" :key="mandat.Id" :Mandat="mandat"/>

    .parlament-detail-map

      h2.section-title Adresy poslance

      .mapbox()

          <l-map ref="mapbox" :options="{scrollWheelZoom: false}" :zoom=13 :center="[55.9464418,8.1277591]">
            l-tile-layer(
              id='',
              accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
              attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
              url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
            )
            <v-marker-cluster ref="clusterRef" :options="{showCoverageOnHover: true, zoomToBoundsOnClick: true}">
              <l-marker v-for="(item, index) in geojson" :key="index" :lat-lng="item.LatLng">
                <l-popup>
                  .is-map-card.person-social-network-item.person-social-network-item-poslanec

                    .content-container

                      .header
                        .category {{item.DruhNazev}}


                      .content
                        // show only if the addresses are not birth nor death
                        .desc(v-if="item.Druh != 5 && item.Druh != 1")
                          p {{item.Parlament}}
                          p {{item.DatumZacatkuZobrazene}} — {{item.DatumKonceZobrazene}}
                          p {{item.DruhTyp}}
                        .name {{item.Nazev}}

                </l-popup>
                <l-icon :icon-anchor="[0,0]" :icon-size="[35, 35]" class-name="map-address-icon">

                  div(v-if="item.Druh != 5 && item.Druh != 1")
                    span {{index}}


                  <MapaIkonaNarozeni v-if="item.Druh == 1" />
                  <MapaIkonaUmrti v-if="item.Druh == 5" />


                </l-icon>
              </l-marker>
            </v-marker-cluster>

          </l-map>

    .section-padding-h-margin-v.typography-has-no-h-padding


        <SocialniMapa :Poslanec="poslanec" :MaNadpis="true" :MaBilePozadi="true" />


    .parlament-detail-galerie-medii.section-padding.alt-bg-02(v-if="poslanec.Soubory.length > 0")

      h2.section-title Galerie médií

      GalerieMediiSeznam(:Soubory="poslanec.Soubory" :MaButtonMore="false" :MaFilter="false")



</template>

<style lang="sass">

.section-title

  @extend %typography-section-title

.person-social-network-item

  .header
    @extend %typography-body-text

  .content
    @extend %typography-alt-heading


.profese
  .profese-date-range
    font-size: 80%

.gallery-widget-container
  +from($widescreen)
    padding-right: $margin-until-desktop


.gallery-widget

  background: #eee
  border-radius: 100%
  overflow: hidden;

  height: 0 // to get aspect ration 1:1
  padding-top: 100% // to get aspect ration 1:1



.metadata-section
  margin-bottom: $margin-until-desktop

  .metadata-content-multiple

    .item
      margin-bottom: .5em
      font-size: 80%

  .metadata-section-title
    margin-bottom: 1em

  &.metadata-section-education



.main-title-container
  margin: 0 auto
  width: 75%
  text-align: center


  .button-show-full-name
    font-size: 12px

</style>

<script>

  const CasovaOsa = () => import('~/components/CasovaOsa.vue');

  const MandatRadek = () => import('~/components/MandatRadek.vue');

  const SocialniMapa = () => import('~/components/SocialniMapa.vue');

  const GalerieMediiSeznam = () => import('~/components/GalerieMediiSeznam.vue');


  import MapaIkonaNarozeni from "~/assets/images/mapa-icon-birth.svg?inline";
  import MapaIkonaUmrti from "~/assets/images/mapa-icon-death.svg?inline";
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

  // import PoslanciData from '~/data/osoby.json';


  export default {

      components: { CasovaOsa, MandatRadek, SocialniMapa, GalerieMediiSeznam, MapaIkonaNarozeni,  MapaIkonaUmrti, ParlamentNahledObecnyImage },

      async asyncData({params, error, payload, store, $axios}) {

        if (payload) {
          return {
            poslanec: payload
          }
        } else {

          //:TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items

          // if (!$config.useFileCachedAPI) {

            await store.dispatch("getPoslanecDetail", {poslanecId: params.id});

            return {
              poslanec: store.state.poslanec
            }

          // } else {

          //   return {
          //     poslanec: PoslanciData.filter(item => item.Id == params.id)
          //   }

          // }


        }

      },

      data() {
        return {
          showFullNameWithTitles: false,
        }
      },

      methods: {

        toggleFullNameWithTitles(e) {

          e.preventDefault();
          this.showFullNameWithTitles = !this.showFullNameWithTitles;


        },

      },

      mounted() {


        this.$nextTick(() => {

          this.$refs.mapbox.mapObject.fitBounds(this.geojsonBoundsOnly);
        });


      },

      computed: {

        mandatyChronologicky() {



        },

        profileImage() {

          // const hasProfileImage = this.poslanec.Soubory.length && this.poslanec.Soubory.length > 0;

          // if (hasProfileImage) {
          //   return hasProfileImage[0].URLNahled;
          // } else {
          //   return false;
          // }

          return ``;

        },


        geojsonBoundsOnly() {

          return this.poslanec.AdresyProMapu.map((adresa) => {

            return [adresa.GeoX, adresa.GeoY];


          });

        },



        geojson() {

          return this.poslanec.AdresyProMapu.map((adresa) => {

            return {

              LatLng: [adresa.GeoX, adresa.GeoY],
              Nazev: adresa.Nazev,
              DruhTyp: adresa.DruhTyp,
              Druh: adresa.Druh,
              Parlament: adresa.Parlament,
              DatumZacatkuZobrazene: adresa.DatumZacatkuZobrazene,
              DatumKonceZobrazene: adresa.DatumKonceZobrazene,
              DruhNazev: adresa.DruhNazev,

              PopupHTML: ``,

            }

          });

        },

        tituly() {

          return this.poslanec.Tituly.join(" ") ?? false;

        },

        pocetMandatu() {

          if (this.poslanec.Mandaty) {
            return this.poslanec.Mandaty.length;
          } else {
            return this.$t('error.notDefined');
          }
        },

        profese() {

          if (this.poslanec.Mandaty) {

            const profeseArray = this.poslanec.Mandaty
            .filter((mandat) => {
              return mandat.Profese !== null
            }).map((mandat) => {

              return {
                profese: mandat.Profese,
                datumZacatku: mandat.DatumZacatkuZobrazene,
                datumKonce: mandat.DatumKonceZobrazene,
                mandatId: mandat.Id
              };

            });


            return profeseArray;

          } else {
            return false;
          }

        },

        nabozenstviNarozeni() {

          const nabozenstviNarozeni = this.poslanec?.NabozenstviNarozeni;

          if (nabozenstviNarozeni === null) {
            return this.$t('error.notDefined'); // :TODO: It would be better to get the string via config, not hard-coded into the code here
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
              // const country = countryParts[countryParts.length-1];

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
          const addressObject = this.poslanec.Adresy.filter(adresa => adresa.Druh === 5)[0] ?? false;
          if (addressObject) {

            const parts = addressObject.Nazev.split('|');
            const city = parts[0];
            const countryParts = parts[1].split(',');
            // const country = countryParts[countryParts.length-1];

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
