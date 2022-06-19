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

      <client-only placeholder="Načítám...">
        .mapbox(ref="mapElement" data-component="mapbox")
      </client-only>

    .parlament-detail-about.section-padding-h-margin-v

      h2.section-title  O sněmovně

      .typography-text-block.columns.is-multiline

        .text-block-image.next-to-text.column.is-full.is-full-tablet.is-half-desktop
          img(v-if="snemovniObdobi.UvodniFotografie" :src="snemovniObdobi.UvodniFotografie" :alt="snemovniObdobi.Nazev")
        .typography-body-text.text-block-text.real-content-text.column.is-full.is-full-tablet.is-half-desktop(v-html="snemovniObdobi.Popis")


    .parlament-detail-events.section-padding-h-margin-v(v-if="snemovniObdobi.CasovaOsa")

      h2.section-title Důležité události

      CasovaOsa(:Data="snemovniObdobi.CasovaOsa")


    .parlament-detail-poslanci.section-padding-h-margin-v

      h2.section-title Poslanci

      PoslanciSeznam(
        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
        :MaPaginaci="false"
        :MaFiltr="true"
        :MaStatistiky="false"
        :MaButtonMore="false"
        :ButtonMoreLink="false"
      )


    .parlament-detail-galerie-medii.section-padding-h-margin-v(v-if="snemovniObdobi.Galerie")

      h2.section-title Galerie médií

      GalerieMediiSeznam(:Soubory="snemovniObdobi.Galerie" :MaButtonMore="false" :MaFilter="false")

    //- .parlament-detail-metadata-table.section-padding-h-margin-v

    //-   h2.section-title Kompletní informace o sněmovně

    //-   p :TODO: DOPLNIT



    .parlament-detail-navigation
      .parlament-detail-navigation-title {{$t('showDataForWhen')}}

      .button-toggler-component.normal
        .button-toggle(title="Začátek sněmovního období" :class="{active: buttonToggleTypeActive === 'start'}" @click="toggleDate('start', $event)") {{snemovniObdobi.DatumZacatkuZobrazene}}
        .button-toggle(title="Konec sněmovního období" :class="{active: buttonToggleTypeActive === 'end'}" @click="toggleDate('end', $event)") {{snemovniObdobi.DatumKonceZobrazene}}

</template>

