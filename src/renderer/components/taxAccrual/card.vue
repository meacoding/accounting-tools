<template>
      <div class="card">
        <span class="remove" @click="removeEntry">&times;</span>
        <div class="card-body">
          <div class="row">
            <div class="col-6">

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text inputWidth">Item Quantity</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder="Quantity"
                           aria-label="Quantity"
                           aria-describedby="basic-addon1"
                           v-model="card.quantity">

                </div>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text inputWidth">Item Price</span>
                    </div>
                    <input type="number"
                           @focus="$event.target.select()"
                           class="form-control"
                           placeholder="Price"
                           aria-label="Price"
                           aria-describedby="basic-addon1"
                           v-model="card.price">

                </div>
            </div>

            <div class="col-6 card-totals">
              <div class="flex-card">  
                <div>Subtotal:</div> <div>{{numberWithCommasAndDollarSign(subTotal)}}</div>
              </div>
              <div class="flex-card">
                <div>Total Tax:</div> <div>{{numberWithCommasAndDollarSign(totalTax)}}</div>
              </div>
              <div class="flex-card">
                <div>Total:</div> <div>{{numberWithCommasAndDollarSign(total)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'card',
  props: ['entry', 'index'],
  methods: {
    removeEntry () {
      this.$store.commit('removeEntry', this.index)
    },
    numberWithCommasAndDollarSign (x) {
      if (!x) return
      return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    total () {
      if (!this.card.totalTax || !this.card.subTotal) return
      let total = (Number(this.card.totalTax) + Number(this.card.subTotal)).toFixed(2)
      let obj = {
        index: this.index,
        total
      }
      this.$store.commit('updateTotal', obj)
      return total
    },
    subTotal () {
      if (!this.card.price || !this.card.quantity) return
      let subTotal = (Number(this.card.price * this.card.quantity)).toFixed(2)
      let obj = {
        index: this.index,
        subTotal
      }
      this.$store.commit('updateSubTotal', obj)
      return subTotal
    },
    totalTax () {
      if (!this.card.price || !this.card.quantity || !this.countyTax) return
      let totalTax = (this.card.price * this.card.quantity * (0.06 + this.countyTax)).toFixed(2)
      if (this.card.price >= 5000) totalTax = ((this.card.price * this.card.quantity * 0.06) + (5000 * this.card.quantity * this.countyTax)).toFixed(2)
      let obj = {
        index: this.index,
        totalTax
      }
      this.$store.commit('updateTotalTax', obj)
      return totalTax
    },
    countyTax () {
      return Number(this.$store.state.UI.globalVariables.countyTax)
    },
    card: {
      get () {
        return this.entry
      },
      set () {
        let obj = {
          entry: this.entry,
          index: this.index
        }
        this.$state.commit('setEntry', obj)
      }
    }
  }
}
</script>

<style lang="sass">
        .card
            display: flex
            justify-content: space-between
            flex-direction: row-reverse
            color: black
            margin: 30px 75px
            border: 1px solid #ced4da

            .card-body
                padding: 1.25rem 1.25rem 0.25rem

            .remove
                color: #aaa;
                align-self: right;
                font-size: 28px;
                font-weight: bold;
                width: 35px;
                margin-left: auto;
                &:hover, &:active
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                  
        .inputWidth
            width: 125px

        .form-control
            color: black
            &:focus
                color: black
        
        .flex-card
            display: flex
            align-content: center
            justify-content: space-between
            width: 85%
            color: #999
        
</style>