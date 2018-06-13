<template>
  <div id="partialUnits">Partial Units
    <!-- <div class="card">
      <div class="card-body"> -->
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
                          v-model="invoiceUP">

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
                          v-model="poUP">

              </div>
          </div>

          <div class="col-6">
              Total Tax: <strong>{{numberWithCommasAndDollarSign(totalTax)}}</strong>
              <br>
              Sub Total: <strong>{{numberWithCommasAndDollarSign(subTotal)}}</strong>
              <br>
              Total:  <strong>{{numberWithCommasAndDollarSign(total)}}</strong>
          </div>
        </div>
      </div>
    <!-- </div>
  </div> -->
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
    computed: {
      total () {
      },
      subTotal () {
      },
      totalTax () {
      }
    }
  }
</script>

<style lang="sass">
    .content
      color: black
      border: 1px solid #ced4da
      background-color: rgba(0, 46, 103, 0.3)       
    .inputWidth
        width: 125px
</style>
