<template>
  <div id="partialUnits">Partial Units
    <div id="disablingOverlay">Module Incomplete</div>
    <div class="row">
      <div class="col-6">

          <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text inputWidth">Invoice Unit Price</span>
              </div>
              <input type="number"
                      @focus="$event.target.select()"
                      class="form-control"
                      placeholder="Invoice Unit Price"
                      aria-label="Invoice Unit Price"
                      aria-describedby="basic-addon1"
                      v-model="invoiceUnitPrice">

          </div>
          <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text inputWidth">PO Unit Price</span>
              </div>
              <input type="number"
                      @focus="$event.target.select()"
                      class="form-control"
                      placeholder="PO Unit Price"
                      aria-label="Purchase Order Unit Price"
                      aria-describedby="basic-addon1"
                      v-model="poUnitPrice">

          </div>
      </div>

      <div class="col-6">
          Partial unit decimal to receive: <span>{{ partialUnitDecimal }}</span>
          <br>
          Temporary unit price for PO: <span>{{ tempUnitPriceForPO }}</span>
          <br>
          <!-- Per unit extension in Spectrum:  <strong>{{numberWithCommasAndDollarSign(total)}}</strong> -->
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'partialUnits',
    methods: {
      numberWithCommasAndDollarSign (x) {
        if (!x) return
        return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    data () {
      return {
        invoiceUnitPrice: 0,
        poUnitPrice: 0,
        storedPartialUnitDecimal: 0,
        storedTempUnitPriceForPO: 0
      }
    },
    computed: {
      partialUnitDecimal: {
        get () {
          if (!this.invoiceUnitPrice || !this.poUnitPrice) return
          let number = (Number(this.invoiceUnitPrice) / Number(this.poUnitPrice)).toFixed(2)
          console.log('partialUnitDecimal', number)
          console.log('invoiceUnitPrice', this.invoiceUnitPrice)
          console.log('poUnitPrice', this.poUnitPrice)
          return this.numberWithCommasAndDollarSign(number)
        },
        set (value) {
          console.log('partialUnitDecimal2', value)
          this.storedPartialUnitDecimal = value
          console.log('storedPartialUnitDecimal', this.storedPartialUnitDecimal)
        }
      },
      tempUnitPriceForPO: {
        get () {
          if (!this.invoiceUnitPrice || !this.poUnitPrice) return
          let number2 = (Number(this.invoiceUnitPrice) / Number(this.storedPartialUnitDecimal).toFixed(2))
          console.log('tempUnitPriceForPO', number2)
          console.log('storedPartialUnitDecimal', this.storedPartialUnitDecimal)
          return this.numberWithCommasAndDollarSign(number2)
        },
        set (value) {
          console.log('tempUnitPriceForPO', value)
          this.partialUnits.storedTempUnitPriceForPO = value
          console.log('storedTempUnitPriceForPO', this.storedTempUnitPriceForPO)
        }
      }
    }
  }
</script>

<style lang="sass">
    #disablingOverlay
      position: fixed
      z-index: 1
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(0,0,0,0.5)
      font-size: 50px
      text-align: center
      padding-top: 150px     
    .inputWidth
        width: 125px
</style>
