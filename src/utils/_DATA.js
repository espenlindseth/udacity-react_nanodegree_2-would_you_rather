import ThomYorkeAvatar from '../assets/thomyorke.jpg'
import TomWaitsAvatar from '../assets/tomwaits.jpg'
import NickCaveAvatar from '../assets/nickcave.jpg'

let users = {
  thomyorke: {
    id: 'thomyorke',
    name: 'Thom Yorke',
    avatarURL: ThomYorkeAvatar,
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tomwaits: {
    id: 'tomwaits',
    name: 'Tom Waits',
    avatarURL: TomWaitsAvatar,
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  nickcave: {
    id: 'nickcave',
    name: 'Nick Cave',
    avatarURL: NickCaveAvatar,
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'thomyorke',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['thomyorke'],
      text: 'be a creep',
    },
    optionTwo: {
      votes: [],
      text: 'be a weirdo'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'nickcave',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'let love in',
    },
    optionTwo: {
      votes: ['nickcave', 'thomyorke'],
      text: 'push the sky away'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'thomyorke',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'leave me dry',
    },
    optionTwo: {
      votes: ['thomyorke'],
      text: 'leave me high'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tomwaits',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'sail tonight for singapore',
    },
    optionTwo: {
      votes: ['thomyorke'],
      text: 'get behind the mule'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tomwaits',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tomwaits'],
      text: 'send me blue valentines',
    },
    optionTwo: {
      votes: ['nickcave'],
      text: 'make it rain'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'nickcave',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['nickcave'],
      text: 'sail your ships around me',
    },
    optionTwo: {
      votes: ['tomwaits'],
      text: 'be designed and directed by his red right hand'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }
      
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}