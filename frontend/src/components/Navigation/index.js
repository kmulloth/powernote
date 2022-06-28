import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import NewNotebookModal from '../NewNotebookModal';
import DeleteNotebookModal from '../DeleteNotebookModal';
import { getNotebooks, addNotebook } from '../../store/notebook';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const notebooks = useSelector(state => state.notebook);
  const userNotebooks = Object.values(notebooks).filter(notebook => notebook?.author_id === sessionUser?.id);

  const [showNotebooks, setShowNotebooks] = useState(false);

  useEffect(() => {
      dispatch(getNotebooks());
  }, [dispatch, isLoaded]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <button onClick={() => setShowNotebooks(!showNotebooks)}>Your Notebooks</button>
        {sessionUser && showNotebooks && (
        <div className="notebook-list">
          <NewNotebookModal />
          <ul className="notebooks">
            {userNotebooks.map(notebook => (
              <div key={notebook?.id}>
                <li><NavLink to={`/notebooks/${notebook?.id}`} >{notebook?.title}</NavLink></li>
                <DeleteNotebookModal notebook={notebook} setShowNotebooks={setShowNotebooks}/>
              </div>
            ))}
          </ul>
        </div>
      )}
      </>
    );
  } else {
    sessionLinks = (
      <div id='session-links'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <nav id='navigation'>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
