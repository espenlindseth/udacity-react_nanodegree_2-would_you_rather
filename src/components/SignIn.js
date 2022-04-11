import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';

function SignIn () {

  const { users } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(name));
  }

  const handleDropdownChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div id="sign-in">
      <h2>Welcome to the Would You Rather app!</h2>
      <p>So happy to see you! Please sign in to continue.</p>
      <form onSubmit={handleSubmit}>
        <select defaultValue={'default'} onChange={handleDropdownChange}>
        <option value="default" disabled>Select a user</option>
        {Object.entries(users).map(([key, value]) => (
            <option key={key} value={value.id}>{value.name}</option>
          ))
        }
        </select>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
