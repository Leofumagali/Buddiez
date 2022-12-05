import axios from 'axios'
import { ChatCircleDots, DotsThreeOutline, PawPrint, TagSimple } from 'phosphor-react'
import likeIcon from '../../../public/like-icon.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './styles.module.scss'

interface FeedPostProps {
  isLogIn: boolean
  userid: string
  favoritePosts: FavoritePosts[]
  owner_id: string
  postid: string
  location: string
  image_url: string
  likes: LikeProfile[]
  isFavorite?: boolean
  description: string
  created_time: string
  handleOpenPostModal: () => void
  likePost: (arg: string) => void
  unlikePost: (arg: string) => void
  savePost: (arg: string) => void
  removeSavePost: (arg: string) => void
}

interface Owner {
  username: string
  owner_id: string
  profile_pic: string
}

interface LikeProfile {
  user_id: string
}

interface FavoritePosts {
  post_id: string
}

export function FeedPost({ isLogIn, userid, owner_id, postid, favoritePosts, location, image_url, likes, isFavorite, description, created_time, likePost, unlikePost, savePost, removeSavePost }:FeedPostProps) {
  const [owner, setOwner] = useState<Owner>()
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length)
  const [userLikeThisPost, setUserLikeThisPost] = useState<boolean>(likes?.some(item => item.user_id === userid))
  const [userSavedThisPost, setUserSavedThisPost] = useState<any>(favoritePosts?.some(item => item.post_id === postid))

  let navigate = useNavigate()

  useEffect(() => {
    getOwnerOfPost()
  }, [])

  let getOwnerOfPost = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/${owner_id}`)
      .then(res => {
        let ownerFromFetch = res.data.data
        setOwner(ownerFromFetch)
      })
  }

  const likePostAndChangeIconStatus = () => {
    if(isLogIn) {
      likePost(postid)
      setNumberOfLikes(numberOfLikes+1)
      setUserLikeThisPost(true)
    }
  }

  const unlikePostAndChangeIconStatus = () => {
    if(isLogIn) {
      unlikePost(postid)
      setNumberOfLikes(numberOfLikes-1)
      setUserLikeThisPost(false)
    }
  }
  
  const savePostAndChangeIconStates = () => {
    if(isLogIn) {
      savePost(postid)
      setUserSavedThisPost(true)
    }
  }

  const removeSavePostAndChangeIconStates = () => {
    if(isLogIn) {
      removeSavePost(postid)
      setUserSavedThisPost(false)
    }
  }

  dayjs.extend(relativeTime)
  let timeAgo = dayjs(created_time).fromNow()

  return (
    <div className={styles.postContainer}>
      <div className={styles.postInfo}>
        <NavLink 
          to={`/profile/${owner_id}`}
          className={styles.leftInfo}>
            <img src={owner?.profile_pic} />
            <h1>{owner?.username}</h1>
        </NavLink>

        <div className={styles.rightInfo}>
          {location}
        </div>
      </div>

      <Link 
        to={`/post/${postid}`}
        className={styles.postImage}
        state={{ backgroundLocation: location }}
      >
        <img src={image_url} />
      </Link>

      <div className={styles.postIcons}>
        <div className={styles.leftIcons}>
          <div className={styles.likeIcon}>
            {userLikeThisPost 
              ? <div onClick={unlikePostAndChangeIconStatus}>
                <PawPrint size={32} color='red'/>
              </div> 
              : <div onClick={likePostAndChangeIconStatus}>
                <PawPrint size={32} color='black' />
              </div> }
          </div>
          <div onClick={() => navigate(`/post/${postid}`)}>
            <ChatCircleDots size={32} />
          </div>
          <span>{numberOfLikes} people liked this</span>
        </div>
        <div className={styles.rightIcons}>
          <DotsThreeOutline size={32} />
          {userSavedThisPost
            ? <div onClick={removeSavePostAndChangeIconStates}>
              <TagSimple size={32} color='red' />
            </div>
            : <div onClick={savePostAndChangeIconStates}>
              <TagSimple size={32} color='black' />
            </div>
            }
        </div>
      </div>

      <div className={styles.description}>
        <p>{description}</p>
      </div>

      <span className={styles.timeAgo}>
        {timeAgo}
      </span>

      <div className={styles.comments} onClick={() => navigate(`/post/${postid}`)}>
        <p>See all comments...</p>
      </div>
    </div>
  )
}