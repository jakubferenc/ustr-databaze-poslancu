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
                .profile-photo.gallery-widget
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

                      .metadata-section-content.typography-item-detail-text.metadata-content-multiple(v-if="poslanec.Nabozenstvi.length")

                        .profese.item(v-for="(itemNabozenstvi, index) in poslanec.Nabozenstvi" :key="index")


                            .profese-title {{itemNabozenstvi.Nazev}}
                            .profese-date-range(v-if="itemNabozenstvi.Zacatek")
                              | (
                              span od roku {{itemNabozenstvi.Zacatek}}
                              | )


                      .metadata-section-content.typography-item-detail-text(v-else) Neuvedeno


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


    //- .parlament-detail-events.section-padding-h-margin-v

    //-   h2.section-title Důležité události poslance

    //-   CasovaOsa(:Data="poslanec.CasovaOsa" v-if="poslanec.CasovaOsa")

    .section-mandaty.section-padding-h-margin-v.typography-has-no-h-padding

      h2.section-title Mandáty poslance ({{poslanec.Mandaty.length}})

      <MandatRadek v-for="mandat in poslanec.Mandaty" :key="mandat.Id" :Mandat="mandat"/>

    .parlament-detail-map

      .section-map-title-container
        h2.section-title Mapa poslance

      <client-only placeholder="Načítám...">
        .mapbox(ref="mapElement" data-component="mapbox")
      </client-only>


    //- .section-padding-h-margin-v.typography-has-no-h-padding(v-if="socialniMapaData")

    //-   h2.section-title Sociální mapa poslance

    //-   #socialni-mapy-container
      //- <SocialniMapa :Poslanec="poslanec" :MaNadpis="true" :MaBilePozadi="true" />


    //- .parlament-detail-galerie-medii.section-padding.alt-bg-02(v-if="poslanec.Soubory.length > 0")

    //-   h2.section-title Galerie médií

    //-   GalerieMediiSeznam(:Soubory="poslanec.Soubory" :MaButtonMore="false" :MaFilter="false")



</template>

<style lang="sass" scoped>

@use "sass:math"

@import "~/vendor/org-chart.css"

.orgchart
  width: 100%
  height: 600px
  display: block
  overflow: auto

.orgchart .node
  min-width: 200px
  padding: 0 1em

.section-mandaty

  margin-bottom: 40px // height of space between mandaty

.parlament-detail-map

  position: relative

  .section-map-title-container

    position: relative
    background-color: rgba(255, 255, 255,.4)
    display: flex
    width: 300px
    align-items: center
    justify-content: center
    z-index: 2
    margin-bottom: -100px
    margin-left: auto
    margin-right: auto

    .section-title
      margin-bottom: 0


.leaflet-container a.leaflet-popup-close-button
  right: 15px
  top: 5px


.leaflet-container a
  color: #000

.section-title

  @extend %typography-section-title

.person-poslanec-card
  text-decoration: none

.profese
  .profese-date-range
    font-size: 80%

.gallery-widget-container

  width: 70%

  +from($widescreen)
    padding-right: $margin-until-desktop


.gallery-widget

  background: #eee
  border-radius: 100%
  overflow: hidden

  height: 0 // to get aspect ration 1:1
  padding-top: 100% // to get aspect ration 1:1

.profile-photo
  position: relative
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover

