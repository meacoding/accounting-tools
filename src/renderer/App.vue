<template>
  <div id="app">
  <div class="topBar">
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary" for="option1">
        <input  type="radio"
                v-model="tabState"
                value="taxAccrual"
                id="option1"
                autocomplete="off"
                >
        Tax Accrual
      </label>
      <label class="btn btn-secondary" for="option2">
        <input type="radio"
               v-model="tabState"
               value="partialUnits"
               id="option2"
               autocomplete="off"
               >
        Partial Units
      </label>
    </div>

    <button type="button" @click="print" class="btn btn-primary float-right">Print</button>
  </div>


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
    background: url(/static/back.jpg) no-repeat center center fixed
    background-size: cover

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button  
    -webkit-appearance: none 
    margin: 0

  .form-control
    color: white
    background-color: rgba(255,255,255,0.2)

  .topBar
    border-bottom: 1px solid #ced4da
    background-color: rgba(0, 0, 0, 0.5)

    .btn
        border-radius: 0 !important

    .btn-group-toggle > .btn input[type="radio"]
        position: static

    .btn-secondary
      border: none
      height: 38px
      background-color: transparent
    
</style>
