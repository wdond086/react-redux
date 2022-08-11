import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './userSlice'

export const UserView = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => {
    return state.users;
  })

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  return (
    <div>
        <h2>List of Users</h2>
        { users.loading && <div>Loading...</div> }
        { !users.loading && users.error ? <div>Error Message: {users.error}</div> : null}
        { !users.loading && users.users.length ? (
          <ul>
            {
              users.users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))
            }
          </ul>
        ) : null}
    </div>
  )
}
