<template lang="pug">

  .section


    .parlament-detail-map

      h2.section-title Místo narození poslanců strany ID 67

      .mapbox()

        <l-map ref="mapbox67" :options="{scrollWheelZoom: false}" :zoom=13>
          l-tile-layer(
            id='',
            accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
            attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
            url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
          )
          //v-marker-cluster(ref="clusterRef" :options="{showCoverageOnHover: false, zoomToBoundsOnClick: true, removeOutsideVisibleBounds: true}")
          l-marker(v-for="(item, index) in getPoslanci(67)" :key="index" :lat-lng="item.LatLng")

            <l-icon :icon-anchor="[0,0]" :icon-size="[30, 30]" class-name="map-person-thumb-head-icon">
              <NuxtLink :to="`/poslanec/${item.Id}/`">
                <div>{{item.Id}}</div>
                <div class="is-hidden headline">test content</div>
                span(v-if="item.Soubory.length > 0")
                  img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
              </NuxtLink>
            </l-icon>

        </l-map>

    .parlament-detail-map

      h2.section-title Místo narození poslanců strany ID 66

      .mapbox()

        <l-map ref="mapbox66" :options="{scrollWheelZoom: false}" :zoom=13>
          l-tile-layer(
            id='',
            accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
            attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
            url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
          )
          //v-marker-cluster(ref="clusterRef" :options="{showCoverageOnHover: false, zoomToBoundsOnClick: true, removeOutsideVisibleBounds: true}")
          l-marker(v-for="(item, index) in getPoslanci(66)" :key="index" :lat-lng="item.LatLng")

            <l-icon :icon-anchor="[0,0]" :icon-size="[30, 30]" class-name="map-person-thumb-head-icon">
              <NuxtLink :to="`/poslanec/${item.Id}/`">
                <div>{{item.Id}}</div>
                <div class="is-hidden headline">test content</div>
                span(v-if="item.Soubory.length > 0")
                  img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
              </NuxtLink>
            </l-icon>

        </l-map>

    .parlament-detail-map

      h2.section-title Místo narození poslanců strany ID 17

      .mapbox()

        <l-map ref="mapbox17" :options="{scrollWheelZoom: false}" :zoom=13>
          l-tile-layer(
            id='',
            accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
            attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
            url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
          )
          //v-marker-cluster(ref="clusterRef" :options="{showCoverageOnHover: false, zoomToBoundsOnClick: true, removeOutsideVisibleBounds: true}")
          l-marker(v-for="(item, index) in getPoslanci(17)" :key="index" :lat-lng="item.LatLng")

            <l-icon :icon-anchor="[0,0]" :icon-size="[30, 30]" class-name="map-person-thumb-head-icon">
              <NuxtLink :to="`/poslanec/${item.Id}/`">
                <div>{{item.Id}}</div>
                <div class="is-hidden headline">test content</div>
                span(v-if="item.Soubory.length > 0")
                  img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
              </NuxtLink>
            </l-icon>

        </l-map>

    .parlament-detail-map

      h2.section-title Místo narození poslanců strany ID 8

      .mapbox()

        <l-map ref="mapbox8" :options="{scrollWheelZoom: false}" :zoom=13>
          l-tile-layer(
            id='',
            accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
            attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
            url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
          )
          //v-marker-cluster(ref="clusterRef" :options="{showCoverageOnHover: false, zoomToBoundsOnClick: true, removeOutsideVisibleBounds: true}")
          l-marker(v-for="(item, index) in getPoslanci(8)" :key="index" :lat-lng="item.LatLng")

            <l-icon :icon-anchor="[0,0]" :icon-size="[30, 30]" class-name="map-person-thumb-head-icon">
              <NuxtLink :to="`/poslanec/${item.Id}/`">
                <div>{{item.Id}}</div>
                <div class="is-hidden headline">test content</div>
                span(v-if="item.Soubory.length > 0")
                  img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
              </NuxtLink>
            </l-icon>

        </l-map>

    .parlament-detail-map

      h2.section-title Místo narození poslanců několika stran

      .mapbox()

        l-map(ref="mapboxAll" :options="{scrollWheelZoom: false}" :zoom="13")
          l-tile-layer(
            id='',
            accessToken='pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
            attribution="Mapová data ÚSTR | Podkladová mapa &copy; <a href='//www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='//creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
            url="https://api.mapbox.com/styles/v1/jakubferenc/ckfnqth7411u319o31xieiy4n/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw"
          )
          v-marker-cluster(ref="clusterRef" :options="{chunkedLoading: true, showCoverageOnHover: false, zoomToBoundsOnClick: true, removeOutsideVisibleBounds: true}")
            l-marker(v-for="(item, index) in getAllPoslanci()" :key="index" :lat-lng="item.LatLng")

              l-icon(:icon-anchor="[0,0]" :icon-size="[30, 30]" class-name="map-person-thumb-head-icon")
                .map-person-thumb-head-icon-in(:data-color="item.Barva" :class="`bg-${item.Barva}`" :style="`background-color: ${item.Barva}`")
                  <NuxtLink :to="`/poslanec/${item.Id}/`">
                    <div>{{item.Id}}</div>
                    <div class="is-hidden headline">test content</div>
                    span(v-if="item.Soubory && item.Soubory.length > 0")
                      img(:src="item.Soubory[0].URLNahled" class="map-person-thumb-head-icon-image")
                  </NuxtLink>

