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
            .chart-text Vysokoškoláků

        .chart-row

          .chart-widget.text-right.chart-pie
            .chart-graphics.text-data
              .text-data-main {{ parseInt(statistiky.PocetMazaku / (statistiky.CelkovyPocetPoslancu / 100))  }}<small class="text-data-sub">%</small>
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
      TabNavigace(:Nastaveni="tabNavigaceNastaveni" Typ="parlament-detail-navigace")


    .parlament-detail-map

      h2.section-title Místo narození poslanců

      .mapbox()

          <l-map ref="mapbox" :options="{scrollWheelZoom: false}" :zoom=13 :center="[55.9464418,8.1277591]">
            l-tile-layer(
              id='',
              accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
              attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
              url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
            )
            <v-marker-cluster ref="clusterRef" :options="{showCoverageOnHover: false, zoomToBoundsOnClick: true, removeOutsideVisibleBounds: true}">
              l-marker(v-for="(item, index) in geojson" :key="index" :lat-lng="item.LatLng")
                <l-icon :icon-anchor="[0,0]" :icon-size="[40, 40]" class-name="map-person-thumb-head-icon">
                  <NuxtLink :to="`/poslanec/${item.Id}/`">
                    <div class="is-hidden headline">test content</div>
                    span(v-if="item.Soubory.length > 0")
                      img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
                  </NuxtLink>
                </l-icon>
            </v-marker-cluster>

          </l-map>


    .parlament-detail-about.section-padding-h-margin-v

      h2.section-title  O sněmovně

      .typography-text-block.columns.is-multiline

        .text-block-image.next-to-text.column.is-full.is-full-tablet.is-half-desktop
          img(v-if="snemovniObdobi.UvodniFotografie" :src="snemovniObdobi.UvodniFotografie" :alt="snemovniObdobi.Nazev")
        .typography-body-text.text-block-text.real-content-text.column.is-full.is-full-tablet.is-half-desktop(v-html="snemovniObdobi.Popis")


    .parlament-detail-events.section-padding-h-margin-v

      h2.section-title Důležité události

      CasovaOsa(:Data="snemovniObdobi.CasovaOsa" v-if="snemovniObdobi.CasovaOsa")


    .parlament-detail-poslanci.section-padding-h-margin-v

      h2.section-title Poslanci

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

      h2.section-title Galerie médií

      GalerieMediiSeznam(:Soubory="snemovniObdobi.Galerie" :MaButtonMore="false" :MaFilter="false")

    .parlament-detail-metadata-table.section-padding-h-margin-v

      h2.section-title Kompletní informace o sněmovně

      p :TODO: DOPLNIT



    .parlament-detail-navigation
      .parlament-detail-navigation-title {{$t('showDataForWhen')}}

      .button-toggler-component.normal
        .button-toggle(title="Začátek sněmovního období" :class="{active: buttonToggleTypeActive === 'start'}" @click="toggleDate('start', $event)") {{snemovniObdobi.DatumZacatkuZobrazene}}
        .button-toggle(title="Konec sněmovního období" :class="{active: buttonToggleTypeActive === 'end'}" @click="toggleDate('end', $event)") {{snemovniObdobi.DatumKonceZobrazene}}




</template>

<style lang="sass">

.section-title

  @extend %typography-section-title


.button-toggler-component
  display: flex
  justify-content: space-between
  overflow: hidden

  @extend %typography-alt-heading

  &.normal
    background-color: #fff
    border: 1px solid #000
    border-radius: 10px

  .button-toggle
    display: flex
    align-items: center
    justify-content: center
    height: 35px
    flex: 1
    cursor: pointer

    &.active
      background-color: #000
      color: #fff

