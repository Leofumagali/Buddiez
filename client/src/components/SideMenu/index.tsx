import { Cat, GearSix, House, MagnifyingGlass, SignIn, Sticker } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { CreatePostModal } from '../CreatePostModal'
import styles from './styles.module.scss'

interface SideMenuProps {
  isLogIn: boolean
  username: string
  isOpen: boolean
  onRequestClose: () => void
  handleOpenCreatePostModal: () => void
  handleOpenSearchModal: () => void
  handleOpenSettingsModal: () => void
}

export function SideMenu({ isLogIn, username, isOpen, onRequestClose, handleOpenCreatePostModal, handleOpenSearchModal, handleOpenSettingsModal }:SideMenuProps) {
  return (
    <nav>
      <ul className={styles.menuList}>
        <li><NavLink to={'/'}><h1>Buddiez</h1></NavLink></li>
        {isLogIn || 
          <li onClick={() => location.reload()}><NavLink to={`/login`}><SignIn size={32} /><span>Log in</span></NavLink></li>}
        {isLogIn && 
          <li onClick={handleOpenCreatePostModal}><Sticker size={32} /><span>Post</span></li>}
        <li><NavLink to={'/'}><House size={32} /><span>Feed</span></NavLink></li>
        {isLogIn && 
          <li><NavLink to={`/profile/${username}`}><Cat size={32} /><span>Profile</span></NavLink></li>}
        <li onClick={handleOpenSearchModal}><MagnifyingGlass size={32} /><span>Search</span></li>
      </ul>

      <CreatePostModal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      />

      <div className={styles.settingsDiv}>
        <div onClick={handleOpenSettingsModal}>
          <GearSix size={32} />
          <span>Settings</span>
        </div>
      </div>
    </nav>
  )
}