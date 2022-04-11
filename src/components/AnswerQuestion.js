import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleAnswerQuestion } from '../actions/questions';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.css';
function AnswerQuestion (props) {

  const { users } = useSelector((state) => ({ ...state }));
  const { questions } = useSelector((state) => ({ ...state }));
  const { authedUser } = useSelector((state) => ({ ...state }));
  const { id } = useParams()
  const [ answerSubmitted, setAnswerSubmitted] = useState (false);
  const dispatch = useDispatch();

  useEffect(() => {
    setAnswerSubmitted(false);
  }, []);

  const userLookup = (user_id) => {
    return users[user_id].name;
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(handleAnswerQuestion({qid: id,	authedUser, answer: e.target.id}));
    setAnswerSubmitted(e.target.id);
  }

  const optionOneVotes = questions[id].optionOne.votes.length
  const optionTwoVotes = questions[id].optionTwo.votes.length

  const totalVotes = () => {
    return questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length;
  }

  const votePercentage = (votes) => {
    return (100/totalVotes()*votes).toFixed(0)
  }

  const formatQuestion = (questionStr) => {
    const returnStr = questionStr.charAt(0).toUpperCase() + questionStr.slice(1);
    return returnStr
  }

  const questionAuthor = userLookup(questions[id].author)

  return (
    <div className="wyr-container">
    {!answerSubmitted ? (
        <div id="answer_question">
        <div id="would-you-rather-author" className="linear-background">
          <div id="would-you-rather-author-avatar"><Image src={users[questions[id].author].avatarURL} height="50" width="50" roundedCircle/></div>
          <span>Question by {questionAuthor}</span>
          </div>
        <div id="would-you-rather-title" className="linear-background">Would you Rather...</div>
        <form>
          <div id="form-option-one" className="form-option">
            <label htmlFor="optionOne">{formatQuestion(questions[id].optionOne.text)}</label><br/>
            <button className="vote-button" id="optionOne" onClick={handleClick}>Vote</button>
          </div>
          <div id="form-option-two" className="form-option">
            <label htmlFor="optionTwo">{formatQuestion(questions[id].optionTwo.text)}</label><br/>
            <button className="vote-button" id="optionTwo" onClick={handleClick}>Vote</button>
          </div>
        </form>
        </div>) :
        (<div id="question-response">
            <div className="author">{questionAuthor} asked</div>
            <div className="result">Results</div>
            <div className={`option-box ${(answerSubmitted === "optionOne") ? "selected" : ""}`}>
              <div className="result-title">Would you rather {questions[id].optionOne.text}</div>
              <div className="result-votes">
                <ProgressBar variant="danger" now={votePercentage(optionOneVotes)} label={`${votePercentage(optionOneVotes)}%`} />
                <div className="result-votes-text">{optionOneVotes} of {totalVotes()} votes.</div>
              </div>
              {(answerSubmitted === "optionOne") && (<div className="result-yourvote">YOUR VOTE</div>)}
            </div>

            <div className={`option-box ${(answerSubmitted === "optionTwo") ? "selected" : ""}`}>
              <div className="result-title">Would you rather {questions[id].optionTwo.text}</div>
              <div className="result-votes">
                <ProgressBar variant="danger" now={votePercentage(optionTwoVotes)} label={`${votePercentage(optionTwoVotes)}%`} />
                <div className="result-votes-text">{optionTwoVotes} of {totalVotes()} votes.</div>
              </div>
              {(answerSubmitted === "optionTwo") && (<div className="result-yourvote">YOUR VOTE</div>)}
            </div>
        </div>
        )}
    </div>
  );
}

export default AnswerQuestion;
