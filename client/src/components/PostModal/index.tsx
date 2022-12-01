import axios from 'axios';
import { Cat, ChatCircleDots, Dog, DotsThreeOutline, PawPrint, TagSimple, Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './styles.module.scss'

const modalLayout = {
  content: {
    width: '1000px',
    height: '700px',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
    transform: 'translate(22%, 8%)',
    overflow: 'hidden',
    outline: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    WebkitBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    MozBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
  }
}

interface PostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  username: string
  profile_pic: string
}

export function PostModal({isOpen, onRequestClose, username, profile_pic}:PostModalProps) {
  const [post, setPost] = useState<any>({})
  const [postId, setPostId] = useState('638727b104973c79a9138b52')
  const [listOfComments, setListOfComments] = useState<any>([])
  const [newComment, setNewComment] = useState('')
  const [isUserComment, setIsUserComment] = useState(true)

  useEffect(() => {
    getPost()
  }, [])

  const getPost = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/post/${postId}`)
      .then(res => {
        setPost(res.data.data)
        setListOfComments((listOfComments:any) => [...res.data.data.comments])
      })
  }

  const addNewComment = async () => {
    await axios
          .post(`${import.meta.env.VITE_BASE_URL}/post/addcomment`, {
            message: newComment,
            postid: post._id
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => {
            console.log(`Something went wrong: ${error}`)
          })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    addNewComment()
  }

  dayjs.extend(relativeTime)
  let timeAgo = dayjs(post.created_time).fromNow()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalLayout}
      className='react-modal-content'
    >
      <div className={styles.container}>
        <section className={styles.postSection}>
          <div className={styles.postInfos}>
            <div className={styles.userInfos}>
              <div className={styles.userPhoto}>
                <img src={profile_pic} alt="" />
              </div>
              <h1>{username}</h1>
            </div>

            <div className={styles.location}>
              {post.location}
            </div>
          </div>

          <div className={styles.postImage}>
            <img src={post.image_url} />
          </div>

          <div className={styles.postIcons}>
            <div className={styles.leftIcons}>
              <PawPrint size={32} />
              <ChatCircleDots size={32} />
              <span>{post.likes?.length} people liked this</span>
            </div>

            <div className={styles.rightIcons}>
              <DotsThreeOutline size={32} />
              <TagSimple size={32} />
            </div>
          </div>

          <p className={styles.description}>
            {post.description}
          </p>

          <span className={styles.timeAgo}>
            {timeAgo}
          </span>
        </section>

        <section className={styles.commentSection}>
          <div className={styles.allComments}>
            {listOfComments.map((item:any, idx: number) => {
              return (<div key={idx} className={styles.commentCard}>
                <div className={styles.mainComment} >
                  {(username === item.user_id.username) && <div className={styles.deleteComment}>
                      <Trash size={20} />
                    </div>
                  }
                  <Cat size={50} />
                  <div>
                    <h1>{item.user_id.username}</h1>
                    <p>{item.message}</p>
                  </div>
                </div>
                <span className={styles.timeAgo}>
                  {dayjs(item.timestamp).fromNow()}
                </span>
              </div>
              )
            })} 
          </div>

          <form onSubmit={handleSubmit} className={styles.commentInput}>
            <input 
              placeholder='Comment something...'
              type="text" 
              onChange={e => {setNewComment(e.target.value)}}
            />
          </form>
        </section>
      </div>
    </Modal>
  )
}