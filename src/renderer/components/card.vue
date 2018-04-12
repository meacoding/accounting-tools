<template>
      <div class="card">
          <button @click="removeEntry">x</button>
        <div class="card-body">
          <div class="row">
            <div class="col-6">

                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Item Quantity</span>
                    </div>
                    <input type="number"
                           class="form-control"
                           placeholder="Quantity"
                           aria-label="Quantity"
                           aria-describedby="basic-addon1"
                           v-model="card.quantity">

                </div>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Item Price</span>
                    </div>
                    <input type="number"
                           class="form-control"
                           placeholder="Price"
                           aria-label="Price"
                           aria-describedby="basic-addon1"
                           v-model="card.price">

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
      if (!this.totalTax || !this.subTotal) return
      let total = (Number(this.totalTax) + Number(this.subTotal)).toFixed(2)
      let obj = {
        index: this.index,
        total
      }
      this.$store.commit('updateTotal', obj)
      return total
    },
    subTotal () {
      if (!this.card.price || !this.card.quantity) return
      let subTotal = (this.card.price * this.card.quantity).toFixed(2)
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
    .content
        .card
            margin: 20px
            border: 0
            box-shadow: 0 3px 8px rgba(0,0,0,.1);

            button.remove
                background-color: red
                color: white
                border-radius: 50%
                height: 50px
                width: 50px
                position: absolute
                border: 2px solid white
                right: -15px
                top: -15px

                &:focus
                    outline: none
</style>