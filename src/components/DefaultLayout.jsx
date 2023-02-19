import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";

function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();

  if (!token) {
    return <Navigate to='/login'/>;
  }

  const handleLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then( ()=>{
        setUser({});
        setToken(null);
      });
  }

  /**
   * useEffect hook that make GET request to user auth
   */
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  return (
    <div id='defaultLayout'>
      <aside>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/users'>Users</Link>
      </aside>
      <div className='content'>
        <header>
          <div>Header</div>
          <div>
            {user.name}
          </div>
          <a href="#" onClick={handleLogout} className='btn-logout'>Logout</a>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
