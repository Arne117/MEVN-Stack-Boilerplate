<template lang='pug'>
  .QuestionType.Rating
    .QuestionType-container
      .Rating-list
        .Rating-option(v-for='n in question.rateMax')
          label(for='') {{ n }}
          input(type='radio' disabled)
</template>

<script>
export default {
  name: 'QuestionType-Rating',
  props: {
    question: Object,
    language: String
  }
}
</script>

<style lang='stylus' scoped>
</style>
