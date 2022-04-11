import { saveQuestionAnswer, saveQuestion} from '../utils/api';
import { addQuestionResponseToUser, addQuestionToUser } from './users';
import { spinner } from './spinner'
import { questionAnswer } from './shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  } 
}

const answerQuestion = ({ authedUser, qid, answer }) => {
	return {
		type: ADD_QUESTION_ANSWER,
		qid,
		authedUser,
		answer,
	};
};

export const handleAnswerQuestion = info => {
	return (dispatch) => {
    dispatch(spinner(true));
    dispatch(questionAnswer(info.answer));
    saveQuestionAnswer(info)
    .then(() => {
      dispatch(answerQuestion(info));
      dispatch(addQuestionResponseToUser(info))
    }).then(() => {
      dispatch(spinner(false));
    })
		return saveQuestionAnswer(info).catch(() => {
			alert('We could not handle your request to respond to this question. It is unfortunate.');
		});
	};
};

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question
  };
}

export const handleAddQuestion = (authedUser, optionOne, optionTwo) => {
  return (dispatch) => {
    dispatch(spinner(true));
    return saveQuestion ({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    })
    .then((question) => {
      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(question))
      dispatch(spinner(false));
    })
    .catch(() => {
      alert('Adding a question failed. Life is like that sometimes.')
    })
  }
}
