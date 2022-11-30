import axios, { all } from 'axios'
import { useEffect, useState } from 'react'
import { FeedPost } from '../../components/FeedPost'
import { SideMenu } from '../../components/SideMenu'
import styles from './styles.module.scss'

interface Post {
  owner_id: string
  location: string
  description: string
  image_url: string
  created_time: string
  likes: []
}

interface FeedProps {
  username: string
  verifyToken: () => void
}

export function Feed({username, verifyToken}:FeedProps) {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([])

  useEffect(() => {
    verifyToken()
    getPosts()
  }, [])

  let getPosts = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/post/allposts`)
      .then(res => {
        let allPosts = res.data.data
        setListOfPosts((listOfPosts:Post[]) => [...listOfPosts, ...allPosts])
        console.log(listOfPosts)
      })
  }

  return (
    <div className={styles.containerFeed}>
      <SideMenu 
        username={username}
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
                description={item.description}
                likes={item.likes}
                created_time={item.created_time}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}