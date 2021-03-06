<script lang="ts">
/**
 * Fish Tank Number Badge Component
 * @displayName FIshTankBadge
 */
import FishTankText from './FishTankText.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'


@Component({
    components: {
        badgeNumber:FishTankText
    }
})
export default class FishTankNumberBadge extends Vue {

    //properties
    /**
     * Value is the number displayed in the badge chip
     */
    @Prop({
      default:undefined,
      type:Number
    })
    value:Number

    /**
     * Text shade is the color of the number in the badge chip
     */
    @Prop({
      default:'light'
    })
    textShade:String
    availableShades:["light","dark","disabled"]

    /**
     * Sets a theme to the badge
     */
    @Prop({
      default:'notification-1',
      required:false
    })
    theme:String;
    availableThemes:["theme","bgov", "btax", "notification-1", "notification-2", "notification-3","disabled","neutral"]

    // Computed properties
    get themeClass() {
        switch(this.theme) {
            case "bgov":
                return "badge-chip--grad-bgov-bluepurple"
            case "btax":
                return "badge-chip--grad-btax-blue"
            case "disabled":
                return "badge-chip--color-disabled"
            case "notification-2":
                return "badge-chip--color-notification-2"
            case "notification-3":
                return "badge-chip--color-notification-3"
            case "neutral":
                return "badge-chip--color-neutral"
            default:
                return "badge-chip--color-notification-1"
        }
    }

    get textClass() {
        switch(this.textShade) {
            case "dark":
                return "text--color-dark"
            case "disabled":
                return "text--color-disabled"
            default:
                return "text--color-light"
        }
    }

    get determineIndeterminate() {
        return (this.value === undefined)
    }
}
</script>

<template>
  <div class="badge-area">
    <div
      :theme="theme"
      :textShade="textShade"
      :class="[themeClass, textClass]"
      class="badge-chip">
      <div
        v-if="determineIndeterminate"
        class="inner-circle" />
      <span
        v-else
        :value="value"
        class="number">
        <template v-if="this.value > 99">
          99+
        </template>
        <template v-else>
          {{ this.value }}
        </template>
      </span>
    </div>
    <slot name="content" />
  </div>
</template>

<style scoped lang="scss">
    @import '../styles/mixins';
    @import '../../node_modules/@fishtank/colors/dist/css-variable-stylesheet-text';
    @import '../../node_modules/@fishtank/type/dist/css-variable-stylesheet';
    @import "../../node_modules/@fishtank/type/dist/index.custom-properties";
    @import "../../node_modules/@fishtank/space/dist/index.custom-properties";

    .badge-area {
        position:relative;
        display:inline-block;
        margin-right:calc(var(--baseline)*3);
    }

    .badge-chip{
        top:calc(-1*(var(--baseline)*1));
        left:calc(-3.5*var(--baseline));
        margin-left: 100%;
        border-radius:calc(var(--baseline)*2);
        height:calc(var(--baseline)*4);
        min-width:calc(var(--baseline)*4);
        position: absolute;
    }

    .inner-circle{
        display: block;
        border-radius: 2px;
        top:50%;
        left:50%;
        margin:-1.5px -1.5px;
        height:3px;
        width:3px;
        position: absolute;
        background: var(--color-white);
    }

    .number{
        display:flex;
        padding-right:calc(var(--baseline)*1.5);
        padding-left:calc(var(--baseline)*1.5);
        font-family: var(--font-primary);
        font-size: var(--fontsize-base-sm);
        font-weight: var(--fontweight-semi);
        line-height: 1rem;
        float:right;
        text-align:center;
    }

    // badge colors
    .badge-chip{
        &.badge-chip--grad-bgov-bluepurple {
            background: linear-gradient(to right,  $color-bgov-navy , $color-bgov-purple)
        }
    }

    .badge-chip{
        &.badge-chip--grad-btax-blue {
            background: linear-gradient(to right, $color-bna-blue ,  $color-btax-blue)
        }
    }

    .badge-chip{
        &.badge-chip--color-notification-1 {
            background: var(--badge-background-color, $color-notification-1);
        }
    }

    .badge-chip{
        &.badge-chip--color-notification-2 {
            background: var(--badge-background-color, $color-notification-2);
        }
    }

    .badge-chip{
        &.badge-chip--color-notification-3 {
            background: var(--badge-background-color, $color-notification-3);
        }
    }

    .badge-chip{
        &.badge-chip--color-notification-3 {
            background: var(--badge-background-color, $color-notification-3);
        }
    }

    .badge-chip{
        &.badge-chip--color-disabled {
            background: var(--badge-background-color, $color-disabled);
        }
    }

    .badge-chip{
        &.badge-chip--color-neutral {
            background: var(--badge-background-color, $color-white);
            border: 1px solid $color-disabled;
        }
    }

    //text colors
    .badge-chip{
        &.text--color-light {
            color: var(--color-white);
        }
    }

    .badge-chip{
        &.text--color-dark {
            color: var(--color-black);
        }
    }

    .badge-chip{
        &.text--color-disabled {
            color: var(--color-gray-light);
        }
    }
</style>