</template>
<style lang="sass">

.map-person-thumb-head-icon-in
  width: 30px
  height: 30px
  border-radius: 100%
  display: inline-block

.parlament-detail-map
  margin: 2em 0

.map-person-thumb-head-icon
  display: flex
  justify-content: center
  align-items: center

.mapbox
  width: 80%
  height: 900px
  margin: 0 auto

.section-title

  @extend %typography-section-title
  margin-bottom: .5em !important

</style>
<script>

// import snemovniObdobiData from '/static/test-data/snemovni-obdobi-91.json';
import poslanciDataPolitickaStrana67 from '/static/test-data/poslanci-politicka-strana-67.json';
import poslanciDataPolitickaStrana66 from '/static/test-data/poslanci-politicka-strana-66.json';
import poslanciDataPolitickaStrana17 from '/static/test-data/poslanci-politicka-strana-17.json';
import poslanciDataPolitickaStrana8 from '/static/test-data/poslanci-politicka-strana-8.json';


export default {

    async asyncData ({store, params}) {

      // await store.dispatch("getSnemovniObdobiDetail", {
      //   snemovniObdobiId: 90 // testovací natvrdo
      // });

    },

    mounted() {

        // will center the map based on the position of all the markers on the map
        this.$refs.mapbox67.mapObject.fitBounds(this.mapBoundsPoslanciOnly(67));
        this.$refs.mapbox66.mapObject.fitBounds(this.mapBoundsPoslanciOnly(66));
        this.$refs.mapbox17.mapObject.fitBounds(this.mapBoundsPoslanciOnly(17));
        this.$refs.mapbox8.mapObject.fitBounds(this.mapBoundsPoslanciOnly(8));

        this.$refs.mapboxAll.mapObject.fitBounds(this.mapBoundsPoslanciAll());


    },

    methods: {

        mapBoundsPoslanciAll() {

          const currentBounds = this.getAllPoslanci().map(item => item.LatLng);

          return currentBounds;

        },

        mapBoundsPoslanciOnly(idStrana) {

          const currentBounds = this.getPoslanci(idStrana).map(item => item.LatLng);

          return currentBounds;

        },

        getBarva(idStrana) {

          let color = '';

          if (idStrana == 67) {

           color = 'red';

          }

          if (idStrana == 66) {

           color = 'blue';

          }
          if (idStrana == 17) {

           color = 'yellow';

          }
          if (idStrana == 8) {

           color = 'green';

          }

          return color;

        },

        getAllPoslanci() {

          return [...this.getPoslanci(66), ...this.getPoslanci(67), ...this.getPoslanci(17), ...this.getPoslanci(8)];

        },

        getPoslanci(idStrana) {

          let whichPoslanci;

          if (idStrana == 67) {

           whichPoslanci = poslanciDataPolitickaStrana67;

          }

          if (idStrana == 66) {

           whichPoslanci = poslanciDataPolitickaStrana66;

          }
          if (idStrana == 17) {

           whichPoslanci = poslanciDataPolitickaStrana17;

          }
          if (idStrana == 8) {

           whichPoslanci = poslanciDataPolitickaStrana8;

          }

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
              Barva: this.getBarva(idStrana),


            }

          });


        },

    },

    computed: {

        snemovniObdobi() {

          return snemovniObdobiData;
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

          let whichPoslanci = this.snemovniObdobi.Poslanci;

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

    },

    data() {
      return {
        title: `Hlavní stránka`,
        hasSlider: false,
      }
    },

      head () {
        return {
          title: `Test  mapy – ${this.$config.globalTitle}`,
          link: [{
            rel:'stylesheet',
            href:'//unpkg.com/leaflet/dist/leaflet.css'
          },
          {
            rel:'stylesheet',
            href:'//api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css'
          }],
          htmlAttrs: {
            class: 'alt-bg-02 '
          }
        }
      }

}
</script>
