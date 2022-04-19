<template lang="pug">

  .mandat-radek.section-padding(:style="`background-color: ${BarvaPozadi}`" :data-mandat-id="Mandat.Id")

    .mandat-radek-content.columns.is-multiline
      .mandat-radek-image.column.is-full-tablet.is-one-third-desktop
        <ParlamentNahledObecnyImage />
        h2.mandat-radek-title.typography-snemovna-obr-nadpis {{Mandat.Parlament}} <br>({{Mandat.DatumZacatkuZobrazene}} — {{Mandat.DatumKonceZobrazene}})

      .mandat-radek-text.column.is-full-tablet.is-two-thirds-desktop

        TabNavigace(:Nastaveni="tabNavigaceNastaveni" Typ="mandat-radek")

</template>

<style lang="sass">

@use "sass:math"



.parlament-snemovni-obdobi-list
  display: flex
  justify-content: flex-start

.parlament-snemovni-obdobi
  position: relative
  height: 150px
  margin-bottom: $margin-until-desktop
  box-sizing: border-box

  .parlament-snemovni-obdobi-in
    padding: 20px
    height: 150px
    display: block
    position: relative


  .image
    position: absolute
    width: 100%
    height: 100%
    object-fit: cover
    top: 0
    left: 0

  .date
    position: relative
    background-color: rgba(0,0,0,.4)
    color: #fff
    @extend %typography-alt-heading
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    width: 100%
    height: 100%
    border-radius: 30px

    +until($tablet)

    +from($tablet)

    +from($desktop)
      font-size: 30px

    +from($widescreen)
      font-size: 40px


    +from($fullhd)


.mandat-radek

  text-align: center
  margin-top: math.div($margin-until-desktop, 1.25)
  &:nth-child(1)
    margin-top: 0

  +until($tablet)

  +from($tablet)

  +from($desktop)

  +from($widescreen)

  +from($fullhd)

  &.alt-bg-01
    background-color: #F8F6F1

  .mandat-radek-content
    display: flex

  .mandat-radek-text

  .mandat-radek-image

    svg

      width: 100%

      +until($tablet)

      +from($tablet)

      +from($desktop)
        max-width: 310px

      +from($widescreen)

      +from($fullhd)

  .parlament-nahled-title
    margin-top: 3.25rem

  .mandat-radek-title
    margin-top: 3.25rem
    margin-left: auto
    margin-right: auto

    +until($tablet)

    +from($tablet)

    +from($desktop)
      max-width: 400px

    +from($widescreen)

    +from($fullhd)

</style>

<script>

  const TabNavigace = () => import('~/components/TabNavigace.vue');


  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";


  // const snemovnyHTMLHelperContainer = (data, parlamentId) => {

  //   const start = `  <div class="parlament-snemovni-obdobi-list columns is-mobile is-multiline">`;
  //   const end = `</div>`;

  //   let content = '';

  //   data.forEach(item => {

  //     let dateYearStart = item.DatumZacatkuZobrazene + "";
  //     dateYearStart = dateYearStart.split(". ")[2];

  //     let dateYearEnd = item.DatumKonceZobrazene + "";
  //     dateYearEnd = dateYearEnd.split(". ")[2];

  //     content = content + `
  //       <a href="/snemovni-obdobi/${item.Id}" class="parlament-snemovni-obdobi column is-one-third-mobile is-one-fifth-tablet ">
  //         <span class="parlament-snemovni-obdobi-in">
  //           <span class="image"></span>
  //           <span class="date">(${dateYearStart}–${dateYearEnd})</span>
  //         </span>

  //       </a>
  //     `;

  //   });

  //   return start + content + end;

  // };

  export default {

    components: { TabNavigace, ParlamentNahledObecnyImage },


    props: ['Mandat'],

    computed: {

      tabNavigaceNastaveni() {

        return {
          typ: 'mandat',
          tabNavigaceNastaveni: {
            style: {
              'margin-top': 0
            }
          },
          polozky: {
            zakladniInformace: {
              id: 'zakladni-informace',
              title: 'Základní informace',
              obsah: '',
              mandat: this.Mandat,
              aktivni: true
            },
            parlamentniFunkce: {
              id: 'parlamentni-funkce',
              title: 'Parlamentní funkce',
              mandat: this.Mandat,
              obsah: 'obsah druhy tab parlamentni funkce',
              pocetPolozekNadpis: this.Mandat.Funkce.length,
              aktivni: false
            },
            vybory: {
              id: 'vybory',
              title: 'Výbory',
              mandat: this.Mandat,
              pocetPolozekNadpis: this.Mandat.Vybory.length,
              obsah: 'obsah pro tab vybory',
              aktivni: false
            },
          },
        };

      },
    },

    data() {
      return {
        BarvaPozadi: '#F8F6F1',
      };
    },
  };

</script>
