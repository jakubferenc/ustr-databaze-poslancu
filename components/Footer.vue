<template lang="pug">

  footer.main-footer.section-padding.is-footer

    .columns.is-multiline

      .footer-section.is-section-newsletter.column.is-half-desktop.is-full
        .footer-section-title Odebírejte náš newsletter
        .footer-section-content.columns.is-multiline
          .column.is-full-tablet.is-half-widescreen
            input.typo-form-input(type="text" placeholder="Zadejte váš email")
          .column.is-full-tablet.is-half-widescreen
            button.typo-form-button.button-large přihlásit se

      .footer-section.is-section-nav-social.column.is-half-desktop.is-full
        .footer-section-title Jsme na sociálních sítích #databazeposlancu
        .footer-section-content.typography-body-text
          nav.nav-social-icons
            a.icon.facebook(href="#")
              img(src="~/assets/images/icon-facebook.svg" alt="Facebook")
              span.icon-text Facebook
            a.icon.instagram(href="#")
              img(src="~/assets/images/icon-instagram.svg" alt="Instagram")
              span.icon-text Instagram
            a.icon.youtube(href="#")
              img(src="~/assets/images/icon-youtube.svg" alt="Youtube")
              span.icon-text Youtube


    .columns.is-multiline

      .footer-section.is-section-goals.column.is-one-quarter-widescreen.is-half-desktop.is-full
        .footer-section-title Cíl aplikace Databáze poslanců
        .footer-section-content.typography-body-text
          p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


      .footer-section.is-section-app-logos.column.is-one-quarter-widescreen.is-half-desktop.is-full
        .footer-section-title Na projektu spolupracovali
        .footer-section-content
          nav.nav-logos.typography-body-text
            a.logo(href="#")
              img.logo-image(src="~/assets/images/logo-ustr.svg" alt="Logo Ústavu pro studium totalitních režimů")
              span.logo-text.typography-smaller-text Ústav pro studium totalitních režimů
            a.logo(href="#")
              img.logo-image(src="~/assets/images/logo-ustr.svg" alt="Logo Ústavu pro studium totalitních režimů")
              span.logo-text.typography-smaller-text Další instituce

      .footer-section.is-section-app-logos.column.is-one-quarter-widescreen.is-half-desktop.is-full
        .footer-section-title Důležité odkazy
        .footer-section-content.typography-body-text
          nav.nav-links
            a.link(href="#") link
            a.link(href="#") link
            a.link(href="#") link

      .footer-section.is-section-app-logos.column.is-one-quarter-widescreen.is-half-desktop.is-full
        .footer-section-title Zpětná vazba
        .footer-section-content.typography-body-text
          a(href="#") Poslat zpětnou vazbu na aplikaci


    .columns

      .footer-section.is-section-claim.column.is-full
        p.typography-body-text.typography-smaller-text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

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

    .logo
      display: flex
      flex-direction: column
      width: 150px
      margin-left: 30px

      &:first-child
        margin-left: 0

      .logo-text
        margin-top: 10px

</style>