<style lang="sass">

  @use "sass:math"


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
    margin: math.div($margin-until-desktop, 2) 0

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

  const PoslanciSeznam = () => import('~/components/PoslanciSeznam.vue');
  const CasovaOsa = () => import('~/components/CasovaOsa.vue');
  const GalerieMediiSeznam = () => import('~/components/GalerieMediiSeznam.vue');
  const TabNavigace = () => import('~/components/TabNavigace.vue');
  const MultiRangeSlider = () => import('~/components/MultiRangeSlider.vue');


  const SnemovniObdobiData = () => import('~/data/snemovni-obdobi.json').then(m => m.default || m);

  import IconPerson from "~/assets/images/icon-person.svg?inline";

  import MapaIkonaNarozeni from "~/assets/images/mapa-icon-birth.svg?inline";
  import MapaIkonaUmrti from "~/assets/images/mapa-icon-death.svg?inline";
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

  let leafletObj;
  let leafletObjMarkerCluster;

  if (process.client) {

    leafletObj = () => import("leaflet");
    leafletObjMarkerCluster = () => import("leaflet.markercluster");

  }

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

      components: { MultiRangeSlider, PoslanciSeznam, CasovaOsa, GalerieMediiSeznam, TabNavigace, IconPerson, ParlamentNahledObecnyImage },

      async asyncData({params, error, payload, store, $config}) {

        if (payload) {

          return {
            snemovniObdobi: payload
          }

        } else {


          await store.dispatch("getSnemovniObdobiDetail", {
            snemovniObdobiId: params.id
          });

          return {
            snemovniObdobi: store.state.snemovni_obdobi_detail
          }

        }

      },

      data() {
        return {
          buttonToggleTypeActive: 'start',
          ukazatDataProKonecneObdobi: false,
          mapInstance: null,
          mapSettings: {

            popup: {

              html: (item) => {

                let snemovniObdobiString = '';

                const imageContent = (item.ProfilovaFotka && item.ProfilovaFotka !== '') ? `
                  <img src="${item.ProfilovaFotka}" class="map-person-thumb-head-icon-image" />
                ` : `<div class="map-person-thumb-head-icon-image">

                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="98" viewBox="0 0 90 98">
                      <g id="user-filled-person-shape-svgrepo" transform="translate(-3.577)">
                        <g id="Group_1365" data-name="Group 1365" transform="translate(3.578)">
                          <path id="Path_409" data-name="Path 409" d="M47.893,47.221c11.768,0,21.341-10.592,21.341-23.611S59.66,0,47.893,0,26.55,10.592,26.55,23.61,36.125,47.221,47.893,47.221Z" transform="translate(-2.965)"/>
                          <path id="Path_410" data-name="Path 410" d="M73.431,44.123a3.059,3.059,0,0,0-3.236,1.355A26.435,26.435,0,0,1,48.577,58.2,26.432,26.432,0,0,1,26.961,45.478a3.059,3.059,0,0,0-3.244-1.354C6.914,47.777,2.485,72.8,3.792,93.115a3.024,3.024,0,0,0,3.035,2.811h83.5a3.024,3.024,0,0,0,3.034-2.811C94.673,72.775,90.241,47.74,73.431,44.123Z" transform="translate(-3.578 2.074)"/>
                        </g>
                      </g>
                    </svg>



                </div>`;

                return `


                    <a class="is-map-card person-poslanec-card" href="/poslanec/${item.Id}/">

                      <div class="content-container">

                        <div class="header">
                          <div class="full-name">${item.Jmeno} ${item.Prijmeni}</div>
                        </div>

                        <div class="content">
                          <div class="desc">
                            <p>Narození: ${item.DatumNarozeniZobrazene} — Úmrtí: ${item.DatumUmrtiZobrazene}</p>

                            <div class="map-card__content__address">${item.Nazev}</div>
                            <div class="map-card__content__address__meta">GPS lokace: ${item.GeoX} ${item.GeoY}</div>
                            <div class="map-card__footer">Zobrazit detail poslance →</div>
                          </div>



                        </div>


                      </div>

                      <div class="image-container">${imageContent}</div>

                    </a>


                `;


              }
            },
            addresses: {
              cluster: {
                className: 'map__marker map__marker--cluster',
                iconSize: 30,
              },
              iconLargePerson: {
                className: 'map__marker map__marker--address',
                iconSize: 50,
                popupAnchor: [-200, 95],
                tooltip: {
                  direction: 'bottom',
                  offset: { x: 0, y: 20 },
                },
                html: (item, index) => {

                  const start = `<div class="map__marker__container map-address-icon map-person-thumb-head-icon">`;
                  const end = `</div>`;

                  let content = '';

                  if (item.ProfilovaFotka) {


                    content = `<img class="map-person-thumb-head-icon-image" src="${item.ProfilovaFotka}" alt="Fotografie osoby ${item.Jmeno} ${item.Prijmeni}">`;


                  } else {
                    content = `

                      <svg xmlns="http://www.w3.org/2000/svg" width="88.772" height="95.926" viewBox="0 0 88.772 95.926">
                        <g id="user-filled-person-shape-svgrepo" transform="translate(-3.577)">
                          <g id="Group_1365" data-name="Group 1365">
                            <path id="Path_409" data-name="Path 409" d="M47.893,47.221c11.768,0,21.341-10.592,21.341-23.611S59.66,0,47.893,0,26.55,10.592,26.55,23.61,36.125,47.221,47.893,47.221Z"/>
                            <path id="Path_410" data-name="Path 410" d="M72.477,44.123a3,3,0,0,0-3.192,1.355A26.016,26.016,0,0,1,47.962,58.2a26.013,26.013,0,0,1-21.32-12.722,3,3,0,0,0-3.2-1.354C6.868,47.777,2.5,72.8,3.789,93.115a3,3,0,0,0,2.994,2.811h82.36a3,3,0,0,0,2.993-2.811C93.429,72.775,89.057,47.74,72.477,44.123Z"/>
                          </g>
                        </g>
                      </svg>

                    `;
                  }

                  return `${start} ${content} ${end}`;


                }
              },
              zIndex: 9,
            },
          },
          mapMarkers: [],
          mapBoundingBox: [],
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

        // load map
        this.$nextTick(() => {

          setTimeout(async() => {


            const $mapElement = this.$refs.mapElement;


            const {Map, map, Marker, Browser, tileLayer, DomEvent, divIcon, latLng, latLngBounds, Polyline, popup} = await leafletObj();

            const { MarkerClusterGroup, MarkerCluster } = await leafletObjMarkerCluster();

            const mapOptions = {
              dragging: true, // !Browser.mobile
              scrollWheelZoom: false,
              tap: false,
              zoomSnap: .5,
              zoom: 8,
              center: [47.313220, -1.319482]
              // minZoom: 12,
              // maxZoom: 18,
            };

            this.mapInstance = map($mapElement, mapOptions);

            tileLayer(`https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=${this.$config.map.accessToken}`, {
              id: 'mapbox.light',
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            }).addTo(this.mapInstance);


            this.mapInstance.createPane('addresses');


            // // init clusters for places
            // https://github.com/Leaflet/Leaflet.markercluster
            const mapMarkersClusterAddresses = new MarkerClusterGroup({
              // clusterPane: 'addresses-clusters',
              maxClusterRadius: 25,
              showCoverageOnHover: false,
              removeOutsideVisibleBounds: true,
              chunkedLoading: true

            })
            .on('clusterclick', (event) => {
              DomEvent.stopPropagation(event);
              // this.resetAll();
            });

            [...this.geojson].forEach((item, index) => {

              const icon = new divIcon({
                ...this.mapSettings.addresses.iconLargePerson,
                className: `${this.mapSettings.addresses.iconLargePerson.className}`,
                html: this.mapSettings.addresses.iconLargePerson.html(item, index),
              });

              const marker = new Marker([item.GeoX, item.GeoY], {
                // pane: 'addresses',
                bubblingMouseEvents: false,
                riseOnHover: true,
                icon,
                zIndexOffset: 2,
              });

              marker.on('click', (event) => {

                // in dev tools in chrome, you can get error on click, but it's a Chrome bug
                // viz https://stackoverflow.com/a/50857216/12058461

                // DomEvent.stopPropagation(event);

                // console.log("click on marker", item);

              });


              marker.bindPopup(this.mapSettings.popup.html(item));


              this.mapMarkers[index] = marker;

              this.mapBoundingBox = [...this.mapBoundingBox, [item.GeoX, item.GeoY]];

              //marker.addTo(this.mapInstance);

              mapMarkersClusterAddresses.addLayer(marker);


            });


            this.mapInstance.addLayer(mapMarkersClusterAddresses);



            const fitBoundsOptionsDefault = {
              animate: false,
              paddingTopLeft: [80, 60],
              paddingBottomRight: [60, 60]
            };

            const realFitBoundsOptions = Object.assign({}, fitBoundsOptionsDefault);


            if (this.mapBoundingBox.length > 1) {

              // if we have more than one address, make bounds and find automatically center, given the bounds with fitBounds()

              this.mapInstance.fitBounds(this.mapBoundingBox, realFitBoundsOptions);


            } else {

              // if we have just one marker / address, make the center of the map based on this marker's coordinates

              this.mapInstance.setView(this.mapBoundingBox[0], this.defaultZoom);

            }

          }, 100);


        });

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

          let sectionId = 0;


          let nabozenske_vyznani = [];
          let narodnosti = [];

          let vysoka_skola = [];
          let maji_vysokou_skolu = [];

          let volebni_strany = [];
          let kurie = [];
          let vybory = [];
          let kluby = [];

          [...this.poslanci].forEach((item) => {


            if (item.Nabozenstvi.length === 0) {

              nabozenske_vyznani.push('neuvedeno');

            } else {

              [...item.Nabozenstvi].forEach((nabozenstviItemObj) => {
                nabozenske_vyznani.push(nabozenstviItemObj.Nazev);
              });

            }

            const narodnosti_edited = (!item.Narodnosti.length) ? ['neuvedeno'] : item.Narodnosti;


            narodnosti.push(...narodnosti_edited);
            maji_vysokou_skolu.push(item.UniverzitniVzdelani);


            // volebni strany
            volebni_strany = [
            ...volebni_strany,
            ...item.Mandaty
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
              .map(mandat => (mandat.VolebniStrana && mandat.VolebniStrana !== '') ? mandat.VolebniStrana : 'neuvedeno')
            ];

            // kurie
            kurie = [
            ...kurie,
            ...item.Mandaty
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
              .map(mandat => (mandat.Kurie && mandat.Kurie !== '') ? mandat.Kurie : 'neuvedeno')
            ];

            // vybory
            vybory = [
            ...vybory,
            ...item.Mandaty
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
              .map(mandat => (mandat.Vybory && mandat.Vybory.length > 0) ? mandat.Vybory.map(vybor => vybor.Nazev) : ['neuvedeno'])
              .reduce((prev, current) => {return [...prev, ...current]}, [])
              .filter(item => item !== null)
            ];

            // kluby
            kluby = [
            ...kluby,
            ...item.Mandaty
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
              .map(mandat => (mandat.Kluby && mandat.Kluby.length > 0) ? mandat.Kluby : ['neuvedeno'])
              .reduce((prev, current) => {return [...prev, ...current]}, [])
              .filter(item => item !== null)
            ];


          });


          // make unique values
          volebni_strany = [...new Set(volebni_strany)]
          .sort((a,b) => a.toString().localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'volebni-strana-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                const volebniStrany = [...property]
                .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
                .map(mandat => (mandat.VolebniStrana && mandat.VolebniStrana !== '') ? mandat.VolebniStrana : 'neuvedeno');

                return volebniStrany.includes(item);

              }
            };
          });

          // add default value
          volebni_strany = [
            {id: 'vse-volebni-strany', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...volebni_strany
          ];


          // make unique values
          kurie = [...new Set(kurie)]
          .sort((a,b) => a.toString().localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'kurie-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                const kurieItems = [...property]
                .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
                .map(mandat => (mandat.Kurie && mandat.Kurie !== '') ? mandat.Kurie : 'neuvedeno')
                .reduce((prev, current) => {return [...prev, ...current]}, []);

                return kurieItems.includes(item);

              }
            };
          });

          // add default value
          kurie = [
            {id: 'vse-kurie', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...kurie
          ];


          // make unique values
          vybory = [...new Set(vybory)]
          .sort((a,b) => a.toString().localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'vybor-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                const vyboryItems = [...property]
                .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
                .map(mandat => (mandat.Vybory && mandat.Vybory.length > 0) ? mandat.Vybory.map(vybor => vybor.Nazev) : ['neuvedeno'])
                .reduce((prev, current) => {return [...prev, ...current]}, [])
                .filter(item => item !== null)

                return vyboryItems.includes(item);

              }
            };
          });

          // add default value
          vybory = [
            {id: 'vse-vybory', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...vybory
          ];

          // make unique values
          kluby = [...new Set(kluby)]
          .sort((a,b) => a.toString().localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'kluby-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                const klubyItems = [...property]
                .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
                .map(mandat => (mandat.Kluby && mandat.Kluby.length > 0) ? mandat.Kluby : ['neuvedeno'])
                .reduce((prev, current) => {return [...prev, ...current]}, [])
                .filter(item => item !== null)

                return klubyItems.includes(item);

              }
            };
          });

          // add default value
          kluby = [
            {id: 'vse-kluby', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...kluby
          ];

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

                if (property.length === 0 && item === 'neuvedeno') {

                  return true;


                } else {
                  return property.map(nabozenstviItem => nabozenstviItem.Nazev).includes(item);
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


          const poslaneckySlibMapped = [
            {id: 0, text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            {id: true, text: 'Ano', validate: (property) => property === true},
            {id: false, text: 'Ne', validate: (property) => property === false},
          ];


          return {
            PoslaneckySlib: {
              id: sectionId++,
              title: 'Poslanecky Slib',
              type: 'radio',
              order: 'inline',
              property: 'PoslaneckySlib',
              info: "Nějaké informace k vysvětlení",
              hasCounter: false,
              hasSpecialFilter: true,
              snemovniObdobiId: this.snemovniObdobi.Id,
              values: poslaneckySlibMapped,
            },
            parlamentni_telesa: {
              id: sectionId++,
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
              id: sectionId++,
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
            MandatyKluby: {
              id: sectionId++,
              title: 'Poslanecké kluby',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              info: "Nějaké informace k vysvětlení",
              hasCounter: true,
              values: kluby
            },
            MandatyVolebniStrana: {
              id: sectionId++,
              title: 'Volební strany',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              info: "Nějaké informace k vysvětlení",
              hasCounter: true,
              values: volebni_strany
            },
            MandatyKurie: {
              id: sectionId++,
              title: 'Kurie',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              info: "Nějaké informace k vysvětlení",
              hasCounter: true,
              values: kurie
            },
            MandatyVybory: {
              id: sectionId++,
              title: 'Výbory',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              info: "Nějaké informace k vysvětlení",
              hasCounter: true,
              values: vybory
            },
            vzdelani: {
              id: sectionId++,
              title: 'Vzdělání',
              type: 'radio',
              order: 'inline',
              property: 'UniverzitniVzdelani',
              values: vysoka_skola,
            },
            nabozenske_vyznani: {
              id: sectionId++,
              title: 'Náboženské vyznání',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Nabozenstvi',
              info: "Nějaké informace k vysvětlení",
              hasCounter: true,
              values: nabozenske_vyznani
            },
            narodnosti: {
              id: sectionId++,
              title: 'Národnosti',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              info: "Nějaké informace k vysvětlení",
              property: 'Narodnosti',
              hasCounter: true,
              values: narodnosti
            },
            vek: {
              id: sectionId++,
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
              id: sectionId++,
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
            Fotografie: {
              id: sectionId++,
              title: 'Fotografie',
              type: 'radio',
              order: 'inline',
              info: "Nějaké informace k vysvětlení",
              property: 'Soubory',
              hasCounter: false,
              values: [
                {id: 'vse', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'ma-fotku', text: 'Má fotku', default: false, selected: false, property: 'Soubory', validate: (property) => property.length > 0},
                {id: 'nema-fotku', text: 'Nemá fotku', default: false, selected: false, property: 'Soubory', validate: (property) => !property.length || property.length === 0},

              ],
            },
            dalsi: {
              id: sectionId++,
              title: 'Další vlastnosti',
              type: 'checkbox',
              multiple: true,
              reset: true,
              property: ['OsobniVztahyPrimarni'],
              order: 'block',
              values: [
                {id: 'vse-dalsi', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
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
              GeoX: poslanec.Adresy[0].GeoX,
              GeoY: poslanec.Adresy[0].GeoY,
              Nazev: poslanec.Adresy[0].Nazev,
              Druh: poslanec.Adresy[0].Druh,
              Jmeno: poslanec.Jmeno,
              Prijmeni: poslanec.Prijmeni,
              DatumNarozeniZobrazene: (poslanec.DatumNarozeniZobrazene !== null) ? poslanec.DatumNarozeniZobrazene : '???',
              DatumUmrtiZobrazene: (poslanec.DatumUmrtiZobrazene !== null) ?  poslanec.DatumUmrtiZobrazene : '???',
              ProfilovaFotka: poslanec.Soubory && poslanec.Soubory.length && poslanec.Soubory[0].URLNahled || false,
              Soubory: poslanec.Soubory,

            }

          });

        },

        statistiky() {

          if (!this.ukazatDataProKonecneObdobi) {
            return this.snemovniObdobi.SnemovniObdobiStatistikaZacatek;
          } else {
            return this.snemovniObdobi.SnemovniObdobiStatistikaKonec;
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
          link: [
            {
              rel:'stylesheet',
              href:'//unpkg.com/leaflet/dist/leaflet.css'
            },
            {
              rel:'stylesheet',
              href:'https://unpkg.com/browse/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css'
            },
            {
              rel:'stylesheet',
              href:'//api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css'
            },
          ],
          htmlAttrs: {
            class: 'alt-bg-02 subpage-parlament'
          }
        }
      }

  }
</script>
