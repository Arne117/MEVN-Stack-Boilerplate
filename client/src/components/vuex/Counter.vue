<template>
  <div>
    <button class="btn btn-primary" @click="increment()">Increment</button>
    <button class="btn btn-primary" @click="decrement(4)">Decrement</button>
  </div>
</template>

<script>
  // sync tasks
  import { mapMutations } from 'vuex'
  // import { stringHelpers } from './stringHelpers'

  export default {
    methods: {
      ...mapMutations([
        'increment',
        'decrement'
      ]),
      other () {
        //
      }
    }
    // For code which should be shared across components to avoid
    // duplications in (methods, computed propertys, data) [Data props are not shared! between components]
    /*
    Mixins are a flexible way to distribute reusable functionalities for Vue components.
    A mixin object can contain any component options. When a component uses a mixin,
    all options in the mixin will be “mixed” into the component’s own options.
    */
    // mixins: [stringHelpers]
  }
</script>
