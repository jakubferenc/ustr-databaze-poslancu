<template lang="pug">

  footer.main-footer.section-padding.is-footer

    .columns.is-multiline

      .footer-section.is-section-goals.column.is-one-third-widescreen.is-half-desktop.is-full
        .footer-section-title Cíl webové aplikace
        .footer-section-content.typography-body-text
          p Web je jedním z výstupů projektu „Vývoj moderní parlamentní kultury v českých zemích a Československu“, který je financování z prostředků NAKI II, programu Ministerstva kultury ČR. Řešiteli projektu jsou Národní muzeum, Ústav pro studium totalitních režimů a Masarykův ústav a Archiv AV ČR.


      .footer-section.is-section-app-logos.column.is-one-third-widescreen.is-half-desktop.is-full
        .footer-section-title Na projektu spolupracovali
        .footer-section-content
          nav.nav-logos.typography-body-text
            a.logo(href="https://www.nm.cz/")
              .logo-image-container
                img.logo-image(src="~/assets/images/logo-nm.svg" alt="Logo Národní muzeum")
              span.logo-text.typography-smaller-text Národní muzeum


            a.logo(href="https://www.ustrcr.cz/")
              .logo-image-container
                img.logo-image(src="~/assets/images/logo-ustr.svg" alt="Logo Ústavu pro studium totalitních režimů")
              span.logo-text.typography-smaller-text Ústav pro studium totalitních režimů

            a.logo(href="https://www.mua.cas.cz/")
              .logo-image-container
                img.logo-image(src="~/assets/images/logo-mua.png" alt="Logo Masarykův ústav a Archiv Akademie věd České republiky")
              span.logo-text.typography-smaller-text Masarykův ústav a Archiv Akademie věd České republiky


      .footer-section.is-section-app-logos.column.is-one-third-widescreen.is-half-desktop.is-full
        .footer-section-title Důležité odkazy
        .footer-section-content.typography-body-text
          nav.nav-links
            a.link(href="https://www.nm.cz/" title="Národní muzeum") Národní muzeum
            a.link(href="https://www.ustrcr.cz/" title="Ústav pro studium totalitních režimů") Ústav pro studium totalitních režimů
            a.link(href="https://www.mua.cas.cz/" title="Masarykův ústav a Archiv Akademie věd České republiky") Masarykův ústav a Archiv Akademie věd České republiky

      //- .footer-section.is-section-app-logos.column.is-one-quarter-widescreen.is-half-desktop.is-full
      //-   .footer-section-title Zpětná vazba
      //-   .footer-section-content.typography-body-text
      //-     a(href="#") Poslat zpětnou vazbu na aplikaci DOPLNIT text, chceme též, aby se ozvali pamětníci. Mohou zde být i kontaktní informace, email, výzva k aktivní spolupráci


    //- .columns

    //-   .footer-section.is-section-claim.column.is-full
    //-     p.typography-body-text.typography-smaller-text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

</template>


<style lang="sass">
@import 'bulma/sass/utilities/mixins.sass'

.main-footer
  min-height: 100vh
  background: #fff
  display: flex
  flex-direction: column
  justify-content: space-between

  a
    text-decoration: none

  & > .columns

    &:not(:last-child)

      margin-bottom: 20px

      +from($desktop)
        margin-bottom: 100px


  .footer-section.is-section-goals
    p
      max-width: 366px

  .footer-section.is-section-newsletter

    .footer-section-content
      display: flex


    input[type="text"]
      margin-right: 2rem
      margin-bottom: 10px

    input[type="text"],
    .button-large

      width: 100%
      min-width: auto

      +from($widescreen)
        max-width: 400px
        width: 100%


  .footer-section-title

    margin-bottom: 10px

    +from($tablet)
      margin-bottom: 20px

    +from($desktop)
      margin-bottom: 40px


  .nav-links
    display: flex
    flex-direction: column

    a
      color: rgba(0, 0, 0, .5)
      line-height: 1
      margin-bottom: 1em

  .nav-social-icons
    display: flex

    .icon

      text-decoration: none
      width: 33%

      +from($tablet)
        display: flex
        align-items: center


      .icon-text
        margin-left: 1rem

        +until($tablet)
          display: none

  .nav-logos
    display: flex
    margin-top: -30px

    .logo
      display: flex
      flex-direction: column
      width: 100%
      margin-left: 30px

      .logo-image-container
        height: 80px
        display: flex
        align-items: center
        justify-content: flex-start

      img
        height: auto
        object-fit: contain

      &:first-child
        margin-left: 0

      .logo-text
        margin-top: 10px

</style>
