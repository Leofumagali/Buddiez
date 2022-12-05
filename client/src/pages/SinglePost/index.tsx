import { PostModal } from '../../components/PostModal'

interface SinglePostProps {
  isLogIn: boolean
  username: string
  profile_pic: string
  onRequestClose: () => void
}

export function SinglePost({ isLogIn, username, profile_pic, onRequestClose }:SinglePostProps) {
  return (
    <div>
      <main>
        <PostModal 
          username={username}
          profile_pic={profile_pic}
          isOpen={true}
          onRequestClose={onRequestClose}
          isLogIn={isLogIn}
        />
      </main>
    </div>
  )
}