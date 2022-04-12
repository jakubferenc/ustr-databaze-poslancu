<template lang="pug">

  .multi-range-slider(ref="range")

    input(type="hidden" id="" name="" :value="`[${leftValue}, ${rightValue}]`")

    input(@input="setLeftValue" @change="mouseUpHandler"  type="range" id="input-left" :min="MinValue" :max="MaxValue" :value="MinValue")
    input(@input="setRightValue" @change="mouseUpHandler"  type="range" id="input-right" :min="MinValue" :max="MaxValue" :value="MaxValue")

    .slider
      .track
      .range
      .thumb.left
      .thumb.right()

      .text-left {{leftValue}}

      .text-right {{rightValue}}

</template>


<style lang="sass">


  .multi-range-slider
    height: 60px
    position: relative
    justify-content: center
    align-items: center
    display: flex
    margin-top: -15px


  .slider
    position: relative
    z-index: 1
    height: 10px
    margin: 0 15px
    width: 100%

    .text-left
      position: absolute
      left: -7.5px
      top: 20px

    .text-right
      position: absolute
      right: -7.5px
      top: 20px

    .track
      position: absolute
      z-index: 1
      left: 0
      right: 0
      top: 0
      bottom: 0
      border-radius: 5px
      background-color: rgba($color-primary-blue,.3)


    .range
      position: absolute
      z-index: 2
      left: 0
      right: 0
      top: 0
      bottom: 0
      border-radius: 5px
      background-color: $color-primary-blue

    .thumb
      position: absolute
      z-index: 3
      width: 30px
      height: 30px
      background-color: $color-primary-blue
      border-radius: 50%

    .thumb.left
      left: 0
      transform: translate(-15px, -10px)

    .thumb.right
      right: 0
      transform: translate(15px, -10px)

  input[type="range"]
    position: absolute
    pointer-events: none
    -webkit-appearance: none
    z-index: 2
    height: 10px
    width: 100%
    opacity: 0

  input[type="range"]::-webkit-slider-thumb
    pointer-events: all
    width: 30px
    height: 30px
    border-radius: 0
    border: 0 none
    background-color: red
    cursor: pointer

    -webkit-appearance: none



</style>


<script>

  export default {
    components: {  },

    props: [
      "Id",
      "Name",
      "MinValue",
      "MaxValue",
      "QueryStructure"
    ],

    data() {

      return {

        min: 0, // via props and data api
        max: 100, // via props and data api
        $thisEl: null,
        leftValue: this.MinValue,
        rightValue: this.MaxValue,
      }

    },
    methods: {

      mouseUpHandler() {

        this.$emit('multi-range-change', {
          name: this.Name,
          value: {
            [this.QueryStructure[0]]: this.leftValue,
            [this.QueryStructure[1]]: this.rightValue,
        }});

      },

      setLeftValue(e) {

        const [min, max] = [parseInt(e.target.min), parseInt(e.target.max)];
        this.leftValue = e.target.value = Math.min(parseInt(e.target.value), parseInt(this.$inputRight.value) - 1);

        const percent = ((e.target.value - min) / (max - min)) * 100;
        this.$thumbLeft.style.left = percent + "%";
        this.$range.style.left = percent + "%";


      },


    setRightValue(e) {


      const [min, max] = [parseInt(e.target.min), parseInt(e.target.max)];
      this.rightValue = e.target.value = Math.max(parseInt(e.target.value), parseInt(this.$inputLeft.value) + 1);

      const percent = ((e.target.value - min) / (max - min)) * 100;
      this.$thumbRight.style.right = 100 - percent + "%";
      this.$range.style.right = 100 - percent + "%";


    }

    },

    mounted() {

      this.$thisEl = this.$refs.range;


      this.$inputLeft = this.$thisEl.querySelector('#input-left');
      this.$inputRight = this.$thisEl.querySelector('#input-right');

      this.$thumbLeft = this.$thisEl.querySelector('.thumb.left');
      this.$thumbRight = this.$thisEl.querySelector('.thumb.right');

      this.$range = this.$thisEl.querySelector(".range");



    },


  };

</script>
