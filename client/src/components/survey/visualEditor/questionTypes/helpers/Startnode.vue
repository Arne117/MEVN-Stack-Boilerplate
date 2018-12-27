<template lang='pug'>
  .StartNode(
    @click='activeStartNode = option'
    :class='[activeStartNode ? activeStartNode.answerID ===  option.answerID ? "active" : "" : "", option.leadsToQuestion ? "connected" : "" ]'
    :data-answerID='option.answerID'
    )
    .StartNode-inner
</template>

<script>
export default {
  computed: {
    activeStartNode: {
      set (obj) { this.$store.commit('setActiveStartNode', obj) },
      get () { return this.$store.getters.getActiveStartNode }
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

  &.connected {
    border 1px solid $green
    .StartNode-inner {
      border 1px solid $green
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
