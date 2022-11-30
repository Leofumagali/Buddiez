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
  const [isLogIn, setIsLogIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useTheme(themes.light)

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
            : <Login isLogIn={isLogIn} setIsLogIn={setIsLogIn} />} />
          <Route path='/feed' element={
          <Feed 
            username={user.username} 
            verifyToken={verifyToken} 
          />} 
          />
          <Route path='/profile/:username_or_id' element={
          <Profile 
            username={user.username} 
            verifyToken={verifyToken}
            userid={user._id}
          />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
