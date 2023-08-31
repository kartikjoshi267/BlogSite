import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import React, { useEffect } from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Blogs from './pages/Blogs'
import BlogPage from './pages/BlogPage'
import EditorPage from './pages/EditorPage'
import { loggedInState, getUser, userState } from './utils'
import { useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify'
import'react-toastify/dist/ReactToastify.css';
import FollowersPage from './pages/FollowersPage'
import FollowingPage from './pages/FollowingPage'


const App : React.FC = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [_, setUser] = useRecoilState(userState);
  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('auth-token') !== null){
        await getUser(setUser, setLoggedIn);
      }
    }
    fetchUser();
  }, [loggedIn]);
  
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/:username/blogs/' element={<Blogs />} />
        <Route path='/:username/blogs/:id' element={<BlogPage />} />
        <Route path='/:username/blogs/new' element={<EditorPage />} />
        <Route path='*' element={<NotFound />} />
        { !loggedIn ? <></> : <Route path='/:username/followers' element={<FollowersPage />} /> }
        { !loggedIn ? <></> : <Route path='/:username/following' element={<FollowingPage />} /> }
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
