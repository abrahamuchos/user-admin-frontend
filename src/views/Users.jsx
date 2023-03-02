/**
 * @typedef {Object} ErrorsState
 * @property {string|Object} response
 */
import React, { useEffect, useState } from "react";
import {useStateContext} from '../contexts/ContextProvider';
import axiosClient from "../axios-client.js";
import { Link, useNavigate } from "react-router-dom";
import handleErrors from "../handleErrors.js";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  /** @type ErrorsState**/
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch((err) => {
        setLoading(false);
        let getErrors = handleErrors(err);
        if (getErrors.status === 404) {
          navigate('*')
        } else {
          setErrors(getErrors)
        }
      })
  }

  const onDelete = (id) => {
    if (!window.confirm('Do you delete this user?')) {
      return
    }
    setLoading(true);
    axiosClient.delete(`/users/${id}`)
      .then(data => {
        setNotification('User was delete')
        getUsers();
      })
      .catch((err) => {
        setLoading(false);
        let getErrors = handleErrors(err);
        if (getErrors.status === 404) {
          navigate('*')
        } else {
          setErrors(getErrors)
        }
      })
  }



  return (
    <>
      {errors.hasOwnProperty('message') && <div className="alert">
        {errors.message}
      </div>
      }
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Users</h1>
        <Link to='/users/new' className='btn-add'>Add new</Link>
      </div>
      <div className="animated card fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading && <tbody>
          <tr>
            <td colSpan='5' className='text-center'>Loading ...</td>
          </tr>
          </tbody>
          }
          {!loading && <tbody>
          {users && users.map((user) => (<tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
                <Link to={`/users/${user.id}`} className='mr-3 btn-edit'>Edit</Link>
                <button onClick={ev => onDelete(user.id)} className="btn-delete">Delete</button>
              </td>
            </tr>))}

          </tbody>}
        </table>
      </div>
    </>
  );
}