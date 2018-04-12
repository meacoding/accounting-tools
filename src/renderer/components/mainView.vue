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
            background: rgb(255,255,255)
            background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(221,242,255,1) 100%)
            background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(221,242,255,1) 100%)
            background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(221,242,255,1) 100%)
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ddf2ff',GradientType=0 )
            background-size: cover

            button.add
                box-shadow: 0 1px 0 #ccc,
                0 2px 0 #c9c9c9,
                0 3px 0 #bbb,
                0 4px 0 #b9b9b9,
                0 5px 0 #aaa,
                0 6px 1px rgba(0,0,0,.1),
                0 0 5px rgba(0,0,0,.1),
                0 1px 3px rgba(0,0,0,.3),
                0 3px 5px rgba(0,0,0,.2),
                0 5px 10px rgba(0,0,0,.25),
                0 10px 10px rgba(0,0,0,.2),
                0 20px 20px rgba(0,0,0,.15)
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
