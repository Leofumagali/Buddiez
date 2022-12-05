import axios from 'axios'
import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { SignUpModal } from '../../components/SignUpModal'
import styles from './styles.module.scss'

Modal.setAppElement('#root')

export interface LoginProps {
  isLogIn: boolean
  setIsLogIn: (arg: boolean) => void
  setToken: (arg: string) => void
}

export function Login({isLogIn, setIsLogIn, setToken}:LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  let navigate = useNavigate()

  let handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true)
  }

  let handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false)
  }
  
  let handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    login()
  }

  let login = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
        email_or_username: email,
        password: password
      })
      .then(res => {
          let { token } = res.data
          localStorage.setItem('token', token)
          setToken(token)
          setIsLogIn(true)
          setTimeout(() => navigate('/'), 500)
        }
      )
      .catch( error => {
        setError(`Invalid e-mail or password`)
        console.log(`Sorry, something went wrong: ${error}`)
      })
  }

  return (
    <div className={styles.container}>
      <main className={styles.mainLogin}>
        <section className={styles.logoHeader}>
          <h1>Buddiez</h1>
          <p>Connecting our<br /> best friends</p>
        </section>

        <section className={styles.loginForm}>
          {error && <span className={styles.errorMessage}>{error}</span>}

          <form onSubmit={handleSubmit}>
            <label className={styles.mainInput}>E-mail:
              <Input 
                name='email'
                width='100%'
                height='2rem'
                type='email'
                action={setEmail}
              />
            </label>
            
            <label className={styles.mainInput}>Password:
              <Input 
                width='100%'
                height='2rem'
                type='password'
                action={setPassword}
              />
            </label>

            <div>
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/">Forgot my password</a>
            </div>
            
            <Button 
              width='100px'
              height='40px'
              name='Log in'
              type='submit'
            />

          </form>

          <div onClick={handleOpenSignUpModal} className={styles.signupButton}> 
            <span>Sign up for Buddiez</span>
          </div>

          <SignUpModal 
            isOpen={isSignUpModalOpen}
            onRequestClose={handleCloseSignUpModal}
            isLogIn={isLogIn} 
            setIsLogIn={setIsLogIn}
          />
        </section>
      </main>
      
      <footer>
          <h1>Buddiez &copy; 2022</h1>
      </footer>
    </div>
  )
}