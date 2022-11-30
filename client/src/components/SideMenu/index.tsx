import { Cat, GearSix, House, MagnifyingGlass, Sticker } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

interface SideMenuProps {
  username: string
}

export function SideMenu({username}:SideMenuProps) {
  return (
    <nav>
      <ul className={styles.menuList}>
        <li><NavLink to={'/login'}><h1>Buddiez</h1></NavLink></li>
        <li><Sticker size={32} />Post</li>
        <li><NavLink to={'/feed'}><House size={32} />Feed</NavLink></li>
        <li><NavLink to={`/profile/${username}`}><Cat size={32} />Profile</NavLink></li>
        <li><MagnifyingGlass size={32} />Search</li>
      </ul>

      <div className={styles.settingsDiv}>
        <div>
          <GearSix size={32} />
          <span>Settings</span>
        </div>
      </div>
    </nav>
  )
}