
<template>
  <div 
    :class="['spinner', gradientClass, spinnerSize, alignClass, {'pause-spinner': !loading}]" 
    :aria-busy="`${loading}`"
    :style="{width: `${spinnerPixelSize}px`, height:`${spinnerPixelSize}px`}" 
    role="alert">
    <svg 
      :height="spinnerPixelSize" 
      :width="spinnerPixelSize">
      <defs>
        <linearGradient 
          :id="gradientClass" 
          x1="0%" 
          y1="0%" 
          x2="100%" 
          y2="0%">
          <stop  
            :style="{stopColor:getStop1}" 
            class="stop-class-1"
            offset="0%" />
          <stop 
            :style="{stopColor:getStop2}"
            class="stop-class-2"
            offset="100%" />
        </linearGradient>
      </defs>
      <circle 
        class="base" 
        :cx="spinnerRadiusSize" 
        :cy="spinnerRadiusSize" />
      <circle
        :style="[{strokeDasharray: `${strokeDashArray}`}, {stroke: `${circleTheme}`}]"
        :class="['spinner-gradient']"
        :r="radius" 
        :cx="spinnerRadiusSize" 
        :cy="spinnerRadiusSize" 
        @stop-spinner="stopSpinner" />
    </svg>
  </div>
</template>
  
<script>
import Vue from 'vue'
import { a11y } from "../util/mixins"
import colors from '@fishtank/colors/dist/index.common'
const stops = {
  'theme':['',''],
  'bgov':[colors.colorBgovNavy,colors.colorBgovPurple],
  'btax':[colors.colorBnaBlue,colors.colorBtaxBlue],
  'blaw':[colors.colorBlawBlue,colors.colorBlawBlue],
  'notification-1':[colors.colorNotification1,colors.colorNotification1],
  'notification-2':[colors.colorNotification2,colors.colorNotification2],
  'notification-3':[colors.colorNotification3,colors.colorNotification3],
}
export default Vue.extend({
  name: 'FishTankLoaderSpinner',
  mixins:[
    a11y
  ],
  props: {
    theme: {
      type:String,
      default:"bgov",
      required:false,
      description: "Spinner BBNA brand color theme",
      availableThemes: ["theme","bgov", "btax", "blaw", "notification-1", "notification-2", "notification-3"]
    },
    size: {
      type:String,
      default: "medium",
      required:false,
      description: "Spinner size",
      availableSizes: ["small", "medium", "large"]
    },
    align: {
      type:String,
      default: "center",
      required: false,
      description: "Spinner alignment",
    },
    loading:{
      type:Boolean,
      default:true,
      required:false,
      description: "Spinner loading state",
    }
  },
  data () {
    return{
      smallDash: 26,
      smallDashMax: 52,
      mediumDash: 50,
      mediumDashMax: 100,
      largeDash: 100,
      largeDashMax: 200,
      body: window.document.getElementsByName('body')
    }
  },
  computed:{
    gradientClass: function(){ return `spinner--${this.theme}-gradient-${this.identifier}`},
    spinnerSize: function(){ return "spinner--" + this.size},
    spinnerPixelSize: function() { 
      return this[`${this.size}Dash`]
    },
    spinnerRadiusSize: function() {
      let num  = this[`${this.size}Dash`].toFixed()
      return (num/2)
    },
    alignClass: function() { return "spinner--align-" + this.align},
    strokeDashArray: function(){
      let countDown = this.size === 'small' ? this.smallDash : 
        this.size === 'medium' ? this.mediumDash :this.largeDash
      return countDown
    },
    radius: function(){
      //controls radius size of spinner svg
      let r = 15
      if(this.size === "small"){
        r = 8
      }else if (this.size === "medium"){
        r = 15
      }else if (this.size === "large"){
        r = 30
      } 
      return r 
    },
    identifier () {
      return (Math.random() * 10000).toFixed(0).toString()
    },
    circleTheme () {
      return `url(#spinner--${this.theme}-gradient-${this.identifier})`
    },
    getStop1 () {
      if (this.theme === 'theme') return `var(--spinner-start-color, ${stops[this.theme][0]})`
      else 
        return `${stops[this.theme][0]}`
    },
    getStop2 () {
      if (this.theme === 'theme') return `var(--spinner-stop-color, ${stops[this.theme][1]})`
      else
        return `${stops[this.theme][1]}`
    } 
  },
  watch: {
    loading: function(isLoading) {
      isLoading ? null : this.stopSpinner()
    }
  },
  methods:{
    stopSpinner: function(){
      var spinInt = window.setInterval( ()=>{
        if (this[this.size + 'Dash'] >= this[this.size + 'DashMax']){
          window.clearInterval(spinInt)
          this.$emit('spinner-done')
          this.loading = false
          document.body.setAttribute('aria-busy',this.loading)
          return
        } else {
          this[this.size + 'Dash']++
        }
      }, (0.57*([this.size + 'Dash'] * 2)))
      
    }
  }
})
</script>

<style lang="scss" scoped >
  @import '../styles/mixins';
  .spinner {
    // width:100px;
    // height: 100px;
    transform: rotate(0deg);
    transform-origin: center center;
    animation: loading .75s linear infinite;
  }
  .spinner .spinner-base{
      fill: none;
      stroke: transparent;
  }
  .spinner .spinner-gradient{
      fill: none;
      stroke-linecap: round;
  }

  .spinner.pause-spinner{
      animation-play-state: paused;
  }

 //sizes
  .spinner.spinner--small{
      circle.base, circle.spinner-gradient{
        stroke-width: 4;
      }
  }
  .spinner.spinner--medium{
      circle.base, circle.spinner-gradient{
        stroke-width: 6;
      }
      circle.spinner-gradient{
        stroke-dasharray: 50;
      }
  }

  .spinner.spinner--large{
      circle.base, circle.spinner-gradient{
      stroke-width: 12;
    }
    circle.spinner-gradient{
      stroke-dasharray: 100;
    }
  }

  .spinner .spinner--align-center {
    text-align: center;
  }
  .spinner .spinner--align-left {
    text-align: left;
  } 
  .spinner .spinner--align-right {
    text-align: right;
  }

  @keyframes loading{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  } 
</style>