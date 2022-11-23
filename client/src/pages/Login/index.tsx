import axios from 'axios'
import { useState } from 'react'
import ReactModal from 'react-modal'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import './styles.scss'

ReactModal.setAppElement('#root')

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  let handleOpenSignUpModal = (e:React.MouseEvent) => {
    e.preventDefault()
    setIsSignUpModalOpen(true)
    console.log('yes', isSignUpModalOpen)
  }

  let handleCloseSignUpModal = (e:React.MouseEvent) => {
    e.preventDefault()
    setIsSignUpModalOpen(false)
  }
  
  let handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    console.log(email, password)
    login()
  }

  let login = () => {
    axios
      .post('http://localhost:4000/user/login', {
        email_or_username: email,
        password: password
      })
      .then(res => {
          console.log(res);
          let { token } = res.data
          localStorage.setItem('token', token)
        }
      )
      .catch( error => {
        setError(`Invalid e-mail or password`)
        console.log(`Sorry, something went wrong: ${error}`)
      })
  }

  return (
    <div className='container'>
      <main>
        <section className='logo-header'>
          <h1>Buddiez</h1>
          <p>Connecting our<br /> best friends</p>
        </section>

        <section className='login-form'>
          {error && <span className='errorMessage'>{error}</span>}

          <form onSubmit={handleSubmit}>
            <label className='main-input'>E-mail:
              <Input 
                width='100%'
                height='2rem'
                type='email'
                action={setEmail}
              />
            </label>
            
            <label className='main-input'>Password:
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
    
          <div onClick={handleOpenSignUpModal} className='signup-button'> 
            <span>Sign up for Buddiez</span>
          </div>
        </section>
      </main>
      
      <footer>
          <h1>Buddiez &copy; 2022</h1>
      </footer>
    </div>
  )
}