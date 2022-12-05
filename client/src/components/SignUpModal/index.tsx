import axios from 'axios';
import { X } from 'phosphor-react';
import { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss';

interface SignUpModalProps {
  isLogIn: boolean
  isOpen: boolean;
  onRequestClose: () => void;
  setIsLogIn: (arg: boolean) => void
  setToken: (arg: string) => void
}

const modalLayout = {
  content: {
    width: '600px',
    height: '530px',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
    transform: 'translate(70%, 30%)'
  }
}

export function SignUpModal({ isOpen, onRequestClose, isLogIn, setIsLogIn, setToken }:SignUpModalProps) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('Male')
  const [species, setSpecies] = useState('Dog')
  const [isCheckboxActive, setIsCheckboxActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const errorIfPasswordIsNotEqual = '* your passwords must be equal' 
  let isButtonInactive = true

  let navigate = useNavigate()
  
  const speciesList = ['Dog', 'Cat', 'Rat', 'Mice', 'Turtle', 'Snake', 'Rabbit', 'Bird', 'Pig', 'Fish', 'Reptile', 'Ferret', 'Insect', 'Horse', 'Cow']

  let createAccount = () => {
    axios
      .put(`${import.meta.env.VITE_BASE_URL}/user/signup`, {
        name: name,
        username: username,
        email: email,
        password: password,
        birthday: birthday,
        gender: gender,
        species: species
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
        setErrorMessage(`Invalid e-mail or password`)
        console.log(`Sorry, something went wrong: ${error}`)
      })
  }

  let handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    createAccount()
  }

  if(password.length > 0 
    && password === secondPassword 
    && name.length > 0 
    && username.length > 0 
    && email.length > 0 
    && password.length > 0
    && birthday.length > 0 
    && gender.length > 0 
    && species.length > 0
    && isCheckboxActive) {
      isButtonInactive = false
  }

  let handleCheckbox = (e:React.ChangeEvent) => {
    if((e.target as HTMLInputElement).checked) {
      setIsCheckboxActive(true)
    } else {
      setIsCheckboxActive(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalLayout}
      className='react-modal-content'
    >
      <div onClick={onRequestClose} className={styles.svgDiv}>
        <X size={26} />
      </div>

      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.namesInputs}>
          <Input 
            width='49%'
            height='35px'
            padding='5%'
            type='text'
            action={setName}
            placeholder='Name'
            required={true}
          />
          <Input 
            width='49%'
            height='35px'
            padding='5%'
            type='text'
            action={setUsername}
            placeholder='Username'
            required={true}
          />
          <Input 
            width='100%'
            height='35px'
            padding='5%'
            type='email'
            action={setEmail}
            placeholder='E-mail'
            required={true}
          />
          <Input 
            width='49%'
            height='35px'
            padding='5%'
            type='text'
            action={setPassword}
            placeholder='Password'
            required={true}
          />
          <Input 
            width='49%'
            height='35px'
            padding='5%'
            type='text'
            action={setSecondPassword}
            placeholder='Repeat Password'
            required={true}
          />
        </div>

        {(password !== secondPassword) && <h1 className={styles.passwordError}>{errorIfPasswordIsNotEqual}</h1>}

        <div className={styles.birthdayGenderSpeciesInputs}>
          <label> 
            <p>Birthday:</p>
            <Input 
              width='200px'
              height='40px'
              padding='5%'
              type='date'
              action={setBirthday}
              min='1950-01-01'
              max='2050-01-01'
              required={true}
            />
          </label>

          <label htmlFor="gender" className={styles.genderLabel}>
            <p>Gender:</p>
            <select name="gender" id="gender" onChange={e => {setGender(e.target.value)}} required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label htmlFor="species" className={styles.speciesLabel}>
            <p>Species:</p>
            <select name="species" id="species" onChange={e => {setSpecies(e.target.value)}} required>
              {speciesList.map((item, idx) => {
                return <option key={idx} value="{item}">{item}</option>
              })}
            </select>
          </label>
        </div>

        <div className={styles.checkboxInput}>
          <input type="checkbox" onChange={handleCheckbox} required />
          <span>I agree with terms and conditions</span>
        </div>

        <Button 
          name='Sign Up'
          type='submit'
          width='100px'
          height='40px'
          isButtonInactive={isButtonInactive}
        />
      </form>

      <a href="/">
        Already have an account? Log in here!
      </a>
    </Modal>
  )
}