<template>
    <div class="global">
        <nav class="navbar navbar-light bg-light">


            <form class="form-inline">

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                    </div>
                    <input type="text"
                           class="form-control"
                           placeholder="Vendor"
                           aria-label="Vendor"
                           aria-describedby="basic-addon1"
                           v-model="vendor">
                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                    </div>
                    <input type="text"
                           class="form-control"
                           placeholder="Invoice No."
                           aria-label="Invoice Number"
                           aria-describedby="basic-addon1"
                           v-model="invoiceNumber">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                    </div>
                    <input type="number"
                           class="form-control"
                           placeholder="County Tax"
                           aria-label="County Tax"
                           aria-describedby="basic-addon1"
                           v-model="countyTax">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                    </div>
                    <input type="number"
                           class="form-control"
                           placeholder="Subtotal on Invoice"
                           aria-label="Subtotal on Invoice"
                           aria-describedby="basic-addon1"
                           v-model="subtotalOnInvoice">

                </div>

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                    </div>
                    <input type="number"
                           class="form-control"
                           placeholder="Invoice Total"
                           aria-label="Invoice Total"
                           aria-describedby="basic-addon1"
                           v-model="invoiceTotal">
                </div>

            </form>

            Tax Accrual: {{numberWithCommasAndDollarSign(taxAccrual)}} <br>
            Material Adjustment: {{numberWithCommasAndDollarSign(materialAdjustment)}}
        </nav>
    </div>
</template>

<script>
    export default {
      name: 'global',
      methods: {
        numberWithCommasAndDollarSign (x) {
          if (!x) return
          return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      },
      computed: {
        materialAdjustment () {
          return (this.cardTotal - (this.cardSubTotal * 0.06 + Number(this.countyTax))).toFixed(2)
        },
        cardSubTotal () {
          let subTotal = 0
          this.$store.state.UI.entries.forEach(entry => {
            if (!entry.subTotal) return
            subTotal = subTotal + Number(entry.subTotal)
          })
          return subTotal
        },
        cardTotal () {
          let cardTotal = 0
          this.$store.state.UI.entries.forEach(entry => {
            if (!entry.total) return
            cardTotal = cardTotal + Number(entry.total)
          })
          return cardTotal
        },
        taxAccrual () {
          return Math.abs((Number(this.$store.state.UI.globalVariables.invoiceTotal) - Number(this.cardTotal))).toFixed(2)
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

<style lang='sass'>
    .global
        position: fixed
        width: 25%
        height: 100vh
        top: 0
        left: 0

        .navbar
            height: 100vh

        .form-control
            margin-right: 10px
</style>