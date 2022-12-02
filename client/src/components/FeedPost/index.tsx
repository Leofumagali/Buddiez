import axios from 'axios'
import { ChatCircleDots, DotsThreeOutline, PawPrint, TagSimple } from 'phosphor-react'
import { useEffect, useState } from 'react'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './styles.module.scss'

interface FeedPostProps {
  owner_id: string
  postid: string
  location: string
  image_url: string
  likes: []
  isFavorite?: boolean
  description: string
  created_time: string
  handleOpenPostModal: () => void
  savePost: (arg: string) => void
  removeSavePost: (arg: string) => void
}

interface Owner {
  username: string
  owner_id: string
  profile_pic: string
}

export function FeedPost({ owner_id, postid, location, image_url, likes, isFavorite, description, created_time, handleOpenPostModal, savePost, removeSavePost }:FeedPostProps) {
  const [owner, setOwner] = useState<Owner>()

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


  dayjs.extend(relativeTime)
  let timeAgo = dayjs(created_time).fromNow()

  return (
    <div className={styles.postContainer}>
      <div className={styles.postInfo}>
        <div className={styles.leftInfo}>
          <img src={owner?.profile_pic} />
          <h1>{owner?.username}</h1>
        </div>

        <div className={styles.rightInfo}>
          {location}
        </div>
      </div>

      <div className={styles.postImage} onClick={handleOpenPostModal}>
        <img src={image_url} />
      </div>

      <div className={styles.postIcons}>
        <div className={styles.leftIcons}>
          <PawPrint size={32} />
          <div onClick={handleOpenPostModal}>
            <ChatCircleDots size={32} />
          </div>
          <span>{likes.length} people liked this</span>
        </div>
        <div className={styles.rightIcons}>
          <DotsThreeOutline size={32} />
          {false 
            ? <div onClick={() => savePost(postid)}>
              <TagSimple size={32} className={styles.savedPost} />
            </div>
            : <div onClick={() => removeSavePost(postid)}>
              <TagSimple size={32} className={styles.unsavedPost} />
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

      <div className={styles.comments} onClick={handleOpenPostModal}>
        <p>See all comments...</p>
      </div>
    </div>
  )
}