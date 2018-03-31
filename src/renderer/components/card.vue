<template>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
                 <input type="text" 
                    class="form-control" 
                    placeholder="Quantity" 
                    aria-label="Quantity" 
                    aria-describedby="basic-addon1"
                    v-model="card.quantity">

                     <input type="text" 
                    class="form-control" 
                    placeholder="Price" 
                    aria-label="Price" 
                    aria-describedby="basic-addon1"
                    v-model="card.price">
            </div>

            <div class="col-6">
              Total Tax: {{totalTax}}
              Total: {{total}}
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'card',
  props: ['entry', 'index'],
  computed: {
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