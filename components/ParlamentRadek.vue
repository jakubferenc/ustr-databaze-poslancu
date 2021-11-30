<template lang="pug">

  .parlament-radek.section-padding(:style="`background-color: ${BarvaPozadi}`" :data-parlament-id="Id")

    .parlament-radek-content.columns.is-multiline
      .parlament-radek-image.column.is-full-tablet.is-half-desktop
        <ParlamentNahledObecnyImage />
      .parlament-radek-text.column.is-full-tablet.is-half-desktop

        h2.parlament-radek-title {{Nazev}}

        .parlament-radek-desc.real-content-text(v-html="StrucnyPopis")

    TabNavigace(:Nastaveni="tabNavigaceNastaveni" Typ="parlament-radek")

</template>

<style lang="sass">

.parlament-radek-title
  @extend %typography-section-title

.parlament-radek-desc
  @extend %typography-item-detail-text

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


.parlament-radek

  text-align: center
  margin-top: $margin-until-desktop/1.25
  &:nth-child(1)
    margin-top: 0

  +until($tablet)

  +from($tablet)

  +from($desktop)

  +from($widescreen)

  +from($fullhd)

  &.alt-bg-01
    background-color: #F8F6F1

  .parlament-radek-content
    display: flex

  .parlament-radek-text
    max-width: 800px

  .parlament-radek-title
    line-height: 1
    margin-bottom: 50px

  .parlament-nahled-image svg
    width: 100%

  .parlament-nahled-title
    margin-top: 50px
</style>

<script>

  const TabNavigace = () => import('~/components/TabNavigace.vue');


  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";


  const snemovnyHTMLHelperContainer = (data, parlamentId) => {

    const start = `  <div class="parlament-snemovni-obdobi-list columns is-mobile is-multiline">`;
    const end = `</div>`;

    let content = '';

    data.forEach(item => {

      let dateYearStart = item.DatumZacatkuZobrazene + "";
      dateYearStart = dateYearStart.split(". ")[2];

      let dateYearEnd = item.DatumKonceZobrazene + "";
      dateYearEnd = dateYearEnd.split(". ")[2];

      content = content + `
        <a href="/snemovni-obdobi/${item.Id}/" class="parlament-snemovni-obdobi column is-one-third-mobile is-one-fifth-tablet ">
          <span class="parlament-snemovni-obdobi-in">
            <span class="image"></span>
            <span class="date">(${dateYearStart}–${dateYearEnd})</span>
          </span>

        </a>
      `;

    });

    return start + content + end;

  };

  export default {

    components: {TabNavigace, ParlamentNahledObecnyImage },


    props: ['Id', 'Nazev', 'SnemovniObdobi', 'StrucnyPopis', 'Popis', 'Barva', 'CasovaOsa', 'Galerie'],

    computed: {

      tabNavigaceNastaveni() {


        return {
          tabNavigaceNastaveni: {},
          polozky: {
            snemovny: {
              id: 'snemovny',
              title: 'sněmovny',
              obsah: snemovnyHTMLHelperContainer(this.SnemovniObdobi, this.Id),
              aktivni: true
            },
            dalsiInformace: {
              id: 'dalsi-informace',
              title: 'podrobné informace',
              obsah: this.Popis
            },
            duleziteUdalosti: {
              id: 'dulezite-udalosti',
              title: 'důležité události',
              obsah: this.CasovaOsa
            },
            galerieMedia: {
              id: 'galerie-medii',
              title: 'galerie médií',
              obsah: this.Galerie,
              pocetPolozekNadpis: (this.Galerie) ? this.Galerie.length : 0,
            }
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
