import { X } from 'phosphor-react'
import Modal from 'react-modal'
import styles from './styles.module.scss'

const modalLayout = {
  content: {
    width: '300px',
    height: 'fit-content',
    borderRadius: '10px',
    backgroundColor: 'var(--background-color)',
    right: 'calc(100vw - 50vw)',
    transform: 'translate(40vw, 70%)',
    overflow: 'hidden',
    outline: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    WebkitBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    MozBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
  }
}

interface SettingsModalProps {
  isLogIn: boolean
  isSettingsModalOpen: boolean
  isDarkModeOn: boolean
  setIsDarkModeOn: (arg: boolean) => void
  handleCloseSettingsModal: () => void
}

export function SettingsModal({ isLogIn, isSettingsModalOpen, handleCloseSettingsModal, isDarkModeOn, setIsDarkModeOn }:SettingsModalProps) {

  const logout = () => {
    localStorage.removeItem('token')
    location.reload()
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
      style={modalLayout}
      className={`react-modal-content ${styles.nicetry}`}
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
        {isLogIn && <div onClick={logout}>
          <p className={styles.logout}>Log Out</p>
        </div>}
      </div>
    </Modal>
  )
}