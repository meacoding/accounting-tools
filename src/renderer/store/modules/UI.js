const state = {
  globalVariables: {
    vendor: '',
    invoiceDate: '',
    invoiceNumber: '',
    subtotalOnInvoice: 0,
    invoiceTotal: 0,
    countyTax: 0.01,
    freight: 0
  },
  entries: [
    {
      quantity: 0,
      price: 0,
      total: 0,
      subTotal: 0,
      totalTax: 0
    }
  ]
}

const mutations = {
  addEntry (state) {
    state.entries.push({
      quantity: 0,
      price: 0,
      total: 0,
      subTotal: 0,
      totalTax: 0
    })
  },
  updateTotal (state, obj) {
    let { index, total } = obj
    state.entries[index].total = total
  },
  updateTotalTax (state, obj) {
    let { index, totalTax } = obj
    state.entries[index].totalTax = totalTax
  },
  updateSubTotal (state, obj) {
    let { index, subTotal } = obj
    state.entries[index].subTotal = subTotal
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
