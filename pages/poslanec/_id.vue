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


    //- .section-padding-h-margin-v.typography-has-no-h-padding


    //-     <SocialniMapa :Poslanec="poslanec" :MaNadpis="true" :MaBilePozadi="true" />


    //- .parlament-detail-galerie-medii.section-padding.alt-bg-02(v-if="poslanec.Soubory.length > 0")

    //-   h2.section-title Galerie médií

    //-   GalerieMediiSeznam(:Soubory="poslanec.Soubory" :MaButtonMore="false" :MaFilter="false")



</template>

<style lang="sass">

@use "sass:math"

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

  const CasovaOsa = () => import('~/components/CasovaOsa.vue');
  const MandatRadek = () => import('~/components/MandatRadek.vue');
  const SocialniMapa = () => import('~/components/SocialniMapa.vue');
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

      components: { CasovaOsa, MandatRadek, SocialniMapa, GalerieMediiSeznam, MapaIkonaNarozeni,  MapaIkonaUmrti, ParlamentNahledObecnyImage },

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

                if ([2,3].includes(item.Druh)) {

                  if (item.Zaznamy?.length) {


                    item.Zaznamy.forEach((zaznam) => {


                      snemovniObdobiString += `

                        <div class="map-card__date-item">


                          <span>${zaznam.DatumZacatkuZobrazene}</span> &mdash; <span>${zaznam.DatumKonceZobrazene}</span> <br>
                          <span class="parlament">${zaznam.Parlament}</span>

                        </div>

                      `;


                    });

                  }


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



                } else {

                  return `

                    <div class="is-map-card">

                      <div class="map-card__title">${item.DruhNazev}</div>

                      <div class="map-card__content">


                        <div class="map-card__content__address">${item.Nazev}</div>
                        <div class="map-card__content__address__meta">
                          GPS lokace: ${item.GeoX} ${item.GeoY}
                        </div>


                      </div>

                    </div>

                  `;

                }


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

                    content = index + 1;

                  }


                  return `${start} ${content} ${end}`;


                }
              },
              zIndex: 9,
            },
          },
          mapMarkers: [],
          mapBoundingBox: [],
          defaultZoom: 8,
        }
      },

      methods: {



        toggleFullNameWithTitles(e) {

          e.preventDefault();
          this.showFullNameWithTitles = !this.showFullNameWithTitles;


        },

      },

      mounted() {

        console.log("this.poslanec", this.poslanec);

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

            console.log("from mounted poslanec", this.poslanec);


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




        });


      },

      computed: {

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
            }
          ],
          htmlAttrs: {
            class: 'subpage-poslanci'
          }
        }
      }

  }
</script>
