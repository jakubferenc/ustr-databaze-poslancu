<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .section-padding-h-margin-v

      PoslanciSeznam(
        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
        :PoslanciFiltrovani="poslanci_filtrovani"
        :PoslanciStatistiky="poslanciStatistiky"
        :MaPaginaci="true"
        :MaFiltr="true"
        :MaStatistiky="true"
        :MaButtonMore="true"
        :ButtonMoreLink="false"
      )


</template>


<script>
export default {

    async fetch ({store}) {
      await store.dispatch("getPoslanciSeznam", {
        limit: 200,
        stranka: 1,
      });
    },

    computed: {
      poslanci() {
        return this.$store.state.poslanci
      },
      poslanci_filtrovani() {
        return this.$store.state.poslanci_filtrovani;
      },
      poslanci_seznam_razeni_default_id() {
        return this.$store.state.poslanci_seznam_razeni_id;
      },
      poslanciStatistiky() {

        return this.$store.state.poslanci_statistiky;
      },

     nastaveniFiltrace() {

          // the values must fit the API points and data formats!


          let nabozenske_vyznani = [];
          let narodnosti = [];

          let vysoka_skola = [];
          let maji_vysokou_skolu = [];


          this.poslanci.forEach((item) => {

            const nabozenstvi_edited = (item.NabozenstviNarozeni === null) ? 'neuvedeno' : item.NabozenstviNarozeni;
            const narodnosti_edited = (!item.Narodnosti.length) ? ['neuvedeno'] : item.Narodnosti;

            nabozenske_vyznani.push(nabozenstvi_edited);
            narodnosti.push(...narodnosti_edited);
            maji_vysokou_skolu.push(item.UniverzitniVzdelani);

          });

          // make unique values
          nabozenske_vyznani = [...new Set(nabozenske_vyznani)]
          .sort((a,b) => a.localeCompare(b))
          .map(item => {

            const itemId = (item === 'neuvedeno') ? 'nabozenstvi-neuvedeno' : item;

            return {
              id: itemId,
              text: item,
              selected: false,
              validate: (property) => {

                if (property === null) {

                  if (item === 'neuvedeno') {
                    return true;
                  }

                } else {
                  return property === item;
                }

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
          .sort((a,b) => a.localeCompare(b))
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
            {id: 'vysoka_skola', text: 'Pouze vysoká škola', validate:  (property) => property === true}
          ];

          if (!maji_vysokou_skolu) {
            vysoka_skola[1].disabled = true;
          }


          return {

            parlamentni_telesa: {
              id: 1,
              title: 'Parlamentní tělesa',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              values: [
                {id: 'vse-parlamentni-telesa', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
              ]
            },
            pohlavi: {
              id: 2,
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
            vzdelani: {
              id: 3,
              title: 'Vzdělání',
              type: 'radio',
              order: 'inline',
              property: 'UniverzitniVzdelani',
              values: vysoka_skola,
            },
            nabozenske_vyznani: {
              id: 4,
              title: 'Náboženské vyznání',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'NabozenstviNarozeni',
              values: nabozenske_vyznani
            },
            narodnosti: {
              id: 5,
              title: 'Národnosti',
              type: 'checkbox',
              multiple: true,
              reset: true,
              order: 'block',
              property: 'Narodnosti',
              values: narodnosti
            },
            vek: {
              id: 5,
              title: 'Věk (testuji, neni v dobe snemovniho obdobi)',
              type: 'radio',
              multiple: false,
              reset: true,
              order: 'block',
              property: 'Vek',
              values: [
                {id: 'vse-vek', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'vek-30', text: '30+', default: false, selected: false, validate: (property) => property >= 30 },
                {id: 'vek-40', text: '40+', default: false, selected: false, validate: (property) => property >= 40 },
                {id: 'vek-50', text: '50+', default: false, selected: false, validate: (property) => property >= 50 },
                {id: 'vek-60', text: '60+', default: false, selected: false, validate: (property) => property >= 60 },
                {id: 'vek-70', text: '70+', default: false, selected: false, validate: (property) => property >= 70 },
                {id: 'vek-75', text: '75+', default: false, selected: false, validate: (property) => property >= 75 },
                {id: 'vek-80', text: '80+', default: false, selected: false, validate: (property) => property >= 80 },
              ]
            },
            mandaty: {
              id: 5,
              title: 'Mandáty',
              type: 'radio',
              multiple: false,
              reset: true,
              order: 'block',
              property: 'Mandaty',
              values: [
                {id: 'vse-mandaty', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'ma-jeden-mandat', text: 'Má aspoň 1 mandát', default: false, selected: false, validate: (property) => property.length > 0 },
                {id: 'ma-pet-mandat', text: 'Má aspoň 5 mandátů', default: false, selected: false, validate: (property) => property.length > 4 },
                {id: 'ma-deset-mandat', text: 'Má aspoň 10 mandátů', default: false, selected: false, validate: (property) => property.length > 9 },
                {id: 'ma-dvanactplus-mandat', text: 'Má 12+ mandátů', default: false, selected: false, validate: (property) => property.length > 11 },
              ]
            },
            dalsi: {
              id: 6,
              title: 'Další vlastnosti',
              type: 'checkbox',
              multiple: true,
              reset: true,
              property: ['OsobniVztahyPrimarni', 'Soubory'],
              order: 'block',
              values: [
                {id: 'vse-dalsi', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
                {id: 'ma-fotku', text: 'Má fotku', default: false, selected: false, property: 'Soubory', validate: (property) => property.length },
                {id: 'ma-galerii', text: 'Má galerii', default: false, selected: false, property: 'Soubory', validate: (property) => property.length > 1 },
                {id: 'ma-sociálni-vazby', text: 'Má sociální vazby', property: 'OsobniVztahyPrimarni', default: false, selected: false, validate: (property) => property.length > 0 },
              ],
            }

          }

        },

    },
    data() {
      return {
        title: `Poslanci`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg'
        }
      }
    }

}
</script>


