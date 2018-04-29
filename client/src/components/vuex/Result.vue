<template>
  <div class="">
    <p>Counter is: {{ counter }}</p>
    <p>Number of clicks {{ clicks }}</p>
    <p>Searching: {{ searchValue }}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        counter: 'doubleCounter',
        clicks: 'stringCounter',
        searchValue: 'getSearchValue'
      }),
      ownproperty () {}
    }
  }
</script>
