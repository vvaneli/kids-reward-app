import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../../lib/auth'

export default function Register() {
  // State variables
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    password_confirmation: '',
    // legal: Boolean(),
  })
  // const [successMsg, setSuccessMsg] = useState('')
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const { data: { message, access } } = await axios.post('/api/account/register/', registerFormData)
      if (!access) throw new Error(setFormError('Couldn\'t create an account.'))
      setToken(access)
      // setSuccessMsg(message)
      navigate('/onboard', { state: { successMsg: message } })
    } catch (error) {
      console.log(error)
      console.log(error.response.data.message)
      setFormError(error.response.data.message)
    }
  }

  function handleChange(e) {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value })
    setFormError('')
    console.log(registerFormData, formError)
  }

  return (
    <>
      <main id=''>
        <section className='auth-form'>
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
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input type='password' placeholder='confirm password' name='passwordConfirm' id='passwordConfirm' value={registerFormData.passwordConfirm} onChange={handleChange} required />
            {formError && <p className='auth-form-error'>{formError}</p>}
            {/* <label className='input-checkbox-label'><input className='input-checkbox' type='checkbox' name='legal' value={registerFormData.legal} onChange={handleChange} required />I agree</label> */}
            <button type='submit'>Sign up</button>
          </form>
          <Link to={'/login'} className='link-to'>Log in</Link>
        </section>
      </main>
    </>
  )
}