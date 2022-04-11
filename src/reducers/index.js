import { combineReducers} from 'redux'
import authedUser from './authedUser'
import users from './users'
import questions from './questions'
import spinner from './spinner'

import { QUESTION_ANSWER } from '../actions/shared'
export function questionAnswer (state = null, action) {
  switch (action.type) {
    case QUESTION_ANSWER :
      return action.answer;
    default :
    return state;
  }
}

export default combineReducers({
  authedUser,
  users,
  questions,
  spinner,
  questionAnswer
});
