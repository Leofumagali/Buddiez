import { PostModal } from '../../components/PostModal'
import { SideMenu } from '../../components/SideMenu'
import styles from './styles.module.scss'

interface SinglePostProps {
  username: string
  profile_pic: string
  onRequestClose: () => void
  isCreatePostModalOpen: boolean
  handleOpenCreatePostModal: () => void
  handleCloseCreatePostModal: () => void
}

export function SinglePost({ username, profile_pic, onRequestClose,
isCreatePostModalOpen, handleOpenCreatePostModal, handleCloseCreatePostModal }:SinglePostProps) {
  return (
    <div>
      <main>
        <SideMenu 
          username={username}
          isOpen={isCreatePostModalOpen}
          onRequestClose={handleCloseCreatePostModal}
          handleOpenCreatePostModal={handleOpenCreatePostModal}
        />

        <PostModal 
          username={username}
          profile_pic={profile_pic}
          isOpen={true}
          onRequestClose={onRequestClose}
        />
      </main>
    </div>
  )
}