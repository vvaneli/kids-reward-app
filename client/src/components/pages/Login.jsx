import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../../lib/auth'

export default function Login() {

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  })
  // const [successMsg, setSuccessMsg] = useState('')
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      // await axios.post('/api/account/login', loginFormData)
      const { data: { message, access } } = await axios.post('/api/account/login/', loginFormData)
      // If successful:
      // setSuccessMsg(message)
      setToken(access) // save token to localStorage
      // saveMsgLogin(message)
      navigate('/home', { state: { successMsg: message } })
    } catch (error) {
      console.log(error)
      // console.log(error.response.data.message)
      setFormError(error.response.data.message)
    }
  }

  function handleChange(e) {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
    setFormError('') // resets the error when typing into a form field
    console.log(loginFormData, formError)
  }

  return (
    <>
      <main id='login'>
        <section className='auth-form'>
          <h1>Log in</h1>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor='text'>Username</label>
            <input type='text' placeholder='username' name='username' id='username' value={loginFormData.username} onChange={handleChange} required />
            {/* <label htmlFor='email'>E-mail</label>
            <input type='email' placeholder='email' name='email' id='email' value={loginFormData.email} onChange={handleChange} required /> */}
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='password' name='password' id='password' value={loginFormData.password} onChange={handleChange} required />
            {formError && <p className='auth-form-error'>{formError}</p>}
            <button type='submit'>Log in</button>
          </form>
          <p className='link-to'><a href='#'>Reset Password</a></p>
          <Link to={'/register'} className='link-to'>Sign Up</Link>
        </section>
      </main>
    </>
  )

}