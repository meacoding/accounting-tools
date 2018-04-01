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
            background: url(/static/back.jpg) no-repeat center center fixed
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
