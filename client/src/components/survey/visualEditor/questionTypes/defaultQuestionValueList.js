import { ObjectID } from 'bson'

export default [
  {
    questionsID: new ObjectID().toString(),
    type: 'text',
    name: 'text',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'checkbox',
    name: 'checkbox',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        answerID: new ObjectID().toString(),
        value: 'item1',
        text: {
          de: 'item1'
        }
      },
      {
        answerID: new ObjectID().toString(),
        value: 'item2',
        text: {
          de: 'item2'
        }
      }
    ]
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'radiogroup',
    name: 'radiogroup',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        answerID: new ObjectID().toString(),
        value: 'item1',
        text: {
          de: 'item1'
        }
      },
      {
        answerID: new ObjectID().toString(),
        value: 'item2',
        text: {
          de: 'item2'
        }
      }
    ]
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'dropdown',
    name: 'dropdown',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        answerID: new ObjectID().toString(),
        value: 'item1',
        text: {
          de: 'item1'
        }
      },
      {
        answerID: new ObjectID().toString(),
        value: 'item2',
        text: {
          de: 'item2'
        }
      }
    ]
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'comment',
    name: 'comment',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'rating',
    name: 'rating',
    title: {
      de: 'Ihre Frage hier:'
    },
    rateMax: 7,
    isRequired: true
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'imagepicker',
    name: 'imagepicker',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        value: 'lion',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg',
        answerID: new ObjectID().toString()
      },
      {
        value: 'giraffe',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg',
        answerID: new ObjectID().toString()
      },
      {
        value: 'panda',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg',
        answerID: new ObjectID().toString()
      },
      {
        value: 'camel',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg',
        answerID: new ObjectID().toString()
      }
    ]
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'matrix',
    name: 'matrix',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    columns: [
      'Column 1',
      'Column 2',
      'Column 3'
    ],
    rows: [
      'Row 1',
      'Row 2'
    ]
  },
  {
    questionsID: new ObjectID().toString(),
    type: 'multipletext',
    name: 'multipletext',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    items: [
      {
        name: 'text1',
        answerID: new ObjectID().toString()
      },
      {
        name: 'text2',
        answerID: new ObjectID().toString()
      }
    ]
  }
]
