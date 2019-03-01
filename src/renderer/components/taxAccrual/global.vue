<template>
    <div class="global">
        <div id="enterKey">

            <form>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text inputWidth" id="inputGroup-sizing-sm">Vendor</span>
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
                        <span class="input-group-text inputWidth" id="inputGroup-sizing-sm">Invoice No.</span>
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
                        <span class="input-group-text inputWidth" id="inputGroup-sizing-sm">FL County Tax %</span>
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
                        <span class="input-group-text inputWidth" id="inputGroup-sizing-sm">Invoice Subtotal</span>
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
                        <span class="input-group-text inputWidth" id="inputGroup-sizing-sm">Freight</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="Freight"
                           aria-describedby="basic-addon1"
                           v-model="freight"
                           focus="focused['4']" 
                           v-on:keyup.enter="changeFocus(5, 4)">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text inputWidth" id="inputGroup-sizing-sm">Invoice Total</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder=""
                           aria-label="Invoice Total"
                           aria-describedby="basic-addon1"
                           v-model="invoiceTotal"
                           focus="focused['5']" 
                           v-on:keyup.enter="changeFocus(0, 5)">
                </div>

            </form>
            
            <div class="bottomElement">
                <div class="flex-global">
                  <div>Tax Accrual:</div> <div :class="{red:taxAccrual<0, green:taxAccrual>0}">{{numberWithCommasAndDollarSign(taxAccrual)}}</div>
                </div>
                <div class="flex-global">
                  <div>Mat'l ADJ:</div> <div :class="{red:materialAdjustment<0, green:materialAdjustment>0}">{{numberWithCommasAndDollarSign(materialAdjustment)}}</div>
                </div>
                <div class="flex-global">
                  <div>Total Before Tax:</div> <div>{{numberWithCommasAndDollarSign(totalBeforeTax)}}</div> 
                </div>
                <div class="flex-global">
                  <div>Total Tax Per PO:</div> <div>{{numberWithCommasAndDollarSign(totalTaxPerPO)}}</div>
                </div>
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
            '4': false,
            '5': false
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
          return (Number(this.invoiceTotal) - Number(this.cardTotal) - Number(this.freight)).toFixed(2)
        },
        materialAdjustment () {
          return (Number(this.cardTotal - (this.cardSubTotal * (1.06 + Number(this.countyTax))))).toFixed(2)
        },
        totalBeforeTax () {
          return ((Number(this.invoiceTotal) - (this.cardSubTotal * (0.06 + Number(this.countyTax))))).toFixed(2)
        },
        totalTaxPerPO () {
          return ((this.cardSubTotal) * (0.06 + Number(this.countyTax))).toFixed(2)
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
        },
        freight: {
          get () {
            return this.$store.state.UI.globalVariables.freight
          },
          set (value) {
            let obj = {
              value,
              name: 'freight'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        }
      }
    }
</script>

<style lang="sass">

    .global
        color: white
        padding-top: 30px
        width: 30%
        padding-right: 10px
        padding-left: 20px
        height: calc(100vh - 39px)
        bottom: 0
        background-color: #2d3945
        left: 0

        .box
            padding: 20px

        .navbar
            height: 100vh
            padding: 20px
            background: rgb(17,169,226)

        .inputWidth
            width: 125px

        .green
            color: lightgreen

        .red
            color: #fb9a9a

        .form-control
            margin-right: 10px
            color: white
            text-align: right

        .form-inline
            top: 30px
            position: absolute

            .input-group
                width: 100%
        
        .input-group-text
            background-color: white
            color: black

        .flex-global
            display: flex
            align-content: center
            justify-content: space-between
            width: 95%
            padding: 5px 0
            border-bottom: 1px solid #999

        .bottomElement
            margin-top: 50px
            color: #dee2e6
</style>