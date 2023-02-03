import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to='/login' />;
  }

  const handleLogout = (e) =>{
    e.preventDefault();
  }

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
            <Outlet />
          </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
