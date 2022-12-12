import { PostModal } from '../../components/PostModal'

interface SinglePostProps {
  isLogIn: boolean
  username: string
  profile_pic: string
  onRequestClose: () => void
  favoritePosts: FavoritePosts[]
  userid: string
  likePost: (arg: string) => void
  unlikePost: (arg: string) => void
  savePost: (arg: string) => void
  removeSavePost: (arg: string) => void
}

interface FavoritePosts {
  post_id: string
}

export function SinglePost({ userid, favoritePosts, isLogIn, username, profile_pic, onRequestClose, likePost, unlikePost, savePost, removeSavePost }:SinglePostProps) {
  return (
    <div>
      <main>
        <PostModal 
          username={username}
          profile_pic={profile_pic}
          isOpen={true}
          onRequestClose={onRequestClose}
          isLogIn={isLogIn}
          userid={userid}
          favoritePosts={favoritePosts}
          likePost={likePost}
          unlikePost={unlikePost}
          savePost={savePost}
          removeSavePost={removeSavePost}
        />
      </main>
    </div>
  )
}