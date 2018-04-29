<template>
  <div>
    <input type="text" name="searchValue" v-model='searchValue'>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      // ...mapGetters({
      //   searchValue: 'getSearchValue'
      // })
      searchValue: {
        get () {
          return this.$store.getters.getSearchValue
        },
        set (val) {
          this.$store.dispatch('setSearchValue', val)
          // mapMutations({
          //   searchValue: 'setSearchValue'
          // })
        }
      }
    },
    methods: {
      // ...mapMutations({
      //   searchValue: 'setSearchValue'
      // })
    }
  }
</script>
