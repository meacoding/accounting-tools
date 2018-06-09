<template>
  <div id="app">
    
  <div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-secondary active">
      <input  type="radio"
              v-model="tabState"
              value="taxAccrual"
              name="options" 
              id="option1" 
              autocomplete="off" 
              checked> 
              Tax Accrual
    </label>
    <label class="btn btn-secondary">
      <input type="radio"
              v-model="tabState"
              value="partialUnits"
              name="options" 
              id="option"
              autocomplete="off">
              Partial Units
    </label>
  </div>

  <button type="button" @click="print" class="btn btn-primary float-right">Print</button>

    <tax-accrual v-show="tabState === 'taxAccrual'"></tax-accrual>
    <partial-units v-show="tabState === 'partialUnits'"></partial-units>
  </div>
</template>

<script>
  import TaxAccrual from './components/taxAccrual/taxAccrual'
  import PartialUnits from './components/partialUnits/partialUnits'
  import { remote } from 'electron'
  import path from 'path'
  import fs from 'fs'
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
      },
      print () {
        let win = remote.getCurrentWindow()
        let picturesDir = path.join(remote.app.getPath('pictures'), 'screenshot.pdf')
        win.webContents.printToPDF({}, (error, data) => {
          if (error) throw error
          fs.writeFile(picturesDir, data, (error) => {
            if (error) throw error
            console.log('Write PDF successfully.')
          })
        })
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
