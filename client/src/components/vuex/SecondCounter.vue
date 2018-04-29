<template>
    <div>
        <!-- asyncIncrement({by: 10, duration: 500}) // Multiple parameters in on object -->
        <button class="btn btn-primary" @click="asyncIncrement({by: 10, duration: 500})">async Increment</button>
        <button class="btn btn-primary" @click="asyncDecrement">async Decrement</button>
    </div>
</template>

<script>
  // async tasks
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions([
        'asyncIncrement',
        'asyncDecrement'
      ]),
      other () {
          //
      }
    }
  }
</script>
