<template>
    <div class="global">
        <div class="threeDText">
            <div class="box">
                Accounting Tools
            </div>
        </div>
        <div id="enterKey">

            <form>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Vendor</span>
                    </div>
                    <input type="text"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="Vendor"
                           aria-describedby="basic-addon1"
                           v-model="vendor"
                           focus="focused['0']" 
                           v-on:keyup.enter="changeFocus(1, 0)">
                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Invoice No.</span>
                    </div>
                    <input type="text"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="Invoice Number"
                           aria-describedby="basic-addon1"
                           v-model="invoiceNumber"
                           focus="focused['1']" 
                           v-on:keyup.enter="changeFocus(2, 1)">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">FL County Tax %</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="County Tax"
                           aria-describedby="basic-addon1"
                           v-model="countyTax"
                           focus="focused['2']" 
                           v-on:keyup.enter="changeFocus(3, 2)">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Invoice Subtotal</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="Invoice Subtotal"
                           aria-describedby="basic-addon1"
                           v-model="subtotalOnInvoice"
                           focus="focused['3']" 
                           v-on:keyup.enter="changeFocus(4, 3)">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Invoice Total</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="Invoice Total"
                           aria-describedby="basic-addon1"
                           v-model="invoiceTotal"
                           focus="focused['4']" 
                           v-on:keyup.enter="changeFocus(0, 4)">
                </div>

            </form>
            <div class="bottomElement">
                Tax Accrual: <span :class="{red:taxAccrual<0, green:taxAccrual>0}">{{numberWithCommasAndDollarSign(taxAccrual)}}</span> <br>
                Mat'l ADJ: <span :class="{red:materialAdjustment<0, red:materialAdjustment>0}">{{numberWithCommasAndDollarSign(materialAdjustment)}}</span>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
      name: 'global',
      data () {
        return {
          focused: {
            '0': false,
            '1': false,
            '2': false,
            '3': false,
            '4': false
          }
        }
      },
      methods: {
        numberWithCommasAndDollarSign (x) {
          if (!x) return '$0.00'
          return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        changeFocus (bringInFocus, removeFocus) {
          console.log('hi')
          if (bringInFocus) this.focused[bringInFocus] = true
          this.focused[removeFocus] = false
          console.log('bye')
        }
      },
      computed: {
        taxAccrual () {
          return (Number(this.$store.state.UI.globalVariables.invoiceTotal) - Number(this.cardTotal)).toFixed(2)
        },
        materialAdjustment () {
          console.log('cardTotal', this.cardTotal)
          console.log('cardSubtotal', this.cardSubTotal)
          return (Number(this.cardTotal - (this.cardSubTotal * (1.06 + Number(this.countyTax))))).toFixed(2)
        },
        cardTotal () {
          let cardTotal = 0
          this.$store.state.UI.entries.forEach(entry => {
            if (!entry.total) return
            cardTotal = cardTotal + Number(entry.total)
          })
          return cardTotal
        },
        cardSubTotal () {
          let cardSubTotal = 0
          this.$store.state.UI.entries.forEach(entry => {
            if (!entry.subTotal) return
            cardSubTotal = cardSubTotal + Number(entry.subTotal)
          })
          return cardSubTotal
        },
        countyTax: {
          get () {
            return this.$store.state.UI.globalVariables.countyTax
          },
          set (value) {
            let obj = {
              value,
              name: 'countyTax'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        },
        vendor: {
          get () {
            return this.$store.state.UI.globalVariables.vendor
          },
          set (value) {
            let obj = {
              value,
              name: 'vendor'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        },
        invoiceNumber: {
          get () {
            return this.$store.state.UI.globalVariables.invoiceNumber
          },
          set (value) {
            let obj = {
              value,
              name: 'invoiceNumber'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        },
        invoiceDate: {
          get () {
            return this.$store.state.UI.globalVariables.invoiceDate
          },
          set (value) {
            let obj = {
              value,
              name: 'invoiceDate'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        },
        subtotalOnInvoice: {
          get () {
            return this.$store.state.UI.globalVariables.subtotalOnInvoice
          },
          set (value) {
            let obj = {
              value,
              name: 'subtotalOnInvoice'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        },
        invoiceTotal: {
          get () {
            return this.$store.state.UI.globalVariables.invoiceTotal
          },
          set (value) {
            let obj = {
              value,
              name: 'invoiceTotal'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        }
      }
    }
</script>

<style lang="sass">
    @media screen and (min-width: 1155px)
        .threeDText
            font-size: 18pt !important

    .printBtn
        z-index: 9
        position: fixed
    .global
        position: fixed
        width: 25%
        height: calc(100vh - 50px)
        top: 50px
        left: 0

        .box
            // border: 1px solid white
            padding: 20px

        .threeDText
            border-bottom: 1px solid white
            padding: 20px
            font: bold 100px/1 "Helvetica Neue", Helvetica, Arial, sans-serif
            text-align: center
            font-size: 13pt
            background-color: #11a9e2
            color: white
            // background-color: #2989D8
            // text-shadow: 0 1px 0 #ccc,
            // 0 2px 0 #c9c9c9,
            // 0 3px 0 #bbb,
            // 0 4px 0 #b9b9b9,
            // 0 5px 0 #aaa,
            // 0 6px 1px rgba(0,0,0,.1),
            // 0 0 5px rgba(0,0,0,.1),
            // 0 1px 3px rgba(0,0,0,.3),
            // 0 3px 5px rgba(0,0,0,.2),
            // 0 5px 10px rgba(0,0,0,.25),
            // 0 10px 10px rgba(0,0,0,.2),
            // 0 20px 20px rgba(0,0,0,.15)

        .navbar
            height: 100vh
            padding: 20px
            background: rgb(17,169,226)
            background: -moz-linear-gradient(top, rgba(17,169,226,1) 0%, rgba(41,137,216,1) 100%)
            background: -webkit-linear-gradient(top, rgba(17,169,226,1) 0%,rgba(41,137,216,1) 100%)
            background: linear-gradient(to bottom, rgba(17,169,226,1) 0%,rgba(41,137,216,1) 100%)
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#11a9e2', endColorstr='#2989d8',GradientType=0 )

            .bottomElement
                padding: 10px
                background-color: white
                width: 19%
                border-radius: 6px
                position: fixed
                bottom: 25px
                left: 3%
                box-shadow: 0 1px 0 #ccc,
                0 2px 0 #c9c9c9,
                0 3px 0 #bbb,
                0 4px 0 #b9b9b9,
                0 5px 0 #aaa,
                0 6px 1px rgba(0,0,0,.1),
                0 0 5px rgba(0,0,0,.1),
                0 1px 3px rgba(0,0,0,.3),
                0 3px 5px rgba(0,0,0,.2),
                0 5px 10px rgba(0,0,0,.25),
                0 10px 10px rgba(0,0,0,.2),
                0 20px 20px rgba(0,0,0,.15)

        .green
            color: green

        .red
            color: red

        .form-control
            margin-right: 10px

        .form-inline
            top: 30px
            position: absolute

            .input-group
                width: 100%
</style>