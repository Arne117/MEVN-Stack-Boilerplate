<template lang='pug'>
  .EndNode(
    v-show='activeStartNode || question.connectedToQuestion'
    @click='connect'
    :class='question.connectedToQuestion ? "connected" : "" '
    :data-questionsID='question.questionsID'
    )
</template>

<script>
export default {
  computed: {
    activeStartNode: {
      set (obj) { this.$store.commit('setActiveStartNode', obj) },
      get () { return this.$store.getters.getActiveStartNode }
    }
  },
  methods: {
    connect () {
      if (this.activeStartNode) {
        console.log(`CONNECT Answer: ${this.activeStartNode.answerID} TO Question: ${this.question.questionsID}`)
        if (typeof this.question.connectedToQuestion !== Array) this.question.connectedToQuestion = [this.activeStartNode.answerID]
        else this.question.connectedToQuestion.push(this.activeStartNode.answerID)
        console.log(this.question)
        console.log(this.activeStartNode)
        this.activeStartNode.leadsToQuestion = this.activeStartNode.answerID
        this.activeStartNode = undefined
      }
    }
  },
  props: {
    question: Object,
    surveyData: Object
  }
}
</script>

<style lang='stylus' scoped>
.EndNode {
  position absolute
  left -8px
  top -7px
  width 15px
  height 15px

  border-radius 50%
  border 5px solid $orange


  &.connected {
    border 5px solid $green
  }
}
</style>
