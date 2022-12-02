import axios from 'axios'
import { useEffect, useState } from 'react'
import { FeedPost } from '../../components/FeedPost'
import { SideMenu } from '../../components/SideMenu'
import { PostModal } from '../../components/PostModal'
import styles from './styles.module.scss'
import { CreatePostModal } from '../../components/CreatePostModal'

interface Post {
  owner_id: string
  location: string
  description: string
  image_url: string
  created_time: string
  likes: []
  _id: string
}

interface FeedProps {
  username: string
  profile_pic: string
  verifyToken: () => void

  isPostModalOpen: boolean
  setIsPostModalOpen: (arg: boolean) => void
  handleOpenPostModal: () => void
  handleClosePostModal: () => void

  isCreatePostModalOpen: boolean
  setIsCreatePostModalOpen: (arg: boolean) => void
  handleOpenCreatePostModal: () => void
  handleCloseCreatePostModal: () => void

  savePost: (arg: string) => void
  removeSavePost: (arg: string) => void
}

export function Feed({
  username, profile_pic, verifyToken, 
  isPostModalOpen, setIsPostModalOpen, handleOpenPostModal, handleClosePostModal, 
  isCreatePostModalOpen, setIsCreatePostModalOpen, handleOpenCreatePostModal, handleCloseCreatePostModal, 
  savePost, removeSavePost}:FeedProps) {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([])

  useEffect(() => {
    verifyToken()
    getPosts()
  }, [])

  let getPosts = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/post/allposts`)
      .then(res => {
        let allPosts = (res.data.data).reverse()
        setListOfPosts((listOfPosts:Post[]) => [...allPosts])
      })
  }

  return (
    <div className={styles.containerFeed}>
      <SideMenu 
        username={username}
        isOpen={isPostModalOpen}
        onRequestClose={handleClosePostModal}
        handleOpenCreatePostModal={handleOpenCreatePostModal}
      />
      
      <main>
        <div className={styles.feedContainer}>
          {listOfPosts.map((item, idx) => {
            return (
              <FeedPost 
                key={idx}
                image_url={item.image_url}
                location={item.location}
                owner_id={item.owner_id}
                postid={item._id}
                description={item.description}
                likes={item.likes}
                created_time={item.created_time}
                handleOpenPostModal={handleOpenPostModal}
                savePost={savePost}
                removeSavePost={removeSavePost}
              />
            )
          })}
        </div>

        <CreatePostModal 
          isOpen={isCreatePostModalOpen}
          onRequestClose={handleCloseCreatePostModal}
        />
      </main>
    </div>
  )
}