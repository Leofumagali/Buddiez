import axios from 'axios';
import { ChatCircleDots, DotsThreeOutline, PawPrint, TagSimple, Trash } from 'phosphor-react';
import trashicon from '../../../public/trash-icon.svg'
import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
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
  isLogIn: boolean
  isOpen: boolean
  onRequestClose: () => void;
  username: string
  profile_pic: string
}

export function PostModal({ isLogIn, isOpen, onRequestClose, username }:PostModalProps) {
  const [post, setPost] = useState<any>({})
  const [listOfComments, setListOfComments] = useState<any>([])
  const [newComment, setNewComment] = useState('')
  const [isCommentInputDisabled, setIsCommentInputDisabled] = useState<boolean>(!isLogIn)
  
  let placeHolderMessage = isLogIn ? 'Comment something...' : 'Log in to comment something'

  let navigate = useNavigate()
  let { postid } = useParams()

  let onRequestCloseAndNavigateBack = () => {
    onRequestClose()
    if(window.history.state) {
      navigate(-1)
    } else {
      navigate(`/feed`)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  useEffect(() => {
    scrollCommentsDown()
  }, [post])

  const getPost = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/post/${postid}`)
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
            getPost()
            setNewComment('')
          })
          .catch(error => {
            console.log(`Something went wrong: ${error}`)
          })
  }

  const deleteComment = async (id: string) => {
    await axios
          .delete(`${import.meta.env.VITE_BASE_URL}/post/deletecomment`, {
            data: {
              postid: post._id,
              commentid: id,
            }
          })
          .then(res => {
            getPost()
          })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    if(newComment.length > 0) {
      addNewComment()
    }
  }

  const scrollCommentsDown = () => {
    let allCommentsElement = document.getElementById('allComments') as HTMLInputElement | null 
    allCommentsElement?.scrollTo({
      top: 99999,
      behavior: 'smooth'
    });
  }

  const inputField = document.getElementById('commentInput') as HTMLInputElement | null;
  const focusOnInput = () => inputField!.focus()

  dayjs.extend(relativeTime)
  let timeAgo = dayjs(post.created_time).fromNow()
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestCloseAndNavigateBack}
      style={modalLayout}
      className='react-modal-content'
    >
      <div className={styles.container}>
        <section className={styles.postSection}>
          <div className={styles.postInfos}>
            <NavLink
              to={`/profile/${post.owner_id?._id}`}
              className={styles.userInfos}>
                <div className={styles.userPhoto}>
                  <img src={post.owner_id?.profile_pic}/>
                </div>
                <h1>{post.owner_id?.username}</h1>
            </NavLink>

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
              <div onClick={focusOnInput}>
                <ChatCircleDots size={32} />
              </div>
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
          <div className={styles.allComments} id='allComments'>
            {listOfComments.length > 0
              ? listOfComments.map((item:any, idx: number) => {
              return (<div key={idx} className={styles.commentCard}>
                <div className={styles.mainComment} >
                  {(username === item.user_id?.username) 
                    && <div 
                        className={styles.deleteComment}
                        onClick={() => deleteComment(item._id)}
                      >
                        <img src={trashicon} className={styles.trashIcon} />
                    </div>
                  }
                  <img src={item.user_id?.profile_pic} className={styles.commentProfilePhoto} />
                  <div>
                    <h1>{item.user_id?.username}</h1>
                    <p>{item.message}</p>
                  </div>
                </div>
                <span className={styles.timeAgo}>
                  {dayjs(item.timestamp).fromNow()}
                </span>
              </div>
              )
            })
            : <p className={styles.noPostMessage}>No comments yet, be the first!</p>
            } 
          </div>

          <form onSubmit={handleSubmit} className={styles.commentInput}>
            <input 
              id='commentInput'
              placeholder={placeHolderMessage}
              type="text" 
              value={newComment}
              onChange={e => {setNewComment(e.target.value)}}
              disabled={isCommentInputDisabled}
            />
          </form>
        </section>
      </div>
    </Modal>
  )
}