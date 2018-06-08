<template>
  <div id="app">
    <button @click="setTab('taxAccrual')">Tax Accrual</button>
    <button @click="setTab('partialUnits')">Partial Units</button>

    <tax-accrual v-show="tabState === 'taxAccrual'"></tax-accrual>
    <partial-units v-show="tabState === 'partialUnits'"></partial-units>
  </div>
</template>

<script>
  import TaxAccrual from './components/taxAccrual/taxAccrual'
  import PartialUnits from './components/partialUnits/partialUnits'
  export default {
    name: 'AccountingTools',
    components: {PartialUnits, TaxAccrual},
    data () {
      return {
        tabState: 'taxAccrual'
      }
    },
    methods: {
      setTab (tab) {
        this.tabState = tab
      }
    }
  }
</script>

<style lang="sass">
  html, body, #app
    width: 100%
    height: 100%

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button  
    -webkit-appearance: none 
    margin: 0 
</style>
