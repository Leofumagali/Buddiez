import axios from 'axios'
import { useEffect, useState } from 'react'
import { FeedPost } from '../../components/FeedPost'
import styles from './styles.module.scss'

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
  userid: string
  favoritePosts: []
  verifyToken: () => void
  scrollHistory: number

  handleOpenPostModal: () => void

  likePost: (arg: string) => void
  unlikePost: (arg: string) => void
  savePost: (arg: string) => void
  removeSavePost: (arg: string) => void
}

export function Feed({
  userid,
  favoritePosts,
  verifyToken, 
  handleOpenPostModal,
  scrollHistory,
  likePost, unlikePost,
  savePost, removeSavePost}:FeedProps) {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([])

  useEffect(() => {
    verifyToken()
    getPosts()
    window.scrollTo(scrollHistory, 0)
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
      <main>
        <div className={styles.feedContainer}>
          {listOfPosts.length > 0 && listOfPosts.map((item, idx) => {
            return (
              <FeedPost 
                key={idx}
                userid={userid}
                favoritePosts={favoritePosts}
                image_url={item.image_url}
                location={item.location}
                owner_id={item.owner_id}
                postid={item._id}
                description={item.description}
                likes={item.likes}
                created_time={item.created_time}
                handleOpenPostModal={handleOpenPostModal}
                likePost={likePost}
                unlikePost={unlikePost}
                savePost={savePost}
                removeSavePost={removeSavePost}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}