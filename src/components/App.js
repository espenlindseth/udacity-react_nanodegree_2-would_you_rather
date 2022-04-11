import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { handleInitialData } from '../actions/shared'
import '../App.css';
import Spinner from './Spinner';
import Nav from './Nav';
import SignIn from './SignIn';
import QuestionsPage from './QuestionsPage';
import AddQuestion from './AddQuestion';
import AnswerQuestion from './AnswerQuestion';
import Leaderboard from './Leaderboard';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const { authedUser } = useSelector((state) => ({ ...state }));
  const { spinner } = useSelector((state) => ({ ...state }));
  return (
    <BrowserRouter>
      <div id="App">
        <Nav/>
        <main>
        {(spinner) ? <Spinner/> :
        <>{authedUser ?
          <Routes>
          <Route path='/' exact element={<QuestionsPage/>} />
          <Route path='/questions/:id' element={<AnswerQuestion/>} />
          <Route path='/add' element={<AddQuestion/>} />
          <Route path='/leaderboard' element={<Leaderboard/>} />
        </Routes>
        : <SignIn/> }</>}
      </main>
      </div>
    </BrowserRouter>
  );
}

export default connect()(App)