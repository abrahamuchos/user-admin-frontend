import { useEffect, useState } from "react";
import {useStateContext} from '../contexts/ContextProvider';
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
        console.error(err.response)
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
        console.error(err.response)
      })
  }

  return (
    <>
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
          {users.map((user) => (<tr key={user.id}>
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