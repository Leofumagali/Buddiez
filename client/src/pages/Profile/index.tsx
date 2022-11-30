import axios from 'axios'
import { GenderFemale, GenderMale } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { SideMenu } from '../../components/SideMenu'
import cat from '../../../public/Cat.svg'
import styles from './styles.module.scss'

interface User {
  name: string
  username: string
  profile_pic: string
  description: string
  species: string
  gender: string
  followers: [],
  following: []
}

type GetUserResponse = {
  data: User
}

interface ProfileProps {
  username: string
  userid: string
  verifyToken: () => void
}

export function Profile({ username, userid, verifyToken }:ProfileProps) {
  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    profile_pic: '',
    description: '',
    species: '',
    gender: '',
    followers: [],
    following: []
  })
  const [loadingUser, setLoadingUser] = useState(false)
  const [posts, setPosts] = useState<any[]>([{}])
  const [loadingPosts, setLoadingPosts] = useState(false)

  let { username_or_id } = useParams()

  const [isFollowingThisProfile, 
    setIsFollowingThisProfile] = useState<boolean | null>(true)


  useEffect(() => {
    verifyToken()
    getUser()
  }, [username_or_id])
  console.log('one render')

  let getUser = async () => {
    await axios
      .get<GetUserResponse>(`${import.meta.env.VITE_BASE_URL}/user/${username_or_id}`)
      .then(res => {
        let {name, username, profile_pic, description, species, gender, followers, following } = res.data.data
        setUser({
          name: name,
          username: username,
          profile_pic: profile_pic,
          description: description,
          species: species,
          gender: gender,
          followers: followers,
          following: following
        })
        getPosts(username)
        setLoadingUser(true)
        setIsFollowingThisProfile(user.followers.some(item => item.follower_id === userid))
        console.log(user.followers.some(item => item.follower_id === userid))
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  let getPosts = async (username: string) => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/posts/${username}`)
      .then(res => {
        let postsFromData = (res.data.data).reverse()
        setPosts([...postsFromData])
        setLoadingPosts(true)
      })
  }

  let handleFollow = async () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/follow`, {
        username: username_or_id
      })
      .then(res => {
        setIsFollowingThisProfile(true)
        console.log('following')
      })
      .catch(error => {
        console.log(`Something went wrong: ${RangeError}`)
      })
  }

  let handleUnfollow = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/unfollow`, {
        username: username_or_id
      })
      .then(res => {
        setIsFollowingThisProfile(false)
        console.log('unfollowing')
      })
      .catch(error => {
        console.log(`Something went wrong: ${RangeError}`)
      })
  }

  return (
    <div className={styles.container}>
      <SideMenu 
        username={username}
      />

      <main>
        <section className={styles.profileContainer}>
          <div className={styles.profileInfos}>
            <div className={styles.infos}>
              <img className={styles.profilePic} src={user.profile_pic} alt="" />
              <div className={styles.infoMiddle}>
                <h1>{user.name}</h1>
                <p>@{user.username}</p>
              </div>

              <div className={styles.infoRight}>
                <div className={styles.infoIcons}>
                  <img src={cat} className={styles.speciesImg} />
                  {loadingUser 
                    && user.gender === 'male' 
                      ? <GenderMale size={38} /> 
                      : <GenderFemale size={38} 
                  />}
                </div>
                <div>
                  {isFollowingThisProfile
                    ? <Button
                      width='140px'
                      height='40px'
                      name='Unfollow'
                      type='button'
                      onClick={handleUnfollow}
                      color='rgb(255, 90, 90)'
                    /> 
                    : <Button
                      width='140px'
                      height='40px'
                      name='Follow'
                      type='button'
                      onClick={handleFollow}
                      color='rgb(77, 207, 250)'
                    />
                  }
                </div>
              </div>
              
            </div>

            <article className={styles.description}>
              {user.description}
            </article>

            <div className={styles.postsAndFollowers}>
              <span onClick={() => console.log('clickou')}>
                {loadingPosts ? posts.length : '0'} posts
              </span>
              <span>
                {loadingUser ? (user.followers).length : '0'} followers
              </span>
              <span>
                {loadingUser ? (user.following).length : '0'} following
              </span>
            </div>
          </div>

          <div className={styles.profilePosts}>
            {loadingPosts && posts.reverse().map((item, idx) => {
              return (
              <div key={idx} className={styles.postDiv}>
                <img
                  src={item.image_url}
                />
              </div>)
            })}
          </div>
          {posts.length === 0 && <p className={styles.messageAboutNoPosts}>This user has no posts.</p>}
        </section>
      </main>
    </div>
  )
}