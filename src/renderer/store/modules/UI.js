const state = {
  globalVariables: {
    vendor: '',
    invoiceDate: '',
    invoiceNumber: '',
    subtotalOnInvoice: '',
    invoiceTotal: '',
    countyTax: 0.01
  },
  entries: [
    {
      quantity: 0,
      price: 0,
      total: 0,
      subtotal: 0
    }
  ]
}

const mutations = {
  addEntry (state) {
    state.entries.push({
      quantity: 0,
      price: 0,
      total: 0,
      subtotal: 0
    })
  },
  updateTotal (state, obj) {
    let { index, total } = obj
    state.entries[index].total = total
    // let replacement = Object.assign({}, state.entries[index])
    // state.entries.splice(index, 1, replacement)
  },
  updateSubTotal (state, obj) {
    let { index, subTotal } = obj
    state.entries[index].subTotal = subTotal
    // let replacement = Object.assign({}, state.entries[index])
    // state.entries.splice(index, 1, replacement)
  },
  removeEntry (state, index) {
    state.entries.splice(index, 1)
  },
  setGlobalVariables (state, obj) {
    let { value, name } = obj
    state.globalVariables[name] = value
  }
}

export default {
  state,
  mutations
}
