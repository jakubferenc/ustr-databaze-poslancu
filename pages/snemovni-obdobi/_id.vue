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




    .parlament-detail-poslanci


      PoslanciSeznam(
        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
        :MaPaginaci="false"
        :MaFiltr="true"
        :MaStatistiky="false"
        :MaButtonMore="false"
        :ButtonMoreLink="false"
        :MaMapu="true"
        :UkladatFiltrovanePoslanceDoStore="true"
        Nadpis="Poslanci"
        Mod="Vse"
        :MaRazeni="true"
      )

    .parlament-detail-about.section-padding-h-margin-v

      h2.section-title  O sněmovně

      .typography-text-block.columns.is-multiline

        .text-block-image.next-to-text.column.is-full.is-full-tablet.is-half-desktop
          img(v-if="snemovniObdobi.UvodniFotografie" :src="snemovniObdobi.UvodniFotografie" :alt="snemovniObdobi.Nazev")
        .typography-body-text.text-block-text.real-content-text.column.is-full.is-full-tablet.is-half-desktop(v-html="snemovniObdobi.Popis")


    .parlament-detail-events.section-padding-h-margin-v(v-if="snemovniObdobi.CasovaOsa")

      h2.section-title Důležité události

      CasovaOsa(:Data="snemovniObdobi.CasovaOsa")


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


  const SnemovniObdobiData = () => import('~/data/snemovni-obdobi.json').then(m => m.default || m);

  import IconPerson from "~/assets/images/icon-person.svg?inline";

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

      components: {PoslanciSeznam, CasovaOsa, GalerieMediiSeznam, TabNavigace, IconPerson, ParlamentNahledObecnyImage },

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

          let funkce = [];

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


            // funkce
            funkce = [
            ...funkce,
            ...item.Mandaty
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
              .map(mandat => (mandat.Funkce && mandat.Funkce.length > 0) ? mandat.Funkce : ['neuvedeno'])
              .reduce((prev, current) => {return [...prev, ...current]}, [])
              .filter(item => item !== null)
            ];

          });

          const poslaneckySlibMapped = [
            {id: 0, text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            {id: true, text: 'Ano', default: false, selected: false, validate: (property) => {

              const hasPoslaneckySlibForThisSnemovniObdobi = [...property].filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].PoslaneckySlib;

              return hasPoslaneckySlibForThisSnemovniObdobi === true;


            }},
            {id: false, text: 'Ne', default: false, selected: false, validate: (property) => {

              const hasPoslaneckySlibForThisSnemovniObdobi = [...property]
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].PoslaneckySlib;

              return hasPoslaneckySlibForThisSnemovniObdobi === false;


            }},
          ];

          const kooptaceMapped = [
            {id: 0, text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            {id: true, text: 'Ano', default: false, selected: false, validate: (property) => {

              const hasKooptaceForThisSnemovniObdobi = [...property].filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].Kooptace;

              return hasKooptaceForThisSnemovniObdobi === true;


            }},
            {id: false, text: 'Ne', default: false, selected: false, validate: (property) => {

              const hasKooptaceForThisSnemovniObdobi = [...property]
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].Kooptace;

              return hasKooptaceForThisSnemovniObdobi === false;


            }},
          ];



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
          funkce = [...new Set(funkce)]
          .sort((a,b) => a.toString().localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'funkce-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                const funkceItems = [...property]
                .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)
                .map(mandat => (mandat.Funkce && mandat.Funkce.length > 0) ? mandat.Funkce : ['neuvedeno'])
                .reduce((prev, current) => {return [...prev, ...current]}, [])
                .filter(item => item !== null)

                return funkceItems.includes(item);

              }
            };
          });

          // add default value
          funkce = [
            {id: 'vse-funkce', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            ...funkce
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

                return property.length === 0 && item === 'neuvedeno' ? true : property.map(nabozenstviItem => nabozenstviItem.Nazev).includes(item);

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
            {id: 'vysoka_skola', text: 'Má VŠ', validate:  (property) => property === true}
          ];

          if (!maji_vysokou_skolu) {
            vysoka_skola[1].disabled = true;
          }

          const snemovniObdobiNazevEdited = this.snemovniObdobi.Nazev.trim();


          let vekNaZacatkuMandatu = [...this.poslanci]
          .map((poslanec) => {

            return poslanec.Mandaty.filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].VekNaZacatkuMandatu;


          })
          .filter(vek => vek !== null)


          vekNaZacatkuMandatu = [...new Set(vekNaZacatkuMandatu)].sort((a,b) => a-b);

          const vekNaZacatkuMandatuMapped = [
            {id: 'vek-na-zacatku-mandatu-current-min', default: false, reset: false, selected: false, currentValue: vekNaZacatkuMandatu[0], validate: (property, currentValueMin) => {


              const vekNaZacatkuMandatuThisMandat = [...property]
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].VekNaZacatkuMandatu;


              return vekNaZacatkuMandatuThisMandat >= currentValueMin;

            }},

            {id: 'vek-na-zacatku-mandatu-current-max', default: false, reset: false, selected: false, currentValue: vekNaZacatkuMandatu[vekNaZacatkuMandatu.length-1], validate: (property, currentValueMax) => {


              const vekNaZacatkuMandatuThisMandat = [...property]
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].VekNaZacatkuMandatu;


              return vekNaZacatkuMandatuThisMandat <= currentValueMax;

            }},
            vekNaZacatkuMandatu[0],
            vekNaZacatkuMandatu[vekNaZacatkuMandatu.length-1],
          ];


          let vekNaKonciMandatu = [...this.poslanci]
          .map((poslanec) => {

            return poslanec.Mandaty.filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].VekNaKonciMandatu;


          })
          .filter(vek => vek !== null)


          vekNaKonciMandatu = [...new Set(vekNaKonciMandatu)].sort((a,b) => a-b);

          const vekNaKonciMandatuMapped = [
            {id: 'vek-na-konci-mandatu-current-min', default: false, reset: false, selected: false, currentValue: vekNaKonciMandatu[0], validate: (property, currentValueMin) => {


              const vek = [...property]
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].VekNaKonciMandatu;


              return vek >= currentValueMin;

            }},

            {id: 'vek-na-konci-mandatu-current-max', default: false, reset: false, selected: false, currentValue: vekNaKonciMandatu[vekNaKonciMandatu.length-1], validate: (property, currentValueMax) => {


              const vek = [...property]
              .filter(mandat => mandat.SnemovniObdobiId === this.snemovniObdobi.Id)[0].VekNaKonciMandatu;


              return vek <= currentValueMax;

            }},
            vekNaKonciMandatu[0],
            vekNaKonciMandatu[vekNaZacatkuMandatu.length-1],
          ];

          let poctyMandatu = [...this.poslanci].map(poslanec => poslanec.Mandaty.length);
          poctyMandatu = [...new Set(poctyMandatu)].sort((a,b) => a-b);

          const pocetMandatuMapped = [
            {id: 'pocet-mandatu-current-min', default: false, reset: false, selected: true, currentValue: poctyMandatu[0], validate: (property, currentValueMin) => {


              return property.length >= currentValueMin;

            }},
            {id: 'pocet-mandatu-current-max', default: false, reset: false, selected: true, currentValue: poctyMandatu[poctyMandatu.length-1], validate: (property, currentValueMax) => {


              return property.length <= currentValueMax;

            }},
            poctyMandatu[0],
            poctyMandatu[poctyMandatu.length-1],
          ];


          return {
            PoslaneckySlib: {
              id: sectionId++,
              title: 'Poslanecky Slib',
              type: 'radio',
              order: 'inline',
              info: "Nějaké informace k vysvětlení",
              hasCounter: false,
              property: 'Mandaty',
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
            Kooptace: {
              id: sectionId++,
              title: 'Kooptace',
              type: 'radio',
              order: 'inline',
              info: "Nějaké informace k vysvětlení",
              hasCounter: false,
              property: 'Mandaty',
              values: kooptaceMapped,
            },
            MandatyFunkce: {
              id: sectionId++,
              title: 'Funkce',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              info: "Nějaké informace k vysvětlení",
              hasCounter: true,
              values: funkce
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
            PocetMandatu: {
              id: sectionId++,
              title: 'Počet mandátů',
              type: 'range',
              order: 'inline',
              info: "Nějaké informace k vysvětlení",
              property: 'Mandaty',
              hasCounter: false,
              queryStructure: ['MinimalniPocetMandatu', 'MaximalniPocetMandatu', 'AbsolutniMinimalniPocetMandatu', 'AbsolutniMaximalniPocetMandata'], // order matterrs, first lower bound, next higher bound
              values: pocetMandatuMapped,
            },
            VekNaZacatkuMandatu: {
              id: sectionId++,
              title: 'Věk na začátku mandátu',
              type: 'range',
              order: 'inline',
              info: "Nějaké informace k vysvětlení",
              property: 'Mandaty',
              hasCounter: false,
              queryStructure: ['MinimalniPocetMandatu', 'MaximalniPocetMandatu', 'AbsolutniMinimalniPocetMandatu', 'AbsolutniMaximalniPocetMandata'], // order matterrs, first lower bound, next higher bound
              values: vekNaZacatkuMandatuMapped,
            },
            VekNaKonciMandatu: {
              id: sectionId++,
              title: 'Věk na konci mandátu',
              type: 'range',
              order: 'inline',
              info: "Nějaké informace k vysvětlení",
              property: 'Mandaty',
              hasCounter: false,
              queryStructure: ['MinimalniPocetMandatu', 'MaximalniPocetMandatu', 'AbsolutniMinimalniPocetMandatu', 'AbsolutniMaximalniPocetMandata'], // order matterrs, first lower bound, next higher bound
              values: vekNaKonciMandatuMapped,
            },
            // dalsi: {
            //   id: sectionId++,
            //   title: 'Další vlastnosti',
            //   type: 'checkbox',
            //   multiple: true,
            //   reset: true,
            //   property: ['OsobniVztahyPrimarni'],
            //   order: 'block',
            //   values: [
            //     {id: 'vse-dalsi', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
            //     {id: 'ma-galerii', text: 'Má galerii', default: false, selected: false, property: 'Soubory', validate: (property) => property.length > 1 },
            //     {id: 'ma-sociálni-vazby', text: 'Má sociální vazby', property: 'OsobniVztahyPrimarni', default: false, selected: false, validate: (property) => property.length > 0 },
            //   ],
            // }

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
