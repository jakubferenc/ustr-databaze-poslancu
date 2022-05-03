<template lang="pug">

  .multi-range-slider(ref="range")

    input(type="hidden" id="" name="" :value="`[${MinValue}, ${MaxValue}]`")

    input(@input="setLeftValue()" @mouseup="mouseUpHandler"  type="range" id="input-left" :min="MinValue" :max="MaxValue - 1" :value="MinValue")
    //- input(@input="setRightValue()" @mouseup="mouseUpHandler"  type="range" id="input-right" :min="MinValue" :max="MaxValue" :value="MaxValue")
    input(@input="setRightValue()" @mouseup="mouseUpHandler"  type="range" id="input-right" :min="MinValue + 1" :max="MaxValue" :value="MaxValue")

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
    watch: {
      MinValue: function(newVal, oldVal) { // watch it

        console.log("changed min value", this.QueryStructure[0], newVal, oldVal);

        this.leftValue = this.MinValue;

        const percent = 0;
        this.$thumbLeft.style.left = percent + "%";
        this.$range.style.left = percent + "%";
      },
      MaxValue: function(newVal, oldVal) { // watch it

        console.log("changed max value", this.QueryStructure[1], newVal, oldVal);

        this.rightValue = this.MaxValue;

        const percent = 0;
        this.$thumbRight.style.right = percent + "%";
        this.$range.style.right = percent + "%";


      }
    },
    data() {

      return {

        $thisEl: null,
        leftValue: null,
        rightValue: null,
      }

    },
    created() {

      this.leftValue = this.MinValue;
      this.rightValue = this.MaxValue;


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

      setLeftValue() {

        console.log("volam set left value");

        const [min, max] = [parseInt(this.$inputLeft.min), parseInt(this.$inputLeft.max)];
        this.leftValue = Math.min(parseInt(this.$inputLeft.value), parseInt(this.$inputRight.value) - 1);

        const percent = ((this.leftValue - min) / (max - min)) * 100;
        this.$thumbLeft.style.left = percent + "%";
        this.$range.style.left = percent + "%";


      },


    setRightValue() {

       console.log("volam set right value");


      const [min, max] = [parseInt(this.$inputRight.min), parseInt(this.$inputRight.max)];
      this.rightValue = Math.max(parseInt(this.$inputRight.value), parseInt(this.$inputLeft.value) + 1);

      const percent = ((this.rightValue  - min) / (max - min)) * 100;
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
