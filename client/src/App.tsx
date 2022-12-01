import { useTheme } from './hooks/useTheme';
import { Feed } from './pages/Feed';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './styles/global.scss';
import { themes } from './styles/themes';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function App() {
  useTheme(themes.light)

  const [isLogIn, setIsLogIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false)

  const handleOpenPostModal = () => {
    setIsPostModalOpen(true)
  }
  
  const handleClosePostModal = () => {
    setIsPostModalOpen(false)
  }
  

  useEffect(() => {
    verifyToken()
  }, [])

  let verifyToken = async () => {
    if(!token) {
      setIsLogIn(false)
    } else {
      axios.defaults.headers.common['auth-token'] = token
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/user/verify`)
        .then(res => {
          if(res.data.status === 'success') {
            setIsLogIn(true)
            setUser(res.data.user)
          }
        })
        .catch(error => {
          console.log(`Sorry, something went wrong: ${error}`)
        })

    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={isLogIn 
            ? <Navigate to='/feed' /> 
            : <Login 
                isLogIn={isLogIn} 
                setIsLogIn={setIsLogIn}
                setToken={setToken} 
              />} 
            />

          <Route path='/feed' element={
            <Feed 
              username={user.username} 
              profile_pic={user.profile_pic}
              verifyToken={verifyToken}
              isPostModalOpen={isPostModalOpen}
              setIsPostModalOpen={setIsPostModalOpen}
              handleOpenPostModal={handleOpenPostModal}
              handleClosePostModal={handleClosePostModal}
            />} 
          />

          <Route path='/profile/:username_or_id' element={
            <Profile 
              username={user.username}
              verifyToken={verifyToken}
              userid={user._id}
              isPostModalOpen={isPostModalOpen}
              setIsPostModalOpen={setIsPostModalOpen}
              handleOpenPostModal={handleOpenPostModal}
              handleClosePostModal={handleClosePostModal}
            />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
