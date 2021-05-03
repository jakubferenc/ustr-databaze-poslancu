<template lang="pug">

  .parlament-radek.section-padding(:style="`background-color: ${BarvaPozadi}`" :data-parlament-id="Id")

    .parlament-radek-content.columns.is-multiline
      .parlament-radek-image.column.is-full-tablet.is-half-desktop
        <ParlamentNahledObecnyImage />
      .parlament-radek-text.column.is-full-tablet.is-half-desktop

        h2.parlament-radek-title.typography-section-title {{Nazev}}

        .parlament-radek-desc.typography-item-detail-text.real-content-text
          p Česká národní rada byl samostatný zastupitelský orgán pro občany České socialistické republiky, od roku 1990 České republiky. Jednalo se o obdobu již existující Slovenské národní rady v rámci připravované federace Československa. Dne 10.7.1968 bylo nepřímo zvoleno 150 členů majících na starosti přípravu a ustavení České socialistické republiky a jejího zákonodárného sboru. Od 1.1.1969 fungovala Česká národní rada již na základě zákona o federaci jako legislativní orgán ve vztahu k nově ustavené české vládě a počet členů byl kooptací rozšířen na 200. První přímé volby se konaly až v roce 1971 s volebním obdobím 5 let. Většinový volební systém, na jehož základě voliči schvalovali pouze jediného navrženého kandidáta ve svém volebním obvodu, zůstal v platnosti až do roku 1990, kdy Česká národní rada přešla na poměrný volební systém v 7 volebních krajích.
          p Po celou dobu své existence sídlila rada v Thunovském paláci na Malé Straně. Česká národní rada volila a odvolávala své předsednictvo a zřizovala sněmovní výbory. Na republikové úrovni vydávala vlastní zákony a potenciálně mohla i vyslovit nedůvěru české vládě. V období normalizace nicméně nejčastěji volila soudce z povolání, scházela se zpravidla čtyřikrát v roce a přijímala jen několik jednotek zákonů ročně. Její úloha narostla po Listopadu 1989, kdy se uskutečnily svobodné volby více politických stran, nabyly na významu republikové orgány a zvýšil se také počet zasedání a přijatých zákonů. Od 1. ledna 1993 se přejmenovala na Poslaneckou sněmovnu tehdy jednokomorového Parlamentu České republiky. Poslancům České národní rady tedy na rozdíl do poslanců Federálního shromáždění mandáty se vznikem samostatné České republiky nezanikly.

    TabNavigace(:nastaveni="tabNavigaceNastaveni" typ="parlament-radek")

</template>

<style lang="sass">
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"


.parlament-snemovni-obdobi-list
  display: flex
  justify-content: flex-start

.parlament-snemovni-obdobi
  position: relative
  width: 300px
  height: 150px
  border-radius: 30px
  overflow: hidden
  margin: 20px 10px

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
    @extend .typography-alt-heading
    font-size: 40px
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    width: 100%
    height: 100%

.parlament-radek
  text-align: center

  &.alt-bg-01
    background-color: #F8F6F1

  .parlament-radek-content
    display: flex

  .parlament-radek-text
    max-width: 800px

  .parlament-radek-title
    line-height: 1
    margin-bottom: 50px

  +until($tablet)
    margin-top: 75px
    &:nth-child(1)
      margin-top: 0

  +from($tablet)
    margin-top: 100px
    &:nth-child(1),
    &:nth-child(2)
      margin-top: 0

  +from($desktop)
    margin-top: 150px

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3)
      margin-top: 0

  +from($widescreen)

  +from($fullhd)

  .parlament-nahled-image svg
    width: 100%

  .parlament-nahled-title
    margin-top: 50px
</style>

<script>
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

  const snemovnyHTMLHelperContainer = (data) => {

    const start = `  <div class="parlament-snemovni-obdobi-list columns is-multiline">`;
    const end = `</div>`;

    let content = '';

    data.forEach(item => {

      let dateYearStart = item.DatumZacatkuZobrazene + "";
      dateYearStart = dateYearStart.split(". ")[2];

      let dateYearEnd = item.DatumKonceZobrazene + "";
      dateYearEnd = dateYearEnd.split(". ")[2];

      content = content + `
        <a href="/snemovni-obdobi/${item.Id}" class="parlament-snemovni-obdobi is-one-fifth-desktop">
          <img class="image" src="~/assets/images/snemovni-obdobi-thumb.png"/>
          <span class="date">(${dateYearStart}–${dateYearEnd})</span>
        </a>
      `;

    });

    return start + content + end;

  };

  export default {
    components: { ParlamentNahledObecnyImage },

    props: ['Id', 'Nazev', 'SnemovniObdobi'],

    computed: {

      tabNavigaceNastaveni() {

        return {
          snemovny: {
            id: 'snemovny',
            title: 'sněmovny',
            obsah: snemovnyHTMLHelperContainer(this.SnemovniObdobi),
            aktivni: true
          },
          dalsiInformace: {
            id: 'dalsi-informace',
            title: 'další informace',
            obsah: 'testuji dalsi informace'
          },
          duleziteUdalosti: {
            id: 'dulezite-udalosti',
            title: 'důležité události',
            obsah: 'testuji dulezite udalosti obsah'
          },
          galerieMedie: {
            id: 'galerie-medii',
            title: 'galerie médií',
            obsah: 'tady bude galerie medii'
          }
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
