<template lang='pug'>
  .StartNode(
    @click='connect(option.answerID)'
    :class='activeStartNode ===  option.answerID ? "active" : "" '
    )
    .StartNode-inner
</template>

<script>
export default {
  computed: {
    activeStartNode: {
      set (id) {
        this.$store.commit('setActiveStartNode', id)
      },
      get () {
        return this.$store.getters.getActiveStartNode
      }
    }
  },
  methods: {
    connect (id) {
      console.log(id)
      this.activeStartNode = id
    }
  },
  props: {
    option: Object
  }
}
</script>

<style lang='stylus'>
.StartNode {
  position relative
  width 12px
  height 12px

  border-radius 50%
  border 1px solid $darkBlue

  &.active {
    border 1px solid $orange
    .StartNode-inner {
      border 1px solid $orange
    }
  }

  &-inner {
    width 8px
    height 8px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

    border-radius 50%
    border 1px solid $darkBlue
  }
}
</style>
