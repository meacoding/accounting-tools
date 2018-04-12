<template>
  <div id="wrapper">
    <global></global>
    <div class="content">

      <card :key="entryIndex" 
      :index="entryIndex"
      :entry="entry" 
      v-for="(entry, entryIndex) in entries"></card>

      <button class="add" @click="addEntry">+</button>
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
    #wrapper
        height: 100vh
        width: 100%
        position: fixed

        .content
            height: 100vh
            overflow-y: auto
            width: 75%
            margin-left: 25%
            float: left
            background: rgb(17,169,226)
            background: -moz-linear-gradient(top, rgba(17,169,226,1) 0%, rgba(41,137,216,1) 100%)
            background: -webkit-linear-gradient(top, rgba(17,169,226,1) 0%,rgba(41,137,216,1) 100%)
            background: linear-gradient(to bottom, rgba(17,169,226,1) 0%,rgba(41,137,216,1) 100%)
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#11a9e2', endColorstr='#2989d8',GradientType=0 )

            background-size: cover

            button.add
                background-color: green
                color: white
                border-radius: 50%
                height: 50px
                width: 50px
                border: 2px solid white
                margin: 40px auto
                display: block

                &:focus
                    outline: none
</style>
