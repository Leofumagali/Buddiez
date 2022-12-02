import { useTheme } from './hooks/useTheme';
import { Feed } from './pages/Feed';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import './styles/global.scss';
import { themes } from './styles/themes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PostModal } from './components/PostModal';
import { SinglePost } from './pages/SinglePost';

export function App() {
  useTheme(themes.light)

  const [isLogIn, setIsLogIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false)
  const [isCreatePostModalOpen, 
    setIsCreatePostModalOpen] = useState<boolean>(false)

  const handleOpenPostModal = () => setIsPostModalOpen(true)
  const handleClosePostModal = () => setIsPostModalOpen(false)
  
  const handleOpenCreatePostModal = () => setIsCreatePostModalOpen(true)
  const handleCloseCreatePostModal = () => setIsCreatePostModalOpen(false)
  
  let location = useLocation()
  let state = location.state as { backgroundLocation?: Location }

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

  const savePost = async (postid: string) => {
    await axios
          .post(`${import.meta.env.VITE_BASE_URL}/post/savepost`, {
            postid: postid
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => {
            console.log(`Something went wrong: ${error}`)
          })
  }

  const removeSavePost = async (postid: string) => {
    await axios
          .delete(`${import.meta.env.VITE_BASE_URL}/post/unsavepost`, {
            data: {
              postid: postid
            }
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => {
            console.log(`Something went wrong: ${error}`)
          })
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={isLogIn 
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

            isCreatePostModalOpen={isCreatePostModalOpen}
            setIsCreatePostModalOpen={setIsCreatePostModalOpen}
            handleOpenCreatePostModal={handleOpenCreatePostModal}
            handleCloseCreatePostModal={handleCloseCreatePostModal}

            savePost={savePost}
            removeSavePost={removeSavePost}
          />} 
        />

        <Route path='/profile/:username_or_id' element={
          <Profile 
            username={user.username}
            profile_pic={user.profile_pic}
            verifyToken={verifyToken}
            userid={user._id}

            isPostModalOpen={isPostModalOpen}
            setIsPostModalOpen={setIsPostModalOpen}
            handleOpenPostModal={handleOpenPostModal}
            handleClosePostModal={handleClosePostModal}

            isCreatePostModalOpen={isCreatePostModalOpen}
            setIsCreatePostModalOpen={setIsCreatePostModalOpen}
            handleOpenCreatePostModal={handleOpenCreatePostModal}
            handleCloseCreatePostModal={handleCloseCreatePostModal}

            savePost={savePost}
            removeSavePost={removeSavePost}
          />} 
        />

        <Route path='/post/:postid' element={
          <SinglePost 
            username={user.username}
            profile_pic={user.profile_pic}
            onRequestClose={handleClosePostModal}
            isCreatePostModalOpen={isCreatePostModalOpen}
            handleOpenCreatePostModal={handleOpenCreatePostModal}
            handleCloseCreatePostModal={handleCloseCreatePostModal}
          />} 
        />

        {state?.backgroundLocation && (
        <Route path="/post/:postid" element={
          <PostModal 
            isOpen={true}
            onRequestClose={handleClosePostModal}
            username={user.username}
            profile_pic={user.profile_pic}
          />} 
        />
      )}
      </Routes>
    </div>
  )
}
