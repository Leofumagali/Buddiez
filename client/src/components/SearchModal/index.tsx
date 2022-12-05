import axios from 'axios'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

const modalLayout = {
  content: {
    width: '700px',
    height: '500px',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
    transform: 'translate(50%, 30%)',
    overflow: 'hidden',
    outline: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    WebkitBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    MozBoxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
  }
}

interface SearchModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

interface ListOfUsers {
  profile_pic: string
  username: string
  name: string
}

export function SearchModal({ isOpen, onRequestClose }:SearchModalProps) {
  const [userSearch, setUserSearch] = useState<string>('')
  const [listOfUsers, setListOfUsers] = useState<ListOfUsers[]>([])

  useEffect(() => {
    const delayToSearch = setTimeout(() => {
      if(userSearch.length > 0) {
        searchProfile()
      }
    }, 500)

    return () => clearTimeout(delayToSearch)
  }, [userSearch])

  const searchProfile = async () => {
    await axios
          .post(`${import.meta.env.VITE_BASE_URL}/user/search`, {
            username: userSearch
          })
          .then(res => {
            setListOfUsers(res.data.data)
            console.log(listOfUsers)
          })
          .catch(error => {
            console.log(`Sorry, something went wrong: ${error}`)
          })
  }

  const handleCloseModalAndResetUserSearch = () => {
    onRequestClose()
    setUserSearch('')
    setListOfUsers([])
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModalAndResetUserSearch}
      style={modalLayout}
      className='react-modal-content'
    >
      <div className={styles.container}>
        <div onClick={handleCloseModalAndResetUserSearch}>
          <X size={25} />
        </div>
        <h1 className={styles.searchTitle}>Search</h1>
        <div className={styles.inputDiv}>
          <p>How are you looking for?</p>
          <input
            id='searchInput'
            type="text"
            className={styles.searchInput}
            onChange={e => setUserSearch(e.target.value)}
            placeholder='Type here...'
          />
        </div>
        <div className={styles.listOfUsersContainer}>
          {listOfUsers.map((item, idx) => {
            return (
              <NavLink to={`/profile/${item.username}`}>
                <div
                  key={idx} 
                  className={styles.userCard}
                  onClick={handleCloseModalAndResetUserSearch}
                >
                  <img src={item.profile_pic} />
                  <div>
                    <span>{item.name}</span>
                    <span>@{item.username}</span>
                  </div>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}