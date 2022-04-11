import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Question (props) {

  const { users } = useSelector((state) => ({ ...state }));
  const { questions } = useSelector((state) => ({ ...state }));

  const userLookup = (user_id) => {
    return users[user_id].name;
  }

  const formatQuestion = (questionStr) => {
    const returnStr = questionStr.charAt(0).toUpperCase() + questionStr.slice(1);
    return returnStr.substring(0, 20)
  }
  
  const authorName = userLookup(questions[props.id].author)
  const avatar = users[questions[props.id].author].avatarURL

  return (
    <>
      <div className="question-name">Question by {authorName}</div>
        <div className="question">
        <div className="question-avatar"><img width="85" height="85" src={avatar}/></div>
        <div className="question-content">
          <div className="question-header">Would you rather</div>
          <div className="question-preview">{formatQuestion(questions[props.id].optionOne.text)}...</div>
          <div className="question-btn"><Link to={`/question/${props.id}`}>Answer Now</Link></div>
        </div>
      </div>
    </>
  );
}

export default Question;
