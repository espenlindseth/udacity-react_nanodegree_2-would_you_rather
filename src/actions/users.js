export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER '
export const ADD_QUESTION_RESPONSE_TO_USER = 'ADD_QUESTION_RESPONSE_TO_USER '

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export const addQuestionToUser = (question) => {
  return {
    type: ADD_QUESTION_TO_USER,
    question
  }
}

export const addQuestionResponseToUser = (info) => {
  return {
    type: ADD_QUESTION_RESPONSE_TO_USER,
    authedUser: info.authedUser,
    qid: info.qid,
    answer: info.answer
  }
}