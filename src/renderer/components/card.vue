<template>
      <div class="card">
          <button @click="removeEntry">x</button>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <input type="number"
                class="form-control" 
                placeholder="Quantity" 
                aria-label="Quantity" 
                aria-describedby="basic-addon1"
                v-model="card.quantity">
              <input type="number"
                class="form-control" 
                placeholder="Price" 
                aria-label="Price" 
                aria-describedby="basic-addon1"
                v-model="card.price">
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