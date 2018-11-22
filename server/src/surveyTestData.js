module.exports = [{
  title: 'One',
  id: '1',
  questions: [
    {
      type: 'checkbox',
      name: 'car',
      title: 'What car are you driving?',
      isRequired: true,
      hasNone: true,
      colCount: 4,
      choices: [
        'Ford',
        'Vauxhall',
        'Volkswagen',
        'Nissan',
        'Audi',
        'Mercedes-Benz',
        'BMW',
        'Peugeot',
        'Toyota',
        'Citroen'
      ]
    }
  ]
},
{
  title: 'Two',
  id: '2',
  'elements': [
    {
      'type': 'barrating',
      'name': 'barrating1',
      'ratingTheme': 'fontawesome-stars',
      'title': "Please rate the movie you've just watched",
      'choices': ['1', '2', '3', '4', '5']
    }
  ]
},
{
  title: 'Software developer survey.',
  id: '3',
  pages: [
    {
      title: 'What operating system do you use?',
      questions: [
        {
          type: 'checkbox',
          name: 'opSystem',
          title: 'OS',
          hasOther: true,
          isRequired: true,
          choices: ['Windows', 'Linux', 'Macintosh OSX']
        }
      ]
    }, {
      title: 'What language(s) are you currently using?',
      questions: [
        {
          type: 'checkbox',
          name: 'langs',
          title: 'Plese select from the list',
          colCount: 4,
          isRequired: true,
          choices: [
            'Javascript',
            'Java',
            'Python',
            'CSS',
            'PHP',
            'Ruby',
            'C++',
            'C',
            'Shell',
            'C#',
            'Objective-C',
            'R',
            'VimL',
            'Go',
            'Perl',
            'CoffeeScript',
            'TeX',
            'Swift',
            'Scala',
            'Emacs List',
            'Haskell',
            'Lua',
            'Clojure',
            'Matlab',
            'Arduino',
            'Makefile',
            'Groovy',
            'Puppet',
            'Rust',
            'PowerShell'
          ]
        }
      ]
    }, {
      title: 'Please enter your name and e-mail',
      questions: [
        {
          type: 'text',
          name: 'name',
          title: 'Name:'
        }, {
          type: 'text',
          name: 'email',
          title: 'Your e-mail'
        }
      ]
    }
  ]
}]
