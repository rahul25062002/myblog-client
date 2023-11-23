import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {

  const location = useLocation();
  const navigate = useNavigate();
  const def = location.pathname.split('/').slice(-1)[0];
  // console.log(def);

  return (
    <div id='Dashboard'>
      <h2>Dashboard</h2>
      <select value={def} onChange={(e) => navigate(e.target.value)} id="dash-select">
        <option value="">Posts</option>
        <option value="draft">Drafts</option>
        <option value="bookmark">Bookmarks</option>
      </select>
      <Outlet />
    </div>
  )
}

export default Dashboard