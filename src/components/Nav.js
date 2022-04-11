import { setAuthedUser } from '../actions/authedUser';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from 'react-router-dom'
import Image from 'react-bootstrap/Image';

function SignIn (props) {

  const dispatch = useDispatch();
  const { authedUser } = useSelector((state) => ({ ...state }))
  const { users } = useSelector((state) => ({ ...state }));

  const location = useLocation();

  const handleSignOut = () => {
    dispatch(setAuthedUser(null));
  }

  return (
    <nav>
      {authedUser && (<>
        <div id="nav-links">
          <span className={(location.pathname === '/') ? 'active': ''}><Link to='/'>ANSWER QUESTION</Link></span>&nbsp;
          <span className={(location.pathname === '/add') ? 'active': ''}><Link to='/add'>ADD QUESTION</Link></span>
          <span className={(location.pathname === '/leaderboard') ? 'active': ''}><Link to='/leaderboard'>LEADERBOARD</Link></span>
        </div>
        <div id="nav-user">
          <Image src={users[authedUser].avatarURL} width="30" height="30" roundedCircle/>
          <span id="nav-user-name">{users[authedUser].name.toUpperCase()}</span>
          <span id="nav-sign-out" onClick={handleSignOut}>SIGN OUT</span>
        </div>
      </>)}
    </nav>
  );
}

export default SignIn;
