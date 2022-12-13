<template lang="pug">

.map-container-main

  <client-only placeholder="Načítám...">
    .mapbox(ref="mapElement" data-component="mapbox" v-if="geojson" :class="{'is--large': Velka}")

  </client-only>


  .map-legend(v-if="geojson && Object.keys(partyColorRelations).length > 0")
    .map-legend__title Legenda
    .map-legend__list
      .item-legend(v-for="stranaObj in partyColorRelations")
        .color(:style="`background-color: ${stranaObj.color}`")
        .name {{ stranaObj.Nazev }}



</template>
<style lang="sass">

@use "sass:math"




.mapbox
  height: 700px
  background: lightgray


.map-legend
  margin-top: 2em
  background: white
  padding: 2em


  .map-legend__title

    @extend %typography-item-detail-text
    margin-bottom: 1em
    text-align: center


  .map-legend__list
    display: flex
    flex-wrap: wrap
    font-size: 14px
    justify-content: flex-start
    align-items: flex-start
    row-gap: 2em
    column-gap: 2em

  .item-legend
    width: 30%
    flex: none
    display: flex


    .color
      display: inline-block
      width: 30px
      height: 30px
      border-radius: 100%
      flex: none
      margin-right: 1em



.has--political-indicator

  .map__marker__container.map-address-icon.map-person-thumb-head-icon

    background-color: red


.marker-cluster-small
  background-color: rgba(191,191,191, 0.6)

.marker-cluster-small div
  background-color: rgba(191,191,191, 0.6)


.marker-cluster-medium
  background-color: rgba(191,191,191, 0.6)

.marker-cluster-medium div
  background-color: rgba(191,191,191, 0.6)


.marker-cluster-large
  background-color: rgba(191,191,191, 0.6)

.marker-cluster-large div
  background-color: rgba(191,191,191, 0.6)
</style>

<script>
import slugify from "slugify";
let leafletObj;
let leafletObjMarkerCluster;

if (process.client) {
  leafletObj = () => import("leaflet");
  leafletObjMarkerCluster = () => import("leaflet.markercluster");
}

