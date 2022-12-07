import { useState } from 'react';
import Modal from 'react-modal'
import { Button } from '../Button';
import { Input } from '../Input';
import { FileArrowDown, X } from 'phosphor-react'
import styles from './styles.module.scss'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const modalLayout = {
  content: {
    width: '600px',
    height: '530px',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
    transform: 'translate(70%, 30%)'
  }
}

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function EditProfileModal({isOpen, onRequestClose}:EditProfileModalProps) {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newProfilePicURL, setNewProfilePicURL] = useState('')
  const [newProfilePicID, setNewProfilePicID] = useState('')

  const navigate = useNavigate()

  const uploadWidget = window.cloudinary.createUploadWidget({
      cloud_name: import.meta.env.VITE_CLOUD_NAME,
      upload_preset: import.meta.env.VITE_UPLOAD_PRESET_PROFILE,
      tags: ['profile_pic'],
      sources: ['local'],
    }, (error: any, result: any) => {
      if(error) {
        console.log(`Something went wrong: ${error}`)
      } else {
        if(result.info.secure_url) {
          setNewProfilePicURL(result.info.secure_url)
          setNewProfilePicID(result.info.public_id)
        }
      }
    })
  
  const openWidget = () => uploadWidget.open()

  const editProfile = async () => {
    await axios
            .patch(`${import.meta.env.VITE_BASE_URL}/user/editprofile`, {
              name: newName,
              username: newUsername,
              description: newDescription,
              profile_pic: newProfilePicURL,
              profile_pic_id: newProfilePicID,
            })
            .then(res => {
              if(newUsername.length > 0) {
                navigate(`/profile/${newUsername}`)
                window.location.reload()
              }
              window.location.reload()
            })
            .catch(error => {
              console.log(`Something went wrong: ${error}`)
            })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    editProfile()
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalLayout}
      className='react-modal-content'
    >
      <div onClick={onRequestClose} className={styles.closeButton}>
        <X size={26} />
      </div>

      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.uploadPicture} onClick={openWidget}>
          {newProfilePicURL ? <img src={newProfilePicURL} /> : <FileArrowDown size={36} />}
        </div>
        <Input
          width='100%'
          height='20px'
          padding='20px'
          type='text'
          placeholder='New name'
          action={setNewName}
        />
        <Input
          width='100%'
          height='20px'
          padding='20px'
          type='text'
          placeholder='New username'
          action={setNewUsername}
        />
        <textarea 
          className={styles.descriptionInput}
          onChange={e => setNewDescription(e.target.value)}
          placeholder='New Description...'
        />
        <Button 
          name='Send'
          width='80px'
          height='40px'
          type='submit'
          color='lightblue'
        />
      </form>
    </Modal>
  )
}