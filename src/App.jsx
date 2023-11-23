import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import TextEditor from './component/TextEditor/TextEditor';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Dashboard from './component/Dashboard/Dashboard';
import Editor from './component/Editor/Editor';
import Preview from './component/Preview/Preview';
import 'react-toastify/dist/ReactToastify.css';
import Dashposts from './component/Dashboard/Dashposts';
import Dashdrafts from './component/Dashboard/Dashdrafts';
import Dashbookmark from './component/Dashboard/Dashbookmark';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import Post from './component/Post/Post';
import Draft from './component/Draft/Draft';


function App() {
  return (
    <Routes>
      <Route path='' element={<Layout />} >

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='' element={<Home />} />
        <Route path='post/:id' element={<Post />} />


        <Route path='' element={<ProtectedRoute />} >

          <Route path='editor' element={<TextEditor />} >
            <Route path='edit/:id' element={<Editor />} />
            <Route path='preview/:id' element={<Preview />} />
          </Route>
          
          <Route path='draft/:id' element={<Draft />} />

          <Route path='dashboard' element={<Dashboard />} >
            <Route path='' element={<Dashposts />} />
            <Route path='draft' element={<Dashdrafts />} />
            <Route path='bookmark' element={<Dashbookmark />} />
          </Route>

        </Route>

      </Route>
    </Routes>
  )
}

export default App