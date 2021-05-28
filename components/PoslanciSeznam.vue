<template lang="pug">

  .poslanci-seznam.seznam-with-filter

    .filter-seznam

        .filter-seznam-filter-statistics(v-if="MaStatistiky")

          .filter-seznam-filter-statistics-content.columns.is-multiline

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Poměr pohlaví poslanců
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.percentageMale}} <small>%</small>
                span.diagram-graphics-desc muži

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Vzdělání
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.percentageHasUniversityDegree}} <small>%</small>
                span.diagram-graphics-desc má titul

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Znovuzvolení (2+ mandátů)
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.percentageHasMoreThanOneMandate}} <small>%</small>
                span.diagram-graphics-desc

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Nejvyšší věk
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.oldestAge}}
                span.diagram-graphics-desc let

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Nejnižší věk
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.lowestAge}}
                span.diagram-graphics-desc let

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Průměrný věk
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.averageAge}}
                span.diagram-graphics-desc let


        .filter-seznam-bar(v-if="MaFiltr")

          .filter-seznam-bar-left
            span.button.button-filter(:class="sidebarButtonToggleStyles" @click="toggleSidebar()")
              span(v-if="isSidebarOpen") Zavřít filtr
              span(v-else) Otevřít filtr


          .filter-seznam.bar-right

            CustomSelect(:ZakladniPolozka="RaditZakladniPolozkaNastaveni" :RaditDle="RaditDleNastaveni")


        .seznam-content-container()

          .seznam-filter-sidebar(v-if="MaFiltr && isSidebarOpen")
            .seznam-filter-sidebar-content

              .seznam-filter-sidebar-content-header
                p.typography-filter-heading Zobrazuje se {{pocetPoslancuFiltrovanych}} z {{pocetPoslancu}} poslanců

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Parlamentní tělesa
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-checkboxes
                    li.filter-list-item
                      label(for="telesa01")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa01" value="")
                        .filter-list-item-value Poslanecká sněmovna Říšské rady

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Národní shromáždění

                    li.filter-list-item
                      label(for="telesa03")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa03" value="")
                        .filter-list-item-value Poslanecká sněmovna Říšské rady

                    li.filter-list-item
                      label(for="telesa04")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa04" value="")
                        .filter-list-item-value Národní shromáždění
              ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Pohlaví
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-inline.filter-list-radios
                    li.filter-list-item
                      label(for="pohlavi01")
                        .filter-list-item-checkbox
                          input(type="radio" id="pohlavi01" name="pohlavi" value="0")
                        .filter-list-item-value Vše

                    li.filter-list-item
                      label(for="pohlavi02")
                        .filter-list-item-checkbox
                          input(type="radio" id="pohlavi02" name="pohlavi" value="1")
                        .filter-list-item-value Muž

                    li.filter-list-item
                      label(for="pohlavi03")
                        .filter-list-item-checkbox
                          input(type="radio" id="pohlavi03" name="pohlavi" value="2")
                        .filter-list-item-value Žena
                ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Vzdělání
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-inline.filter-list-radios
                    li.filter-list-item
                      label(for="vzdelani01")
                        .filter-list-item-checkbox
                          input(type="radio" id="vzdelani01" name="vzdelani" value="")
                        .filter-list-item-value Vše

                    li.filter-list-item
                      label(for="vzdelani02")
                        .filter-list-item-checkbox
                          input(type="radio" id="vzdelani02" name="vzdelani" value="")
                        .filter-list-item-value Pouze vysoká škola

                ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Náboženské vyznání
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-checkboxes
                    li.filter-list-item
                      label(for="telesa01")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa01" value="")
                        .filter-list-item-value Římskokatolické

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Protestanské

                    li.filter-list-item
                      label(for="telesa03")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa03" value="")
                        .filter-list-item-value Židovské

                    li.filter-list-item
                      label(for="telesa04")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa04" value="")
                        .filter-list-item-value Neuvedeno
              ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Profese
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-checkboxes
                    li.filter-list-item
                      label(for="telesa01")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa01" value="")
                        .filter-list-item-value Řezník

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Právník

                    li.filter-list-item
                      label(for="telesa03")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa03" value="")
                        .filter-list-item-value Židovské

                    li.filter-list-item
                      label(for="telesa04")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa04" value="")
                        .filter-list-item-value Neuvedeno
              ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Tituly a řády
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-checkboxes
                    li.filter-list-item
                      label(for="telesa01")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa01" value="")
                        .filter-list-item-value Šlechtický

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Další

                    li.filter-list-item
                      label(for="telesa03")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa03" value="")
                        .filter-list-item-value Další

                    li.filter-list-item
                      label(for="telesa04")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa04" value="")
                        .filter-list-item-value Neuvedeno
              ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Další vlastnosti
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-checkboxes
                    li.filter-list-item
                      label(for="telesa01")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa01" value="")
                        .filter-list-item-value Má fotku

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Má sociální vazby

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Má galerii médií


                    li.filter-list-item
                      label(for="telesa03")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa03" value="")
                        .filter-list-item-value Další

              ////////////////////////////////////////////////////////////////////////////////

              //// sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section

                .seznam-filter-sidebar-content-section-title.typography-filter-heading Národnost
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list.filter-list-checkboxes
                    li.filter-list-item
                      label(for="telesa01")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa01" value="")
                        .filter-list-item-value Česká

                    li.filter-list-item
                      label(for="telesa02")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa02" value="")
                        .filter-list-item-value Polská

                    li.filter-list-item
                      label(for="telesa03")
                        .filter-list-item-checkbox
                          input(type="checkbox" id="telesa03" value="")
                        .filter-list-item-value Další

              ////////////////////////////////////////////////////////////////////////////////

          .seznam-filter-list

            .columns.is-multiline.is-mobile()

              Poslanec(
                v-for="poslanec in PoslanciFiltrovani"
                :key="poslanec.Id"
                :Id="poslanec.Id"
                :Jmeno="poslanec.Jmeno"
                :Prijmeni="poslanec.Prijmeni"
                :ZivotniData="poslanec.ZivotniData"
                :DatumNarozeniZobrazene="poslanec.DatumNarozeniZobrazene"
                :DatumUmrtiZobrazene="poslanec.DatumUmrtiZobrazene"
                :Mandaty="poslanec.Mandaty"
                :ZobrazitMandaty="aktualniNastaveniRazeni === 'radit-pocet-mandatu' || aktualniNastaveniRazeni === 'radit-pocet-mandatu-sestupne' "
                class="is-one-third-mobile is-one-third-tablet column is-2-fullhd is-2-widescreen is-one-quarter-desktop"
                )

            .component-footer(v-if="MaButtonMore")

              a(v-if="MaButtonMore && ButtonMoreLink" :href="ButtonMoreLink").typo-form-button.button-large Zobrazit všechny poslance

              a(v-if="MaButtonMore && MaPaginaci" href="").typo-form-button.button-large Načíst další poslance

