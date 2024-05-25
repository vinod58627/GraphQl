import React, { useEffect } from 'react'
import { fetchUser } from '../ReduxFiles/Reeducers/UserReducer';
import { useSelector, useDispatch } from 'react-redux';

const About = () => {
  
  let dispatch = useDispatch()
  const users = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  console.log("user", users)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  return (
    <div>About Me!
       {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  )
}

export default About