<template lang="pug">

.multi-range-slider(ref="range")

  input(type="hidden" :value=" `${leftValue}, ${rightValue}` ")

  //- we cannot set min and max to the values acc to current left or right input, because these sliders would shrink
  //- and by shrinking would not fit the custom slider thumbs
  //- therefore we need to set for both sliders the same min and max based on the current data sent to this component

  input(@input="setLeftValueHandler()" @mouseup="mouseUpHandler"  type="range" ref="inputLeftEl" :min="MinValue" :max="MaxValue" :value="leftValue")
  //- input(@input="_setRightValue()" @mouseup="mouseUpHandler"  type="range" id="input-right" :min="MinValue" :max="MaxValue" :value="MaxValue")
  input(@input="setRightValueHandler()" @mouseup="mouseUpHandler"  type="range" ref="inputRightEl" :min="MinValue" :max="MaxValue" :value="rightValue")

  .slider
    .track
    .range(ref="customRange")
    .thumb.left(ref="thumbLeft") {{leftValue}}
    .thumb.right(ref="thumbRight") {{rightValue}}

    .text-left(ref="textLeft") {{MinValue}}

    .text-right(ref="textRight") {{MaxValue}}

</template>


<style lang="sass">


  .multi-range-slider
    min-height: 60px
    position: relative
    justify-content: center
    align-items: center
    display: flex
    margin-top: -15px
    overflow: hidden



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
      color: #fff
      font-size: 12px
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer

    .thumb.left
      left: 0
      transform: translate(-15px, -10px)

    .thumb.right
      right: 0
      transform: translate(15px, -10px)

  input[type="range"]
    position: absolute
    cursor: pointer
    pointer-events: none
    z-index: 2
    height: 10px
    width: 100%
    opacity: 0

    -webkit-appearance: none


  input[type="range"]::-webkit-slider-thumb
    pointer-events: all
    width: 30px
    height: 30px
    border: 0 none
    background-color: red
    cursor: pointer

    -webkit-appearance: none

  input[type="range"]::-moz-range-thumb
    pointer-events: all
    width: 30px
    height: 30px
    border: 0 none
    background-color: red
    cursor: pointer

  input[type="range"]::-ms-thumb
    pointer-events: all
    width: 30px
    height: 30px
    border: 0 none
    background-color: red
    cursor: pointer


</style>


<script>

  export default {
    components: {  },

    props: [
      "Id",
      "Name",
      "CurrentMinValue",
      "CurrentMaxValue",
      "MinValue",
      "MaxValue",
      "QueryStructure"
    ],
    watch: {
      MinValue: function(newVal, oldVal) { // watch it

        this.regenerateSlider();

      },
      MaxValue: function(newVal, oldVal) { // watch it

        this.regenerateSlider();

      }
    },
    data() {

      return {

        $thisEl: null,
        leftValue: null,
        rightValue: null,

        leftHasBeenTouched: false,
        rightHasBeenTouched: false,
      }

    },
    created() {

      this.leftValue = this.CurrentMinValue;
      this.rightValue = this.CurrentMaxValue;

    },
    methods: {

      mouseUpHandler() {

        this.$emit('multi-range-change', {
          name: this.Name,
          values: {
            [this.QueryStructure[0]]: this.leftValue,
            [this.QueryStructure[1]]: this.rightValue,
          },

        });

      },

      regenerateSlider() {




        // if (this.leftHasBeenTouched) {

        //   if (this.MinValue > this.leftValue) {
        //     this.leftValue = this.MinValue;
        //   }

        // } else {
        //   this.leftValue = this.CurrentMinValue;
        // }

        this.leftValue = this.CurrentMinValue;

        if (this.rightHasBeenTouched) {

          if (this.MaxValue < this.rightValue) {
            this.rightValue = this.MaxValue;
          }

        } else {
          this.rightValue = this.CurrentMaxValue;
        }

        // this.rightValue = this.CurrentMaxValue;


        this._regenerateLeftCustomElementsPositions(this.MinValue, this.MaxValue);
        this._regenerateRightCustomElementsPositions(this.MinValue, this.MaxValue);



      },

      _regenerateLeftCustomElementsPositions(min, max) {

        const percent = (  (this.leftValue - min) / (max - min) ) * 100;

        this.$thumbLeft.style.left = percent + "%";
        this.$range.style.left = percent + "%";


      },

      _regenerateRightCustomElementsPositions(min, max) {

      const percent = (  (this.rightValue - min) / (max - min) ) * 100;


      this.$thumbRight.style.right = `${100 - percent}%`;
      this.$range.style.right = `${100 - percent}%`;


      },

      _setLeftValue() {

        // this is internal for making the custom slider button work

        const [min, max] = [parseInt(this.$inputLeft.min), parseInt(this.$inputLeft.max)];

        this.$refs.inputLeftEl.value = this.leftValue = Math.min(parseInt(this.$inputLeft.value), parseInt(this.$inputRight.value) - 1);

        this._regenerateLeftCustomElementsPositions(min, max);

      },

    setLeftValueHandler() {

      this._setLeftValue();

      if (!this.leftHasBeenTouched) {
        this.leftHasBeenTouched = true;
      }


    },


    setRightValueHandler() {


      this._setRightValue();


      if (!this.rightHasBeenTouched) {
        this.rightHasBeenTouched = true;
      }

    },


    _setRightValue() {

      // this is internal for making the custom slider button work
      const [min, max] = [parseInt(this.$inputRight.min), parseInt(this.$inputRight.max)];

      this.$refs.inputRightEl.value = this.rightValue = Math.max(parseInt(this.$inputRight.value), parseInt(this.$inputLeft.value) + 1);

      this._regenerateRightCustomElementsPositions(min, max);




    }

    },

    mounted() {

      this.$thisEl = this.$refs.range;


      this.$inputLeft = this.$refs.inputLeftEl;
      this.$inputRight = this.$refs.inputRightEl;

      this.$thumbLeft = this.$refs.thumbLeft;
      this.$thumbRight = this.$refs.thumbRight;

      this.$range = this.$refs.customRange;

      this._setLeftValue();
      this._setRightValue();


    },


  };

</script>
