<template lang='pug'>
  .QuestionType.Rating
    .QuestionType-container
      .Rating-list
        label.Rating-option(v-for='n in question.rateMax') {{ n }}
        //- StartNode()
</template>

<script>
import StartNode from './helpers/StartNode'

export default {
  name: 'QuestionType-Rating',
  components: {
    StartNode
  },
  props: {
    question: Object,
    language: String
  }
}
</script>

<style lang='stylus' scoped>
.Rating {
  &-list {
    display flex
    flex-direction row
    flex-wrap wrap
    margin .5em 0
  }

  &-option {
    padding .25em .4em
    margin 0

    border 1px solid $darkBlue
    border-right none

    &:last-child {
      border-right 1px solid $darkBlue
    }
  }
}
</style>
