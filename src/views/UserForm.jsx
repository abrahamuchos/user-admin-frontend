/**
 * @typedef {Object} ErrorsState
 * @property {string} response
 */
/**
 * @typedef {Object} UserState
 * @property {number} id - User id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} password_confirmation
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from "../axios-client.js";
import handleErrors from "../handleErrors.js";

export default function UserForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {notification, setNotification} = useStateContext();
  /**@type {boolean} **/
  const [loading, setLoading] = useState(false);
  /** @type {ErrorsState} **/
  const [errors, setErrors] = useState({});
  /** @type {UserState} **/
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // To update user
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false);
          setUser(data);
        })
        .catch(err => {
          setLoading(false);
          let getErrors = handleErrors(err);
          if (getErrors.status === 404) {
            navigate('*')
          } else {
            setErrors(getErrors)
          }
        })
    }, [])
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(({data}) => {
          setLoading(false);
          setNotification('User was successfully updated');
          navigate('/users')
        })
        .catch(err => {
          setLoading(false);
          let getErrors = handleErrors(err);
          if (getErrors.status === 404) {
            navigate('*')
          } else {
            setErrors(getErrors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(({data}) => {
          setLoading(false);
          setNotification('User was successfully created');
          navigate('/users');
        })
        .catch(err => {
          setLoading(false);
          let getErrors = handleErrors(err);
          if (getErrors.status === 404) {
            navigate('*')
          } else {
            setErrors(getErrors)
          }
        })
    }
  }

  return (
    <>
      {errors.hasOwnProperty('message') && <div className="alert">
        {errors.message}
      </div>
      }

      {user.id ? (
        <h1>Edit user {user.name}</h1>
      ) : (
        <h1>New user</h1>
      )}
      <div className="card animated fadeIndown">
        {loading && (
          <div className="text-center"> Loading ...</div>
        )}
        {errors.hasOwnProperty('inputError') && <div className="alert">
          {Object.values(errors.inputError).map((row, index) => <p key={index}>{row}</p>)}
        </div>
        }
        {!loading && (
          <form onSubmit={handleSubmit}>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} type='text'
                   placeholder='Full name'/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} type='email'
                   placeholder='Email'/>
            <input onChange={ev => setUser({...user, password: ev.target.value})} type='password'
                   placeholder='Password'/>
            <input
              onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
              type='password'
              placeholder='Password confirmation'
            />
            <button className='btn' onSubmit={handleSubmit}>{user.id ? 'Update' : 'Create'}</button>

          < /form>
        )}
      </div>
    </>
  )
}
