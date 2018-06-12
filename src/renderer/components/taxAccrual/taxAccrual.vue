<template>
  <div id="wrapper">
    <global></global>
    <div class="content">
      <transition-group name="list-item" class="list__ul">
        <card :key="entryIndex"
        :index="entryIndex"
        :entry="entry"
        v-for="(entry, entryIndex) in entries"></card>
      </transition-group>

      <button class="add" @click="addEntry">+</button>
    </div>
  </div>
</template>
<script>
  import global from './global'
  import card from './card'
  import { focus } from 'vue-focus'

  export default {
    name: 'TaxAccrual',
    // directives: { focus },
    components: {
      focus,
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

        .list-item-enter-active, .list-item-leave-active
            transition: opacity 0.3s, transform 0.3s
            transform-origin: left center

        .list-item-enter, .list-item-leave-to
            opacity: 0
            transform: scale(0.5)

        .list__ul
            list-style-type: none
            margin: 0
            padding: 0

        .list__input
            display: flex
            margin-bottom: 0.5em

        .list__item
            display: block
            margin-bottom: 0.25em


        .content
            height: 100vh
            overflow-y: auto
            width: 72%
            margin-left: 28%
            float: left
            background-size: cover

            button.add
                background-color: green
                color: white
                border-radius: 50%
                height: 50px
                width: 50px
                border: 1px solid #ced4da
                margin: 40px auto
                display: block

                &:focus
                    outline: none
</style>
