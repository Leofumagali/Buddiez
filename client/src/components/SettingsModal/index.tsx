import { X } from 'phosphor-react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

interface SettingsModalProps {
  isLogIn: boolean
  isSettingsModalOpen: boolean
  isDarkModeOn: boolean
  setIsLogIn: (arg: boolean) => void
  setIsDarkModeOn: (arg: boolean) => void
  handleCloseSettingsModal: () => void
}

export function SettingsModal({ isLogIn, setIsLogIn,isSettingsModalOpen, handleCloseSettingsModal, isDarkModeOn, setIsDarkModeOn }:SettingsModalProps) {

  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setIsLogIn(false)
    navigate('/login')
    handleCloseSettingsModal()
  }

  let handleCheckbox = (e:React.ChangeEvent) => {
    if((e.target as HTMLInputElement).checked) {
      setIsDarkModeOn(true)
      localStorage.setItem('darkmode', 'true')
    } else {
      setIsDarkModeOn(false)
      localStorage.removeItem('darkmode')
    }
  }

  return (
    <Modal
      isOpen={isSettingsModalOpen}
      onRequestClose={handleCloseSettingsModal}
      className={styles.modalLayout}
    >
      <div className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h1>Settings</h1>
          <div onClick={handleCloseSettingsModal}>
            <X size={30} />
          </div>
        </div>

        <div className={styles.settingsOptions}>
          <div className={styles.darkMode}>
            <span>Dark mode</span>
            <label className={styles.toggleBar}>
              <input type="checkbox" onChange={handleCheckbox} checked={isDarkModeOn} />
              <span className={styles.slider}></span>
            </label>
          </div>
          {isLogIn && <div>
            <p>Change password</p>
          </div>}
          {isLogIn && <div>
            <p>Report bug</p>
          </div>}
          {isLogIn && <div>
            <p className={styles.deleteAccount}>Delete account</p>
          </div>}
        </div>
        {isLogIn 
          &&  <div onClick={logout}>
                <p className={styles.logout}>Log Out</p>
              </div>}
      </div>
    </Modal>
  )
}