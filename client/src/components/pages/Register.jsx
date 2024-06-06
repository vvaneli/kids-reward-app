import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../../lib/auth'

import logoWord from '../../assets/smelly-earnie-logo.svg'

export default function Register() {
  // State variables
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    password_confirmation: '',
    legal_agree: Boolean(),
  })
  const [successMsg, setSuccessMsg] = useState('')
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const { data: { message, access } } = await axios.post('/api/account/register/', registerFormData)
      if (!access) throw new Error(setFormError('Couldn\'t create an account.'))
      setToken(access)
      setSuccessMsg(message)
      navigate('/', { state: { successMsg: message } })
    } catch (error) {
      console.log(error)
      // console.log(error.response)
      console.log(error.response.data.message)
      setFormError(error.response.data.message)
    }
  }

//   function handleCheckbox(e) {
// console.log(e.target.checked)
//   }

  function handleChange(e) {
    // const inputValue = e.target.value

    // checkbox input
    // if (e.target.checked) { 
      // spread existing options into new options array, add the new value
      // setRegisterFormData({ ...registerFormData, legal_agree: [...registerFormData.legal_agree, inputValue]})
    // } else {
    //   // else remove the unchecked box by filtering it out of the existing array
    //   setRegisterFormData({...registerFormData, legal_agree: registerFormData.legal_agree.filter(option => option !== inputValue)})
    // }

    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    setFormError('')
    console.log(registerFormData, formError)
  }

  return (
    <>
    <div className='register'>
      <main id='register'>
        <section className='auth-form'>
        <img className='logo' src={logoWord} alt='Smelly Earnie logo' />
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <label htmlFor='text'>Username</label>
            <input type='text' placeholder='username' name='username' id='username' value={registerFormData.username} onChange={handleChange} required />
            <label htmlFor='text'>Nickname</label>
            <input type='text' placeholder='nickname' name='nickname' id='nickname' value={registerFormData.nickname} onChange={handleChange} required />
            <label htmlFor='email'>E-mail</label>
            <input type='email' placeholder='email' name='email' id='email' value={registerFormData.email} onChange={handleChange} required />
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='password' name='password' id='password' value={registerFormData.password} onChange={handleChange} required />
            <label htmlFor='password_confirmation'>Confirm Password</label>
            <input type='password' placeholder='confirm password' name='password_confirmation' id='password_confirmation' value={registerFormData.password_confirmation} onChange={handleChange} required />
            <label htmlFor='checkbox' className='input-checkbox-label'>
              <input className='input-checkbox' type='checkbox' name='legal_agree' value={registerFormData.legal_agree} onChange={handleChange} required />
              I agree
            </label>
            {formError && <p className='auth-form-error'>{formError}</p>}
            <button type='submit'>Sign up</button>
          </form>
          <Link to={'/login'} className='link-to'>Log in</Link>
        </section>
      </main>
      </div>
    </>
  )
}