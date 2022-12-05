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
import { SideMenu } from './components/SideMenu';
import { CreatePostModal } from './components/CreatePostModal';
import { SearchModal } from './components/SearchModal';

export function App() {
  useTheme(themes.light)

  const [isLogIn, setIsLogIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [scrollPosition, setScrollPosition] = useState(0)

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false)
  const [isCreatePostModalOpen, 
    setIsCreatePostModalOpen] = useState<boolean>(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false)

  const handleOpenPostModal = () => setIsPostModalOpen(true)
  const handleClosePostModal = () => setIsPostModalOpen(false)
  
  const handleOpenCreatePostModal = () => setIsCreatePostModalOpen(true)
  const handleCloseCreatePostModal = () => setIsCreatePostModalOpen(false)

  const handleOpenSearchModal = () => setIsSearchModalOpen(true)
  const handleCloseSearchModal = () => setIsSearchModalOpen(false)
  
  let pathname = window.location.pathname
  
  useEffect(() => {
    verifyToken()
  }, [])

  // Trying to implement scroll history
  // useEffect(() => {
  //   const onScroll = (e: any) => {
  //     setScrollPosition(e.target.documentElement.scrollTop)
  //   }

  //   window.addEventListener('scroll', onScroll)
  //   return () => window.removeEventListener('scroll', onScroll)
  // }, [scrollPosition])

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
  
  const likePost = async (postid: string) => {
    await axios
          .post(`${import.meta.env.VITE_BASE_URL}/post/likepost`, {
            postid: postid
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => {
            console.log(`Something went wrong: ${error}`)
          })
  }

  const unlikePost = async (postid: string) => {
    await axios
          .post(`${import.meta.env.VITE_BASE_URL}/post/unlikepost`, {
            postid: postid
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => {
            console.log(`Something went wrong: ${error}`)
          })
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
      {pathname === '/login' || <SideMenu 
        isLogIn={isLogIn}
        username={user.username}
        isOpen={isPostModalOpen}
        onRequestClose={handleClosePostModal}
        handleOpenCreatePostModal={handleOpenCreatePostModal}
        handleOpenSearchModal={handleOpenSearchModal}
      />}

      <Routes>
        <Route path='/login' element={isLogIn 
          ? <Navigate to='/' /> 
          : <Login 
              isLogIn={isLogIn} 
              setIsLogIn={setIsLogIn}
              setToken={setToken} 
            />}
          />

        <Route path='/' element={
          <Feed
            userid={user._id}
            favoritePosts={user.favorite_posts}
            verifyToken={verifyToken}
            scrollHistory={scrollPosition}

            handleOpenPostModal={handleOpenPostModal}

            likePost={likePost}
            unlikePost={unlikePost}
            savePost={savePost}
            removeSavePost={removeSavePost}
          />} 
        />

        <Route path='/profile/:username_or_id' element={
          <Profile
            username={user.username}
            verifyToken={verifyToken}
            userid={user._id}
          />} 
        />

        <Route path='/post/:postid' element={
          <SinglePost
            username={user.username}
            profile_pic={user.profile_pic}
            onRequestClose={handleClosePostModal}
            isLogIn={isLogIn}
          />}
        />

        
        <Route path="/post/:postid" element={
          <PostModal 
            isOpen={true}
            onRequestClose={handleClosePostModal}
            username={user.username}
            profile_pic={user.profile_pic}
            isLogIn={isLogIn}
          />} 
        />
      </Routes>

      <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onRequestClose={handleCloseCreatePostModal}
      />

      <SearchModal 
        isOpen={isSearchModalOpen}
        onRequestClose={handleCloseSearchModal}
      />
    </div>
  )
}
