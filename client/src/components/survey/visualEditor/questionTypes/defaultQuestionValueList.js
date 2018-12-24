import { ObjectID } from 'bson'

export default [
  {
    questionsID: new ObjectID(),
    type: 'text',
    name: 'text',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true
  },
  {
    questionsID: new ObjectID(),
    type: 'checkbox',
    name: 'checkbox',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        answerID: new ObjectID(),
        value: 'item1',
        text: {
          de: 'item1'
        }
      },
      {
        answerID: new ObjectID(),
        value: 'item2',
        text: {
          de: 'item2'
        }
      }
    ]
  },
  {
    questionsID: new ObjectID(),
    type: 'radiogroup',
    name: 'radiogroup',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        answerID: new ObjectID(),
        value: 'item1',
        text: {
          de: 'item1'
        }
      },
      {
        answerID: new ObjectID(),
        value: 'item2',
        text: {
          de: 'item2'
        }
      }
    ]
  },
  {
    questionsID: new ObjectID(),
    type: 'dropdown',
    name: 'dropdown',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    choices: [
      {
        answerID: new ObjectID(),
        value: 'item1',
        text: {
          de: 'item1'
        }
      },
      {
        answerID: new ObjectID(),
        value: 'item2',
        text: {
          de: 'item2'
        }
      }
    ]
  },
  {
    questionsID: new ObjectID(),
    type: 'comment',
    name: 'comment',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true
  },
  {
    questionsID: new ObjectID(),
    type: 'rating',
    name: 'rating',
    title: {
      de: 'Ihre Frage hier:'
    },
    rateMax: 7,
    isRequired: true
  },
  {
    questionsID: new ObjectID(),
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
        answerID: new ObjectID()
      },
      {
        value: 'giraffe',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg',
        answerID: new ObjectID()
      },
      {
        value: 'panda',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg',
        answerID: new ObjectID()
      },
      {
        value: 'camel',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg',
        answerID: new ObjectID()
      }
    ]
  },
  {
    questionsID: new ObjectID(),
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
    questionsID: new ObjectID(),
    type: 'multipletext',
    name: 'multipletext',
    title: {
      de: 'Ihre Frage hier:'
    },
    isRequired: true,
    items: [
      {
        name: 'text1',
        answerID: new ObjectID()
      },
      {
        name: 'text2',
        answerID: new ObjectID()
      }
    ]
  }
]