export default {
  props: {
    PoslanciVstupniData: {
      type: Array,
      required: true,
    },
    Typ: {
      type: String,
      required: false,
      default: "MistoNarozeni",
    },
    Velka: {
      type: Boolean,
      required: false,
      default: false,
    },
    NastaveniMapa: {
      type: [Object, Boolean],
      required: false,
      default: false,
    },
  },
  methods: {
    getColorForGivenPartyAffiliationId(affiliationObj) {
      if (affiliationObj.Id === null) return;

      const komunistickeStrany = [17, 19, 5222];
      const lidoveckeStrany = [22, 23, 24, 19550, 9885, 15684];
      const socialniDemokrateStrany = [890, 20889, 21688, 11332, 17577];

      const sadaNahodnychBarev = [];

      // 147 = Národní shromáždění ČSR/ČSSR
      // 157 = Česká národní rada
      // 151 = Federální shromáždění ČSSR/ČSFR - Sněmovna lidu
      // 152 = Federální shromáždění ČSSR/ČSFR - Sněmovna národů

      const idSnemovenKdePouzivameKluby = [147, 151, 152, 157];

      const minHSL = 38;
      const maxHSL = 315;

      let newColor = "";

      try {
        if (this.partyColorRelations[affiliationObj.Id]) {
          return this.partyColorRelations[affiliationObj.Id].color;
        }

        if (komunistickeStrany.includes(affiliationObj.Id)) {
          newColor = `hsla(360, 100%, 29%, 1)`;
        } else if (lidoveckeStrany.includes(affiliationObj.Id)) {
          newColor = `hsla(169, 100%, 5%, 1)`;
        } else if (socialniDemokrateStrany.includes(affiliationObj.Id)) {
          newColor = `orange`;
        } else {
          const randomNumberWithinHSLRange =
            Math.floor(Math.random() * (maxHSL - minHSL + 1)) + minHSL;
          newColor = `hsl(${randomNumberWithinHSLRange}, 100%, 29%)`;
        }

        this.partyColorRelations = {
          ...this.partyColorRelations,
          [affiliationObj.Id]: {
            ...affiliationObj,
            color: newColor,
          },
        };
      } catch (e) {
        console.error(e);
      }

      return newColor;
    },

    async initMap() {
      // reset cached vars

      if (this.mapInstance !== null) {
        this.mapMarkers = [];
        this.mapBoundingBox = [];

        this.mapInstance.off();
        this.mapInstance.remove();

        this.partyColorRelations = {};

        //this.mapInstance.invalidateSize()
      }

      const {
        Map,
        map,
        Marker,
        Browser,
        tileLayer,
        DomEvent,
        divIcon,
        latLng,
        latLngBounds,
        Polyline,
        popup,
      } = await leafletObj();
      const { MarkerClusterGroup, MarkerCluster } = await leafletObjMarkerCluster();

      const $mapElement = this.$refs.mapElement;

      this.mapInstance = map($mapElement, this.mapOptions);

      tileLayer(
        `https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=${this.$config.mapbox.accessToken}`,
        {
          id: "mapbox.light",
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }
      ).addTo(this.mapInstance);

      // // init clusters for places
      // https://github.com/Leaflet/Leaflet.markercluster
      const mapMarkersClusterAddresses = new MarkerClusterGroup({
        // clusterPane: 'addresses-clusters',
        maxClusterRadius: 25,
        showCoverageOnHover: false,
        removeOutsideVisibleBounds: true,
        chunkedLoading: true,
      }).on("clusterclick", (event) => {
        DomEvent.stopPropagation(event);
        // this.resetAll();
      });

      this.geojson.forEach((item, index) => {
        let iconClassNames = [this.mapSettings.addresses.iconLargePerson.className];

        let styleString = "";

        if (
          this.NastaveniMapa &&
          this.NastaveniMapa?.zvyraznitPoslancePodlePolitickePrislusnosti?.enable
        ) {
          iconClassNames = [...iconClassNames, "has--political-indicator"];

          const strany = Array.from(new Set(item.VolebniStrany));
          const kluby = Array.from(new Set(item.Kluby));

          iconClassNames = [
            ...iconClassNames,
            ...strany.map((item) => `is--strana-${item.Id}`),
          ];
          iconClassNames = [
            ...iconClassNames,
            ...kluby.map((item) => `is--klub-${item.Id}`),
          ];

          const stranaColor = this.getColorForGivenPartyAffiliationId(strany[0]);

          styleString = `background-color: ${stranaColor}`;
        }

        const icon = new divIcon({
          ...this.mapSettings.addresses.iconLargePerson,
          className: iconClassNames.join(", "),
          html: this.mapSettings.addresses.iconLargePerson.html(item, index, styleString),
        });

        const marker = new Marker([item.GeoX, item.GeoY], {
          // pane: 'addresses',
          bubblingMouseEvents: false,
          riseOnHover: true,
          icon,
          zIndexOffset: 2,
        });

        marker.on("click", (event) => {
          // in dev tools in chrome, you can get error on click, but it's a Chrome bug
          // viz https://stackoverflow.com/a/50857216/12058461
          // DomEvent.stopPropagation(event);
          // console.log("click on marker", item);
        });

        marker.bindPopup(this.mapSettings.popup.html(item, styleString));

        this.mapMarkers[index] = marker;

        this.mapBoundingBox = [...this.mapBoundingBox, [item.GeoX, item.GeoY]];

        //marker.addTo(this.mapInstance);

        mapMarkersClusterAddresses.addLayer(marker);
      });

      this.mapInstance.addLayer(mapMarkersClusterAddresses);

      const fitBoundsOptionsDefault = {
        animate: false,
        paddingTopLeft: [80, 60],
        paddingBottomRight: [60, 60],
      };

      const realFitBoundsOptions = Object.assign({}, fitBoundsOptionsDefault);

      if (this.mapBoundingBox.length > 1) {
        // if we have more than one address, make bounds and find automatically center, given the bounds with fitBounds()

        this.mapInstance.fitBounds(this.mapBoundingBox, realFitBoundsOptions);
      } else {
        // if we have just one marker / address, make the center of the map based on this marker's coordinates

        this.mapInstance.setView(this.mapBoundingBox[0], this.defaultZoom);
      }
    },
  },

  mounted() {
    // load map
    this.$nextTick(() => {
      setTimeout(async () => {
        await this.initMap();
      }, 500);
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

  created() {
    console.log("testing config", this.$config);
  },

  computed: {
    geojson() {
      // get items for the map
      // we want to show on the map items "poslanci" reactively based on the fact if we have already filtered them via PoslanciSeznam component
      // in such case poslance are already filtered, we have them in the store in the variable "poslanci_filtrovani"
      // if we have not filtered "poslanci" yet, we get them from the snemovniObdobi.Poslanci item via this.poslanci computed property

      const whichPoslanci = this.PoslanciVstupniData;

      return [...whichPoslanci]
        .filter((poslanec) => poslanec.Adresy && poslanec.Adresy.length > 0)
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
            VolebniStrany: poslanec.VolebniStrany,
            Kluby: poslanec.Kluby,
            DatumNarozeniZobrazene:
              poslanec.DatumNarozeniZobrazene !== null
                ? poslanec.DatumNarozeniZobrazene
                : "???",
            DatumUmrtiZobrazene:
              poslanec.DatumUmrtiZobrazene !== null
                ? poslanec.DatumUmrtiZobrazene
                : "???",
            ProfilovaFotka:
              (poslanec.Soubory &&
                poslanec.Soubory.length &&
                poslanec.Soubory[0].URLNahled) ||
              false,
            Soubory: poslanec.Soubory,
          };
        });
    },
  },

  watch: {
    PoslanciVstupniData() {
      console.log("from watcher poslanci vstupni data");

      this.initMap();
    },
  },

  data() {
    return {
      partyColorRelations: {},
      mapInstance: null,
      mapSettings: {
        popup: {
          html: (item, styleString = "") => {
            const hasBgColor =
              this.NastaveniMapa &&
              this.NastaveniMapa?.zvyraznitPoslancePodlePolitickePrislusnosti?.enable
                ? true
                : false;

            const imageContent =
              item.ProfilovaFotka && item.ProfilovaFotka !== ""
                ? `
                <img src="${
                  item.ProfilovaFotka
                }" class="map-person-thumb-head-icon-image ${
                    hasBgColor ? "has--bg-color" : ""
                  }" />
              `
                : `<div class="map-person-thumb-head-icon-image" style="${styleString}">

                  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="98" viewBox="0 0 90 98">
                    <g id="user-filled-person-shape-svgrepo" transform="translate(-3.577)">
                      <g id="Group_1365" data-name="Group 1365" transform="translate(3.578)">
                        <path id="Path_409" data-name="Path 409" d="M47.893,47.221c11.768,0,21.341-10.592,21.341-23.611S59.66,0,47.893,0,26.55,10.592,26.55,23.61,36.125,47.221,47.893,47.221Z" transform="translate(-2.965)"/>
                        <path id="Path_410" data-name="Path 410" d="M73.431,44.123a3.059,3.059,0,0,0-3.236,1.355A26.435,26.435,0,0,1,48.577,58.2,26.432,26.432,0,0,1,26.961,45.478a3.059,3.059,0,0,0-3.244-1.354C6.914,47.777,2.485,72.8,3.792,93.115a3.024,3.024,0,0,0,3.035,2.811h83.5a3.024,3.024,0,0,0,3.034-2.811C94.673,72.775,90.241,47.74,73.431,44.123Z" transform="translate(-3.578 2.074)"/>
                      </g>
                    </g>
                  </svg>



              </div>`;

            const detailUrl = slugify(`${item.Jmeno}-${item.Prijmeni}-${item.Id}`, {
              locale: "cs",
            }).toLowerCase();

            return `


                  <a class="is-map-card person-poslanec-card" href="/poslanec/${detailUrl}/">

                    <div class="content-container">

                      <div class="header">
                        <div class="full-name">${item.Jmeno} ${item.Prijmeni}</div>
                      </div>

                      <div class="content">
                        <div class="desc">
                          <p>
                            Narození: ${item.DatumNarozeniZobrazene}<br>
                            Úmrtí: ${item.DatumUmrtiZobrazene || "??"}
                          </p>

                          <div class="map-card__content__address">Místo narození: ${
                            item.Nazev
                          }</div>
                          <div class="map-card__content__address__meta">GPS lokace: ${
                            item.GeoX
                          } ${item.GeoY}</div>
                          <div class="map-card__footer">Zobrazit detail poslance →</div>
                        </div>



                      </div>


                    </div>

                    <div class="image-container">${imageContent}</div>

                  </a>


              `;
          },
        },
        addresses: {
          cluster: {
            className: "map__marker map__marker--cluster",
            iconSize: 30,
          },
          iconLargePerson: {
            className: "map__marker map__marker--address",
            iconSize: 50,
            popupAnchor: [-240, 95],
            tooltip: {
              direction: "bottom",
              offset: { x: 0, y: 20 },
            },
            html: (item, index, styleString = "") => {
              const start = `<div class="map__marker__container map-address-icon map-person-thumb-head-icon" style="${styleString}">`;
              const end = `</div>`;

              let content = "";

              if (item.ProfilovaFotka) {
                content = `<img class="map-person-thumb-head-icon-image has--bg-color" src="${item.ProfilovaFotka}" alt="Fotografie osoby ${item.Jmeno} ${item.Prijmeni}">`;
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
            },
          },
          zIndex: 9,
        },
      },
      mapMarkers: [],
      mapBoundingBox: [],
      mapOptions: {
        dragging: true, // !Browser.mobile
        scrollWheelZoom: false,
        tap: false,
        zoomSnap: 0.5,
        zoom: 8,
        center: [47.31322, -1.319482],
        // minZoom: 12,
        // maxZoom: 18,
      },
      title: ``,
    };
  },

  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "//unpkg.com/leaflet/dist/leaflet.css",
        },
        {
          rel: "stylesheet",
          href:
            "https://unpkg.com/browse/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css",
        },
        {
          rel: "stylesheet",
          href: "//api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css",
        },
      ],
      htmlAttrs: {},
    };
  },
};
</script>