.parlament-detail-navigation
  @extend %typography-alt-heading

  position: fixed
  bottom: $margin-until-desktop
  left: $margin-until-desktop
  width: 300px

  .parlament-detail-navigation-title
    margin-bottom: 15px










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
    @extend %typography-filter-heading

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
        @extend %typography-grafy-data-text

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

      async asyncData ({store, params}) {

        await store.dispatch("getSnemovniObdobiDetail", {
          snemovniObdobiId: params.id
        });

      },

      data() {
        return {
          buttonToggleTypeActive: 'start',
          ukazatDataProKonecneObdobi: false,
          mapboxAccessToken: '',
          zoom: 8,
          center: [47.313220, -1.319482]
        }
      },

      methods: {

        toggleDate(type, event) {

          if (type === 'start') {
            this.ukazatDataProKonecneObdobi = false;
            this.buttonToggleTypeActive = 'start';
          }

          if (type === 'end') {
            this.ukazatDataProKonecneObdobi = true;
            this.buttonToggleTypeActive = 'end';
          }

        },

      },

      mounted() {


        this.snemovniObdobi.Poslanci.map(poslanec => console.info(poslanec.Soubory));

        // will center the map based on the position of all the markers on the map
        this.$refs.mapbox.mapObject.fitBounds(this.mapBoundsOnly);

        // const schemaCircles = this.$el.querySelectorAll('.component-snemovna-schema svg circle');

        // schemaCircles.forEach((el, index) => {

        //   if (index <= 40) {
        //     el.style.fill = "#C0E4F1"
        //   }

        //   if (index > 40 && index <= 80) {
        //     el.style.fill = "#ACD0C0"
        //   }

        //   if (index > 80 && index <= 180) {
        //     el.style.fill = "#DDC3B6"
        //   }

        //   if (index > 180 && index <= schemaCircles.length+1) {
        //     el.style.fill = "#E8D7AD"
        //   }

        //   el.addEventListener('mouseenter', (e) => {
        //     e.target.classList.add('active');
        //   });

        //   el.addEventListener('mouseleave', (e) => {
        //     e.target.classList.remove('active');
        //   });

        //   el.addEventListener('click', (e) => {

        //   });

        // });

      },

      computed: {

        poslanci() {

          let poslanci =  this.snemovniObdobi.Poslanci;

          // poslanci = [...poslanci];

          // poslanci = poslanci.map((item) => {

          //   if (item.DatumNarozeni !== null) {
          //     item.VekBehemSnemovny = new Date(this.snemovniObdobiDatum.toString()) - new Date(item.DatumNarozeni.toString());
          //     item.VekBehemSnemovny = Math.floor({...item}.VekBehemSnemovny / (1000 * 60 * 60 * 24 * 365))
          //   }

          //   return item;
          // });

          return poslanci;

        },

        snemovniObdobiDatum() {

          return (this.ukazatDataProKonecneObdobi) ? this.snemovniObdobi.DatumKonce : this.snemovniObdobi.DatumZacatku;

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
          .sort((a,b) => a.toString().localeCompare(b))
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

          // push Neuvedeno to the end of the array
          /* :TODO: */


          // add default value
          nabozenske_vyznani = [
            {id: 'vse-nabozenske-vyznani', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...nabozenske_vyznani
          ];

          narodnosti = [...new Set(narodnosti)]
          .sort((a,b) => a.toString().localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'narodnost-neuvedeno' : item;

            return {
                    id: itemId,
                    text: item,
                    selected: false,
                    validate: (property) => {

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


          // push Neuvedeno to the end of the array
          /* :TODO: */


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

          const snemovniObdobiNazevEdited = this.snemovniObdobi.Nazev.trim();


          return {

            parlamentni_telesa: {
              id: 1,
              title: 'Parlamentní tělesa',
              type: 'checkbox',
              multiple: true,
              order: 'block',
              property: 'Mandaty',
              values: [
                {id: snemovniObdobiNazevEdited, text: snemovniObdobiNazevEdited, default: true, reset: false, selected: true, disabled: true, validate: (property) => property.filter(item => item.Parlament === snemovniObdobiNazevEdited).length > 0 },
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
            vek: {
              id: 5,
              title: 'Věk (testuji, neni v dobe snemovniho obdobi)',
              type: 'radio',
              multiple: false,
              reset: true,
              order: 'block',
              property: 'Vek',
              values: [
                {id: 'vse-vek', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'vek-30', text: '30+', default: false, selected: false, validate: (property) => property >= 30 },
                {id: 'vek-40', text: '40+', default: false, selected: false, validate: (property) => property >= 40 },
                {id: 'vek-50', text: '50+', default: false, selected: false, validate: (property) => property >= 50 },
                {id: 'vek-60', text: '60+', default: false, selected: false, validate: (property) => property >= 60 },
                {id: 'vek-70', text: '70+', default: false, selected: false, validate: (property) => property >= 70 },
                {id: 'vek-75', text: '75+', default: false, selected: false, validate: (property) => property >= 75 },
                {id: 'vek-80', text: '80+', default: false, selected: false, validate: (property) => property >= 80 },
              ]
            },
            mandaty: {
              id: 5,
              title: 'Mandáty',
              type: 'radio',
              multiple: false,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              values: [
                {id: 'vse-mandaty', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'ma-jeden-mandat', text: 'Má aspoň 1 mandát', default: false, selected: false, validate: (property) => property.length > 0 },
                {id: 'ma-pet-mandat', text: 'Má aspoň 5 mandátů', default: false, selected: false, validate: (property) => property.length > 4 },
                {id: 'ma-deset-mandat', text: 'Má aspoň 10 mandátů', default: false, selected: false, validate: (property) => property.length > 9 },
                {id: 'ma-dvanactplus-mandat', text: 'Má 12+ mandátů', default: false, selected: false, validate: (property) => property.length > 11 },
              ]
            },
            dalsi: {
              id: 6,
              title: 'Další vlastnosti',
              type: 'checkbox',
              multiple: true,
              reset: true,
              property: ['OsobniVztahyPrimarni', 'Soubory'],
              order: 'block',
              values: [
                {id: 'vse-dalsi', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'ma-fotku', text: 'Má fotku', default: false, selected: false, property: 'Soubory', validate: (property) => property.length },
                {id: 'ma-galerii', text: 'Má galerii', default: false, selected: false, property: 'Soubory', validate: (property) => property.length > 1 },
                {id: 'ma-sociálni-vazby', text: 'Má sociální vazby', property: 'OsobniVztahyPrimarni', default: false, selected: false, validate: (property) => property.length > 0 },
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

          let whichPoslanci = (this.$store.state.poslanci_filtrovani.length) ?  this.$store.state.poslanci_filtrovani : this.snemovniObdobi.Poslanci;

          return whichPoslanci
          .filter(poslanec => (poslanec.Adresy && poslanec.Adresy.length > 0))
          .map((poslanec) => {

            return {

              Id: poslanec.Id,
              LatLng: [poslanec.Adresy[0].GeoX, poslanec.Adresy[0].GeoY],
              Nazev: poslanec.Adresy[0].Nazev,
              Druh: poslanec.Adresy[0].Druh,
              CeleJmenoReadable: poslanec.Jmeno + ' ' + poslanec.Prijmeni,
              Soubory: poslanec.Soubory || null,
              PopupHTML: `${poslanec.Jmeno} ${poslanec.Prijmeni}`,

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
            polozky: {
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
                title: 'národnosti',
                data: this.statistiky.Narodnosti,
              },
              vybory: {
                id: 'vybory',
                title: 'výbory',
                data: this.statistiky.Vybory,
              }
            },

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
