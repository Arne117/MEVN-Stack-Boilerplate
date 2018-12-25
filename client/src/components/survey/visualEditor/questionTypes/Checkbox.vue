<template lang='pug'>
  .QuestionType.Checkbox
    .QuestionType-container
      .Checkbox-list
        .Checkbox-option(v-for='option, i in question.choices')
          div
            input(type='radio' disabled)
            label(for='') {{ option.text[language] }}
          StartNode(v-bind='{ option: option }')
</template>

<script>
import StartNode from './StartNode'

export default {
  name: 'QuestionType-Checkbox',
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
.Checkbox {
  width 100%

  &-option {
    display flex
    align-items baseline
    justify-content space-between

    input {
      margin-right .5em
    }
  }
}
</style>
