<template lang='pug'>
  .QuestionType.Checkbox
    .QuestionType-container
      .Checkbox-list
        .Checkbox-option(v-for='option, i in question.choices')
          label(for='') {{ option.text[language] }}
          input(type='radio' disabled)
</template>

<script>
export default {
  name: 'QuestionType-Checkbox',
  props: {
    question: Object,
    language: String
  }
}
</script>

<style lang='stylus' scoped>
.Checkbox {}
</style>
