import { Cat, GearSix, House, MagnifyingGlass, Sticker } from 'phosphor-react'
import './styles.scss'

export function SideMenu() {
  return (
    <nav>
      <ul className='menu-list'>
        <li><a href="/"><h1>Buddiez</h1></a></li>
        <li><a href="/"><Sticker size={32} />Post</a></li>
        <li><a href="/"><House size={32} />Feed</a></li>
        <li><a href="/"><Cat size={32} />Profile</a></li>
        <li><a href="/"><MagnifyingGlass size={32} />Search</a></li>
      </ul>

      <div className='settings-div'>
        <a href="/"><GearSix size={32} />Settings</a>
      </div>
    </nav>
  )
}