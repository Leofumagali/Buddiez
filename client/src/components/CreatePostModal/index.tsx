import { useState } from 'react';
import Modal from 'react-modal'
import { Button } from '../Button';
import { Input } from '../Input';
import { FileArrowDown, X } from 'phosphor-react'
import styles from './styles.module.scss'
import axios from 'axios';

const modalLayout = {
  content: {
    width: '600px',
    height: '530px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-color)',
    transform: 'translate(70%, 30%)'
  }
}

interface CreatePostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreatePostModal({isOpen, onRequestClose}:CreatePostModalProps) {
  const [postLocation, setPostLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imagePublicId, setImagePublicId] = useState('')

  const uploadWidget = window.cloudinary.createUploadWidget({
      cloud_name: import.meta.env.VITE_CLOUD_NAME,
      upload_preset: import.meta.env.VITE_UPLOAD_PRESET_POST_PIC,
      tags: ['post_pic'],
      sources: ['local'],
    }, (error: any, result: any) => {
      if(error) {
        console.log(`Something went wrong: ${error.status} and ${error.statusText}`)
      } else {
        if(result.info.secure_url) {
          setImageUrl(result.info.secure_url)
          setImagePublicId(result.info.public_id)
        }
      }
    })
  
  const openWidget = () => uploadWidget.open()

  const createPost = async () => {
    await axios
            .put(`${import.meta.env.VITE_BASE_URL}/post/create`, {
              location: postLocation,
              description: description,
              imageURL: imageUrl,
              image_public_id: imagePublicId,
            })
            .then(res => {
              window.location.reload()
            })
            .catch(error => {
              console.log(`Something went wrong: ${error}`)
            })
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    createPost()
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
          {imageUrl ? <img src={imageUrl} /> : <FileArrowDown size={36} />}
        </div>
        <Input
          width='100%'
          height='20px'
          padding='20px'
          type='text'
          placeholder='Where were you? (Location)'
          action={setPostLocation}
        />
        <textarea 
          className={styles.descriptionInput}
          onChange={e => setDescription(e.target.value)}
          placeholder='Description...'
        />
        <Button 
          name='Send'
          width='80px'
          height='40px'
          type='submit'
          color='var(--primary-color-stronger)'
        />
      </form>
    </Modal>
  )
}