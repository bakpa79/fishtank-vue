import { Column, IsBoxType } from "../types/boxTypes"

export default {
  props:{
    tag:{
      default:'div',
      required:false,
      type:String,
      validator: function (value: IsBoxType) {
        return ["div", "span", "section", "article", "aside", "footer", "header", "details", "figcaption", "figure", "main", "nav", "summary", "time"].indexOf(value) !== -1
      },
      description:"Box semantic element"
    },
    as:{
      default:'div',
      required:false,
      type:String,
      validator: function (value: IsBoxType) {
        return ["div", "span", "section", "article", "aside", "footer", "header", "details", "figcaption", "figure", "main", "nav", "summary", "time"].indexOf(value) !== -1
      },
      description:"Box semantic element"
    },
    column: {
      type:Number,
      default:undefined,
      required:false,
      validator: function(value: Column){
        return (0<value && 13>value)
      },
      description:'Box grid columns; maps to xs-column grid',
    },
    // Column, /* 1 -12 */
    // // @Prop()
    xsColumn: {
      type:Number,
      default:null,
      required:false,
      validator: function(value: Column){
        return (0<value && 13>value)
      },
      description:'Box grid columns - XS Breakpoint',
    },

    // xsColumn, /* 1 -12 */
    // // @Prop()
    smColumn: {
      type:Number,
      default:null,
      required:false,
      validator: function(value: Column){
        return (0<value && 13>value)
      },
      description:'Box grid columns  - SM Breakpoint',
    },

    // smColumn, /* 1 -12 */
    // // @Prop()
    mdColumn: {
      type:Number,
      default:null,
      required:false,
      validator: function(value: Column){
        return (0<value && 13>value)
      },
      description:'Box grid columns  - MD Breakpoint',
    },

    // mdColumn, /* 1 -12 */
    // // @Prop()
    lgColumn: {
      type:Number,
      default:null,
      required:false,
      validator: function(value: Column){
        return (0<value && 13>value)
      },
      description:'Box grid columns - LG Breakpoint',
    },

    // lgColumn, /* 1 -12 */
    // // @Prop()
    xlColumn: {
      type:Number,
      default:null,
      required:false,
      validator: function(value: Column){
        return (0<value && 13>value)
      },
      description:'Box grid columns - LG Breakpoint',
    },

    // xlColumn, /* 1 -12 */
    // // @Prop()
  },
  computed:{
    tagElement () {
      return  ((this as any).as === undefined ?  (this as any).tag : (this as any).as)
    }
  }
}