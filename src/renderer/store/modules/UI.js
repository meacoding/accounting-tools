const state = {
  globalVariables: {
    vendor: '',
    invoiceDate: '',
    invoiceNumber: '',
    subtotalOnInvoice: '',
    taxOnInvoice: ''
  },
  entries: [
    {
      quantity: 300,
      price: 0
    }
  ]
}

const mutations = {
  setGlobalVariables (state, obj) {
    let { value, name } = obj
    state.globalVariables[name] = value
  }
}

export default {
  state,
  mutations
}