.metadata-section
  margin-bottom: $margin-until-desktop

  .metadata-content-multiple

    .item
      margin-bottom: .5em
      font-size: 80%

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


  import {addRecursivelyPerson, dateISOStringToCZFormat} from '~/utils/functions';

  import OrgChart from '~/vendor/org-chart';

  const CasovaOsa = () => import('~/components/CasovaOsa.vue');
  const MandatRadek = () => import('~/components/MandatRadek.vue');
  // const SocialniMapa = () => import('~/components/SocialniMapa.vue');
  const GalerieMediiSeznam = () => import('~/components/GalerieMediiSeznam.vue');

  let leafletObj;
  let leafletObjMarkerCluster;

  if (process.client) {

    leafletObj = () => import("leaflet");
    leafletObjMarkerCluster = () => import("leaflet.markercluster");

  }


  import MapaIkonaNarozeni from "~/assets/images/mapa-icon-birth.svg?inline";
  import MapaIkonaUmrti from "~/assets/images/mapa-icon-death.svg?inline";
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

  export default {

  components: {
      CasovaOsa,
      MandatRadek,
      // SocialniMapa,
      GalerieMediiSeznam,
      MapaIkonaNarozeni,
      MapaIkonaUmrti,
      ParlamentNahledObecnyImage,
  },

      async asyncData({$config, params, error, payload, store, $axios}) {

        if (payload) {
          return {
            poslanec: payload
          }
        } else {

          await store.dispatch("getPoslanecDetail", {poslanecId: params.id});

          return {
            poslanec: store.state.poslanec
          }

        }

      },

      data() {
        return {
          showFullNameWithTitles: false,
          mapSettings: {

            popup: {

              html: (item) => {

                let snemovniObdobiString = '';

                // we don't want to show "od" and "do" dates for addresses of types 1,5,6  as they are addresses of birth and death and grave
                if ( (item.Zacatek || item.Konec) && ![1,5,6].includes(item.Druh)) {


                  snemovniObdobiString += `<div class="map-card__date-item">`;

                  snemovniObdobiString += (item.Zacatek) ? `<span>od ${dateISOStringToCZFormat(item.Zacatek)}</span>` : '<span>od ???</span>';
                  snemovniObdobiString += (item.Konec) ? `&nbsp; &mdash; do <span>${dateISOStringToCZFormat(item.Konec)}</span> <br>` : '&nbsp;<span>do ???</span>';
                  snemovniObdobiString += `</div>`;

                };


                return `

                  <div class="is-map-card">

                    <div class="map-card__title">${item.DruhNazev}</div>

                    <div class="map-card__dates">
                      ${snemovniObdobiString}
                    </div>

                    <div class="map-card__content">


                      <div class="map-card__content__address">${item.Nazev}</div>
                      <div class="map-card__content__address__meta">
                        GPS lokace: ${item.GeoX} ${item.GeoY}
                      </div>


                    </div>

                  </div>

                `;


              }
            },
            addresses: {
              cluster: {
                className: 'map__marker map__marker--cluster',
                iconSize: 30,
              },
              iconLarge: {
                className: 'map__marker map__marker--address',
                iconSize: 50,
                popupAnchor: [-200, 95],
                tooltip: {
                  direction: 'bottom',
                  offset: { x: 0, y: 20 },
                },
                html: (item, index) => {

                  const start = `<div class="map__marker__container map-address-icon">`;
                  const end = `</div>`;

                  let content = '';

                  if (item.Druh === 1) {
                    content = `

                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21.458" height="21.458" viewBox="0 0 21.458 21.458">
                        <defs>
                          <clipPath id="clip-path">
                            <rect width="21.458" height="21.458" fill="none"/>
                          </clipPath>
                        </defs>
                        <g id="Repeat_Grid_4" data-name="Repeat Grid 4" clip-path="url(#clip-path)">
                          <g transform="translate(-957.366 -3640.129)">
                            <g id="mapa-icon-birth" transform="translate(957.366 3640.129)">
                              <line id="Line_73" data-name="Line 73" y2="21.458" transform="translate(10.729)" fill="none" stroke="#fff" stroke-width="1"/>
                              <line id="Line_75" data-name="Line 75" y2="21.458" transform="translate(18.315 3.143) rotate(45)" fill="none" stroke="#fff" stroke-width="1"/>
                              <line id="Line_74" data-name="Line 74" x1="21.458" transform="translate(0 10.729)" fill="none" stroke="#fff" stroke-width="1"/>
                              <line id="Line_76" data-name="Line 76" x1="21.458" transform="translate(3.143 3.143) rotate(45)" fill="none" stroke="#fff" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>

                    `;
                  }

                  if (item.Druh === 5) {
                    content = `

                      <svg id="mapa-icon-death" xmlns="http://www.w3.org/2000/svg" width="13.797" height="21.458" viewBox="0 0 13.797 21.458">
                        <line id="Line_73" data-name="Line 73" y2="21.458" transform="translate(6.899)" fill="none" stroke="#fff" stroke-width="1"/>
                        <line id="Line_74" data-name="Line 74" x1="13.797" transform="translate(0 8.046)" fill="none" stroke="#fff" stroke-width="1"/>
                      </svg>

                    `;
                  }

                  if (![1, 5].includes(item.Druh)) {

                    content = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.41" height="23.03" viewBox="0 0 17.41 23.03">
                        <g id="Group_1366" data-name="Group 1366" transform="translate(-616.172 -3375)">
                          <g id="Path_412" data-name="Path 412" transform="translate(616.172 3375)" fill="none">
                            <path d="M8.705,0c4.808,0,8.705,3.594,8.705,8.028,0,2.642-1.384,7.464-3.673,11.17-1.3,2.107-3.09,3.832-5.033,3.832C3.9,23.03,0,12.461,0,8.028S3.9,0,8.705,0Z" stroke="none"/>
                            <path d="M 8.705078125 1.000003814697266 C 4.456478118896484 1.000003814697266 0.9999980926513672 4.152645111083984 0.9999980926513672 8.027773857116699 C 0.9999980926513672 10.20492458343506 2.028958320617676 13.87292385101318 3.446638107299805 16.74944305419922 C 5.100567817687988 20.10534477233887 7.01719856262207 22.03004455566406 8.705078125 22.03004455566406 C 10.04963874816895 22.03004455566406 11.57351875305176 20.80685424804688 12.88672828674316 18.67291450500488 C 15.09222793579102 15.10040473937988 16.41015815734863 10.45498371124268 16.41015815734863 8.027773857116699 C 16.41015815734863 4.152645111083984 12.95367813110352 1.000003814697266 8.705078125 1.000003814697266 M 8.705078125 3.814697265625e-06 C 13.51275825500488 3.814697265625e-06 17.41015815734863 3.594154357910156 17.41015815734863 8.027773857116699 C 17.41015815734863 10.67021465301514 16.02573776245117 15.49191474914551 13.73763847351074 19.19822311401367 C 12.44110870361328 21.30507469177246 10.64737796783447 23.03004455566406 8.705078125 23.03004455566406 C 3.897397994995117 23.03004455566406 -1.9073486328125e-06 12.46139430999756 -1.9073486328125e-06 8.027773857116699 C -1.9073486328125e-06 3.594154357910156 3.897397994995117 3.814697265625e-06 8.705078125 3.814697265625e-06 Z" stroke="none" fill="#fff"/>
                          </g>
                          <g id="Ellipse_505" data-name="Ellipse 505" transform="translate(621.034 3378.828)" fill="none" stroke="#fff" stroke-width="1">
                            <circle cx="3.843" cy="3.843" r="3.843" stroke="none"/>
                            <circle cx="3.843" cy="3.843" r="3.343" fill="none"/>
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
          defaultZoom: 8
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

          setTimeout(async () => {

            const $mapElement = this.$refs.mapElement;

            const {Map, map, Marker, Browser, tileLayer, DomEvent, divIcon, latLng, latLngBounds, Polyline, popup} = await leafletObj();

            const { MarkerClusterGroup, MarkerCluster } = await leafletObjMarkerCluster();


            const mapOptions = {
              dragging: true, // !Browser.mobile
              scrollWheelZoom: false,
              tap: false,
              zoomSnap: .5,
              zoom: 8,
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
              // iconCreateFunction: (cluster) => divIcon({
              //   ...this.mapSettings.addresses.cluster,
              //   html: `${cluster.getAllChildMarkers()[0].getIcon().options.html}<span></span><span></span>`,
              // }),
            })
            .on('clusterclick', (event) => {
              DomEvent.stopPropagation(event);
              // this.resetAll();
            });


            [...this.poslanec.AdresyProMapu].forEach((item, index) => {


              const icon = new divIcon({
                ...this.mapSettings.addresses.iconLarge,
                className: `${this.mapSettings.addresses.iconLarge.className}`,
                html: this.mapSettings.addresses.iconLarge.html(item, index),
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


          setTimeout(async () => {

            if (this.socialniMapaData) {

              const dataNew = this.socialniMapaData;

              const orgChartInstance = new OrgChart({
                'chartContainer': '#socialni-mapy-container',
                'data' : dataNew,
                'depth': 7,
                'nodeContent': 'title',
                'toggleSiblingsResp': false,
                // 'direction': 'l2r',
              });

            }

          }, 0);

        });


      },

      computed: {

        socialniMapaData() {

          let result = [];

          const {Id, Jmeno, Prijmeni, DatumNarozeniZobrazene, DatumUmrtiZobrazene, OsobniVztahyPrimarni, OsobniVztahySekundarni, SouvisejiciPoslanci} = this.poslanec;

          if (SouvisejiciPoslanci && SouvisejiciPoslanci.length > 0) {

            const createThisPoslanecRootObject = {
              Id,
              PrimarniOsobaId: 0,
              Jmeno,
              Prijmeni,
              ZivotniData: `${DatumNarozeniZobrazene} ${DatumUmrtiZobrazene}`,
              name: `${Jmeno} ${Prijmeni}`,
              title: 'Poslanec'

            };

            const resultItems = [...SouvisejiciPoslanci, ]
            .map((person) => {


              return {
                Id: person.Id,
                PrimarniOsobaId: person.VztahovaCesta[0].PrimarniOsobaId,
                Jmeno: person.Jmeno.split("|")[0].trim() || person.VztahovaCesta[0].PrimarniOsobaJmeno.split("|")[0].trim(),
                ZivotniData: person.VztahovaCesta[0].SouvisejícíOsobaZivotniData,
                DruhVztahu: person.VztahovaCesta[0].SouvisejiciOsobaDruhVztahuKPrimarniOsobe,
                JePoslanec: person.VztahovaCesta[0].JeSouvisejiciOsobaPoslanec,
                Uroven: person.VztahovaCesta[0].Uroven,
                name:  person.Jmeno.split("|")[0].trim() || person.VztahovaCesta[0].PrimarniOsobaJmeno.split("|")[0].trim(),
                title: person.VztahovaCesta[0].SouvisejiciOsobaDruhVztahuKPrimarniOsobe,
              }

            });

            const sekundarniVztahyMapped = [...OsobniVztahyPrimarni, ...OsobniVztahySekundarni].map(person => {

              return {
                Id: person.Id,
                PrimarniOsobaId: person.PrimarniOsobaId,
                Jmeno: person.PrimarniOsobaJmeno.split("|")[0].trim(),
                ZivotniData: null,
                DruhVztahu: person.SouvisejiciOsobaDruhVztahuKPrimarniOsobe,
                JePoslanec: person.JeSouvisejiciOsobaPoslanec,
                Uroven: person.Uroven,
                name:  person.PrimarniOsobaJmeno.split("|")[0].trim(),
                title: person.SouvisejiciOsobaDruhVztahuKPrimarniOsobe,
              }

            });

            let preparedItems = [createThisPoslanecRootObject, ...sekundarniVztahyMapped, ...resultItems];

            if (!this.$config.poslanec.socialniVazby.showPritelType) {

              preparedItems = [...preparedItems].filter(item => item.DruhVztahu !== 'přítel'); // filter out type "přítel"

            }




            result = [...preparedItems]
            .reduce((prev, current) => {

              return addRecursivelyPerson(prev, current, preparedItems);

            }, preparedItems);


            // filter out from the first level of the array those items that do not have a direct link to the poslanec via PrimarniOsobaId

            const resultOnlyChildrenWithTheirChildren = result.filter(person => person.PrimarniOsobaId === this.poslanec.Id);


            result = {
              ...createThisPoslanecRootObject,
              children: resultOnlyChildrenWithTheirChildren,
            }

            return result;


          } else {

            return false;
          }


        },

        mandatyChronologicky() {



        },

        profileImage() {

          const hasProfileImage = this.poslanec.Soubory && this.poslanec.Soubory.length && this.poslanec.Soubory.length > 0;

          if (hasProfileImage) {
            return this.poslanec.Soubory[0].URLNahled;
          } else {
            return false;
          }

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
              DatumZacatkuZobrazene: adresa?.Zacatek,
              DatumKonceZobrazene: adresa?.Konec,
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
          title: `${this.poslanec?.Jmeno} ${this.poslanec?.Prijmeni} — ${this.$config.globalTitle}`, // :TODO:
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
            class: 'subpage-poslanci'
          }
        }
      }

  }
</script>
