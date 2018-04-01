<template>
  <div id="wrapper">
    <global></global>
    <div class="content">

      <card :key="entryIndex" 
      :index="entryIndex"
      :entry="entry" 
      v-for="(entry, entryIndex) in entries"></card>

      <button @click="addEntry">+</button>
    </div>
  </div>
</template>

<script>
  import global from './global'
  import card from './card'
  export default {
    name: 'mainView',
    components: {
      global,
      card
    },
    methods: {
      addEntry () {
        this.$store.commit('addEntry')
      }
    },
    computed: {
      vendor () {
        return this.$store.state.UI.globalVariables.vendor
      },
      entries () {
        return this.$store.state.UI.entries
      }
    }
  }
</script>

<style lang="sass">
  .content
    width: calc(75% - 25px)
    margin-left: calc(25% + 25px)
    float: left
</style>
