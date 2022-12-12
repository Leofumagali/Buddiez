import { useState } from 'react'
import Modal from 'react-modal'
import styles from './styles.module.scss'

const modalLayout = {
  content: {
    width: '350px',
    height: '500px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-color)',
    right: 'calc(100vw - 50vw)',
    transform: 'translate(40vw, 30%)',
    overflow: 'hidden',
    outline: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    WebkitBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    MozBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
  }
}

interface SettingsModalProps {
  
}

export function SettingsModal() {

  const close = () => {

  }

  return (
    <Modal
      isOpen={false}
      onRequestClose={close}
      style={modalLayout}
      className={`react-modal-content ${styles.nicetry}`}
    >
    </Modal>
  )
}