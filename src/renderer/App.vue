<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'AccountingTools'
  }
</script>

<style lang="sass">
  html, body, #app
    width: 100%
    height: 100%

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button  
    -webkit-appearance: none 
    margin: 0 
</style>