</template>

<style lang="sass" scoped>

  .filter-seznam-bar
    display: flex
    align-item: center
    justify-content: space-between
    margin-bottom: 40px
    font-size: 12px

</style>

<script>
export default {
  props: ["PoslanciStatistiky", "Poslanci", "PoslanciFiltrovani", "MaFiltr", "MaButtonMore", "ButtonMoreLink", "MaPaginaci", "MaStatistiky"],

  computed: {
    sidebarButtonToggleStyles: function () {
      return {
        active: this.isSidebarOpen
      }
    },
    pocetPoslancuFiltrovanych() {
      return this.PoslanciFiltrovani.length;
    },
    pocetPoslancu: function() {
      return this.Poslanci.length;
    },
    aktualniNastaveniRazeni() {
      return this.$store.state.poslanci_seznam_razeni_id;
    }
  },
  methods: {
    toggleSidebar: function() {

      this.isSidebarOpen = (this.isSidebarOpen) ? false: true;

    }
  },

  mounted() {

    this.$sidebar = this.$el.querySelector('.seznam-filter-sidebar');
    this.$sidebar.querySelectorAll('input').forEach(item => item.addEventListener('change', (e) => {

      this.$store.dispatch("getPoslanciFiltrovani", {
        pohlavi: 1
      });

    }));

  },

  data() {
    return {
      isSidebarOpen: true, // can set a default value
      RaditZakladniPolozkaNastaveni: { id: 'radit-default', text: 'řadit dle' },
      RaditDleNastaveni: [
        { id: 'radit-id', text: 'Základní řazení' },
        { id: 'radit-prijmeni', text: 'Podle příjmení' },
        { id: 'radit-prijmeni-sestupne', text: 'Podle příjmení (sestupně)' },
        { id: 'radit-pocet-mandatu', text: 'Podle počtu mandátů' },
        { id: 'radit-pocet-mandatu-sestupne', text: 'Podle počtu mandátů (sestupně)' },
        { id: 'radit-datum-narozeni', text: 'Podle data narození' },
        { id: 'radit-datum-narozeni-sestupne', text: 'Podle data narození (sestupně)' },

      ],
    };
  },
};
</script>
