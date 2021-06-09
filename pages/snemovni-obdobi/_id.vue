<template lang="pug">

  .parlament-detail.section

    .parlament-detail-header

      .parlament-detail-header-stats.stats-left

        .chart-row


          .chart-widget.text-right.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.ProcentoMuzu}}<small class="text-data-sub">%</small>
              .text-data-sub mužů
            .chart-text Poměr pohlaví poslanců

        .chart-row

          .chart-widget.text-right.chart-pie
            //.chart-graphics.pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.ProcentoVysokoskolaku}}<small class="text-data-sub">%</small>
              .text-data-sub
            .chart-text vysokoškoláků

        .chart-row

          .chart-widget.text-right.chart-pie
            .chart-graphics.text-data
              .text-data-main {{ parseInt(statistiky.PocetMazaku / (snemovniObdobi.PocetPoslancu / 100))  }}<small class="text-data-sub">%</small>
              .text-data-sub
            .chart-text Znovuzvolených

      .component-snemovna-schema
        <ParlamentNahledObecnyImage />

      .parlament-detail-header-stats.stats-right

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.PrumernyVekPoslancu}}
              .text-data-sub let
            .chart-text Průměrný věk

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.NejnizsiVekPoslance}}
              .text-data-sub let
            .chart-text Nejnižší věk

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.NejvyssiVekPoslance}}
              .text-data-sub let
            .chart-text Nejvyšší věk

    .parlament-detail-title
      h1.typography-main-title.typography-has-no-margin-top.typography-has-no-margin-bottom {{snemovniObdobi.Nazev}} <br> ({{snemovniObdobi.DatumZacatkuZobrazene}} — {{snemovniObdobi.DatumKonceZobrazene}} )
      .counter-poslanci celkem {{snemovniObdobi.PocetPoslancu}} poslanců


    .parlament-meta-tab-navigation
      TabNavigace(:nastaveni="tabNavigaceNastaveni" typ="parlament-detail-navigace")


    .parlament-detail-map

      h2.typography-section-title Poslanci na mapě

      .mapbox()
        <client-only>
          <l-map ref="mapbox" :options="{scrollWheelZoom: false}" :zoom=13 :center="[55.9464418,8.1277591]">
            l-tile-layer(
              id='',
              accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
              attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
              url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
            )
            <v-marker-cluster ref="clusterRef" :options="{showCoverageOnHover: false, zoomToBoundsOnClick: true}">
              <l-marker v-for="(item, index) in geojson" :key="index" :lat-lng="item.LatLng">
                <l-popup :content="item.PopupHTML"></l-popup>
                <l-icon :icon-anchor="[0,0]" :icon-size="[56, 56]" class-name="map-person-thumb-head-icon">
                  <div class="is-hidden headline">test content</div>
                  span(v-if="item.Soubory.length > 0")
                    img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
                </l-icon>
              </l-marker>
            </v-marker-cluster>

          </l-map>
        </client-only>

    .parlament-detail-about.section-padding-h-margin-v

      h2.typography-section-title  O sněmovně

      .typography-text-block.columns.is-multiline

        .text-block-image.next-to-text.column.is-full.is-full-tablet.is-half-desktop
          img(v-if="snemovniObdobi.UvodniFotografie" :src="snemovniObdobi.UvodniFotografie" :alt="snemovniObdobi.Nazev")
        .text-block-text.real-content-text.column.is-full.is-full-tablet.is-half-desktop(v-html="snemovniObdobi.Popis")


    .parlament-detail-events.section-padding-h-margin-v

      h2.typography-section-title Důležité události

      CasovaOsa(:Data="snemovniObdobi.CasovaOsa" v-if="snemovniObdobi.CasovaOsa")


    .parlament-detail-poslanci.section-padding-h-margin-v

      h2.typography-section-title Poslanci

      PoslanciSeznam(
        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
        :KesovatPoslanceInterne="true"
        :MaPaginaci="false"
        :MaFiltr="true"
        :MaStatistiky="false"
        :MaButtonMore="false"
        :ButtonMoreLink="false"
      )


    .parlament-detail-galerie-medii.section-padding-h-margin-v

      h2.typography-section-title Galerie médií

      GalerieMediiSeznam(:Soubory="snemovniObdobi.Galerie" :MaButtonMore="false" :MaFilter="false")

    .parlament-detail-metadata-table.section-padding-h-margin-v

      h2.typography-section-title Kompletní informace o sněmovně

      p fadfsd




</template>

<style lang="sass">
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"

.mapbox

    position: relative
    z-index: 0

    +from($widescreen)
     height: calc(100vh - 80px)

.map-person-thumb-head-icon
  width: 56px
  height: 56px
  background: gray
  border-radius: 100%
  overflow: hidden

  .map-person-thumb-head-icon-image
    width: 100%
    height: 100%
    position: absolute
    object-fit: cover

.parlament-detail-map

  .typography-section-title
    position: relative
    z-index: 2
    margin-bottom: -140px

.parlament-meta-tab-navigation
  margin: $margin-until-desktop / 2 0

  +until($desktop)

  +from($desktop)
    margin: $margin-until-desktop * 2 0

  +from($tablet)

  +from($desktop)

  +from($fullhd)



