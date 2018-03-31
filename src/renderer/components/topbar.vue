<template>
    <div class="topbar">
        <nav class="navbar navbar-light bg-light">
            <form class="form-inline">
                <div class="input-group">
                    <input type="text" 
                    class="form-control" 
                    placeholder="Vendor" 
                    aria-label="Vendor" 
                    aria-describedby="basic-addon1"
                    v-model="vendor">

                    <input type="text" 
                    class="form-control" 
                    placeholder="Invoice No." 
                    aria-label="Invoice Number" 
                    aria-describedby="basic-addon1"
                    v-model="invoiceNumber">

                    <input type="text" 
                    class="form-control" 
                    placeholder="Invoice Date" 
                    aria-label="Invoice Date" 
                    aria-describedby="basic-addon1"
                    v-model="invoiceDate">

                    <input type="text" 
                    class="form-control" 
                    placeholder="Subtotal on Invoice" 
                    aria-label="Subtotal on Invoice" 
                    aria-describedby="basic-addon1"
                    v-model="subtotalOnInvoice">

                    <input type="text" 
                    class="form-control" 
                    placeholder="Tax on Invoice" 
                    aria-label="Tax on Invoice" 
                    aria-describedby="basic-addon1"
                    v-model="taxOnInvoice">

                </div>
            </form>
        </nav>
    </div>
</template>

<script>
    export default {
      name: 'topbar',
      computed: {
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
        taxOnInvoice: {
          get () {
            return this.$store.state.UI.globalVariables.taxOnInvoice
          },
          set (value) {
            let obj = {
              value,
              name: 'taxOnInvoice'
            }
            this.$store.commit('setGlobalVariables', obj)
          }
        }
      }
    }
</script>

<style lang='sass'>
    .topbar 
        position: absolute
        width: 100%
        top: 0
        left: 0

        .form-control
            margin-right: 10px
</style>