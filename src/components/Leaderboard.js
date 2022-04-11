import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';

function Leaderboard () {
  const { users } = useSelector((state) => ({ ...state }));

  const formatUsers = (usersObj) => {
    let returnArr = []
    Object.entries(usersObj).map(([key, value]) => {
      const answerCount = Object.keys(value.answers).length;
      const questionCount = value.questions.length;
      returnArr.push({
        id: value.id,
        name: value.name,
        avatarURL: value.avatarURL,
        answerCount: answerCount,
        questionCount: questionCount,
        score: answerCount+questionCount
      })
    })
    return returnArr
  }

  const formattedUsers = formatUsers(users).sort((a, b) => { 
    return b.score - a.score;
  });

  return (
    <div className="wyr-container">
      <div id="leaderboard">
        <h3>Leaderboard</h3>
        {Object.entries(formattedUsers).map(([key, user]) => (
            <div className="leaderboard-item" key={key}>
              <div className="leaderboard-avatar">
                <Image width="50" height="50" src={user.avatarURL} roundedCircle/>
              </div>
              <div className="leaderboard-info">
                <div className="leaderboard-name">{user.name}</div>
                <div className="leaderboard-answered">Answered Questions: {user.answerCount}</div>
                <div className="leaderboard-created">Created Questions: {user.questionCount}</div>
              </div>
              <div className="leaderboard-score">
                <div>Score: {user.score}</div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