.component-snemovna-schema
  svg
    width: 886px
    height: 450px

.parlament-detail-title

  text-align: center

  .typography-main-title
    line-height: 1

  .counter-poslanci
    margin-top: 10px


.parlament-detail-header

  padding: $margin-until-desktop
  display: flex
  justify-content: space-between

  .parlament-detail-header-stats

    display: flex
    flex-direction: column
    width: 360px

    &.stats-left
      align-items: flex-start

.chart-row
  margin-bottom: 40px

.chart-widget
  display: flex
  align-items: center
  justify-content: center

  .chart-text
    @extend .typography-filter-heading

  &.text-left
    flex-direction: row-reverse

    .chart-text
      margin-right: 20px
      text-align: right

  &.text-right

    .chart-text
      margin-left: 20px

  .chart-graphics

    &.text-data

      width: 126px
      height: 126px
      background-color: #EDECE7
      display: inline-block
      border-radius: 100%
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      .text-data-main
        @extend .typography-grafy-data-text

      .text-data-sub
        margin-top: 3px

    &.pie
      width: 126px
      height: 126px
      background-color: #EDECE7
      display: inline-block
      border-radius: 100%
</style>

<script>
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

 //import DoughnutChart from '~/components/DoughnutChart';

  const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  export default {

      components: { ParlamentNahledObecnyImage },

      async fetch ({store, params}) {

        await store.dispatch("getSnemovniObdobiDetail", {
          snemovniObdobiId: params.id
        });

      },

      data() {
        return {
          ukazatDataProKonecneObdobi: false,
          mapboxAccessToken: '',
          zoom: 8,
          center: [47.313220, -1.319482]
        }
      },

      mounted() {

        this.$nextTick(() => {

          // will center the map based on the position of all the markers on the map
          this.$refs.mapbox.mapObject.fitBounds(this.mapBoundsOnly);

        });

        const schemaCircles = this.$el.querySelectorAll('.component-snemovna-schema svg circle');

        schemaCircles.forEach((el, index) => {

          if (index <= 40) {
            el.style.fill = "#C0E4F1"
          }

          if (index > 40 && index <= 80) {
            el.style.fill = "#ACD0C0"
          }

          if (index > 80 && index <= 180) {
            el.style.fill = "#DDC3B6"
          }

          if (index > 180 && index <= schemaCircles.length+1) {
            el.style.fill = "#E8D7AD"
          }

          el.addEventListener('mouseenter', (e) => {
            e.target.classList.add('active');
          });

          el.addEventListener('mouseleave', (e) => {
            e.target.classList.remove('active');
          });

          el.addEventListener('click', (e) => {

          });

        });

      },

      computed: {

        poslanci() {

          let poslanci =  (!this.$store.state.poslanci_filtrovani.length) ?  this.snemovniObdobi.Poslanci : this.$store.state.poslanci_filtrovani;

          //poslanci.filter(item => item.Mandaty.length);

          // make zakladni razeni sort filter
          poslanci = [...poslanci].sort((a, b) => (a.Id > b.Id) ? 1 : -1);

          return poslanci;

        },

        nastaveniFiltrace() {

          // the values must fit the API points and data formats!


          let nabozenske_vyznani = [];
          let narodnosti = [];

          let vysoka_skola = [];
          let maji_vysokou_skolu = [];


          this.poslanci.forEach((item) => {

            const nabozenstvi_edited = (item.NabozenstviNarozeni === null) ? 'neuvedeno' : item.NabozenstviNarozeni;
            const narodnosti_edited = (!item.Narodnosti.length) ? ['neuvedeno'] : item.Narodnosti;


            nabozenske_vyznani.push(nabozenstvi_edited);
            narodnosti.push(...narodnosti_edited);
            maji_vysokou_skolu.push(item.UniverzitniVzdelani);

          });

          // make unique values
          nabozenske_vyznani = [...new Set(nabozenske_vyznani)]
          .sort((a,b) => a.localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'nabozenstvi-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                if (property === null) {

                  if (item === 'neuvedeno') {
                    return true;
                  }

                } else {
                  return property === item;
                }

              }
            };
          });

          // add default value
          nabozenske_vyznani = [
            {id: 'vse-nabozenske-vyznani', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...nabozenske_vyznani
          ];

          narodnosti = [...new Set(narodnosti)]
          .sort((a,b) => a.localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'narodnost-neuvedeno' : item;

            return {
                    id: itemId,
                    text: item,
                    selected: false,
                    validate: (property) => {

                      console.log("item", item);
                      console.log("property", property);

                      if (Array.isArray(property) && property.length === 0) {

                        if (item === 'neuvedeno') {
                          return true;
                        }

                      } else {
                        return property.includes(item);
                      }

                    }
                  };

          });

          // add default value
          narodnosti = [
            {id: 'vse-narodnosti', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...narodnosti
          ];

          maji_vysokou_skolu = [...new Set(maji_vysokou_skolu)].includes(true);

          vysoka_skola = [
            {id: 'vse-skola', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            {id: 'vysoka_skola', text: 'Pouze vysoká škola', validate:  (property) => property === true}
          ];

          if (!maji_vysokou_skolu) {
            vysoka_skola[1].disabled = true;
          }

          return {

            parlamentni_telesa: {
              id: 1,
              title: 'Parlamentní tělesa',
              type: 'checkbox',
              multiple: true,
              order: 'block',
              property: 'Mandaty',
              values: [
                {id: this.snemovniObdobi.Nazev, text: this.snemovniObdobi.Nazev, default: true, reset: false, selected: true, disabled: true, validate: (property) => property.Parlament === this.snemovniObdobi.Nazev},
              ]
            },
            pohlavi: {
              id: 2,
              title: 'Pohlaví',
              type: 'radio',
              order: 'inline',
              property: 'Pohlavi',
              values: [
                {id: 'vse-pohlavi', text: 'Vše', default: true, reset: false, selected: true, validate: (property) => property === 1 || property === 2},
                {id: '1', text: 'Muž', validate: (property) => property === 1},
                {id: '2', text: 'Žena', validate: (property) => property === 2},
              ]
            },
            vzdelani: {
              id: 3,
              title: 'Vzdělání',
              type: 'radio',
              order: 'inline',
              property: 'UniverzitniVzdelani',
              values: vysoka_skola,
            },
            nabozenske_vyznani: {
              id: 4,
              title: 'Náboženské vyznání',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'NabozenstviNarozeni',
              values: nabozenske_vyznani
            },
            narodnosti: {
              id: 5,
              title: 'Národnosti',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Narodnosti',
              values: narodnosti
            },
            dalsi: {
              id: 6,
              title: 'Další vlastnosti',
              type: 'checkbox',
              multiple: true,
              order: 'block',
              values: [
                {id: 'ma-fotku', text: 'Má fotku', default: false, selected: false, db_property: 'Soubory', validate: (property) => property.length },
                {id: 'ma-sociálni-vazby', text: 'Má sociální vazby', default: false, selected: false},
                {id: 'ma-galerii-medii', text: 'Má galerii médií', default: false, selected: false},
              ],
            }

          }

        },

        mapBoundsOnly() {

          const currentBounds = this.geojson.map(item => item.LatLng);

          return currentBounds;


        },

        geojson() {

          // get items for the map
          // we want to show on the map items "poslanci" reactively based on the fact if we have already filtered them via PoslanciSeznam component
          // in such case poslance are already filtered, we have them in the store in the variable "poslanci_filtrovani"
          // if we have not filtered "poslanci" yet, we get them from the snemovniObdobi.Poslanci item via this.poslanci computed property

          const whichPoslanci = this.poslanci;

          return whichPoslanci
          .filter(poslanec => (poslanec.Adresy && poslanec.Adresy.length > 0))
          .map((poslanec) => {

            return {

              LatLng: [poslanec.Adresy[0].GeoX, poslanec.Adresy[0].GeoY],
              Nazev: poslanec.Adresy[0].Nazev,
              Druh: poslanec.Adresy[0].Druh,
              CeleJmenoReadable: poslanec.Jmeno + ' ' + poslanec.Prijmeni,
              Soubory: poslanec.Soubory || null,
              PopupHTML: `<h1>${poslanec.Jmeno} ${poslanec.Prijmeni}</h1>`,

            }

          });

        },

        poslanciStatistiky() {

          return this.$store.state.poslanci_statistiky;
        },
        snemovniObdobi() {

          return this.$store.state.snemovni_obdobi_detail;
        },

        statistiky() {

          if (!this.ukazatDataProKonecneObdobi) {
            return this.$store.state.snemovni_obdobi_detail.SnemovniObdobiStatistikaZacatek;
          } else {
            return this.$store.state.snemovni_obdobi_detail.SnemovniObdobiStatistikaKonec;
          }

        },


        tabNavigaceNastaveni() {

          return {
            poslaneckeKluby: {
              id: 'poslanecke-kluby',
              title: 'poslanecké kluby',
              data: this.statistiky.PoslaneckeKluby,
              aktivni: true
            },
            volebniStrany: {
              id: 'volebni-strany',
              title: 'volební strany',
              data: this.statistiky.VolebniStrany,
            },
            kurie: {
              id: 'kurie',
              title: 'kurie',
              data: this.statistiky.Kurie,
            },
            narodnost: {
              id: 'narodnost',
              title: 'podle národnosti',
              data: this.statistiky.Narodnosti,
            }
          };

        },
      },

      head () {
        return {
          title: `${this.snemovniObdobi.Nazev} (${this.snemovniObdobi.DatumZacatkuZobrazene} — ${this.snemovniObdobi.DatumKonceZobrazene}) — ${this.$config.globalTitle}`,
          link: [{
            rel:'stylesheet',
            href:'//unpkg.com/leaflet/dist/leaflet.css'
          },
          {
            rel:'stylesheet',
            href:'//api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css'
          }],
          htmlAttrs: {
            class: 'alt-bg-02 subpage-parlament'
          }
        }
      }

  }
</script>
