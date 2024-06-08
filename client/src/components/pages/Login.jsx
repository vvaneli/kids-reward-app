import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { setToken, getToken, getMyProfileId } from '../../lib/auth'

// import FormErrors from '../elements/FormErrors'
import logoWord from '../../assets/smelly-earnie-logo.svg'

export default function Login() {

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  })
  const [myAccount, setMyAccount] = useState()
  const [formError, setFormError] = useState([])
  const [error, setError] = useState()
  // const [successMsg, setSuccessMsg] = useState('')

  const navigate = useNavigate()

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const { data: { access } } = await axios.post('/api/account/login/', loginFormData)
      // If successful:
      setToken(access) // save token to localStorage
      // navigate('/dashboard')
      getAccount()
    } catch (error) {
      // console.log(error)
      // console.log(error.response.data)
      // console.log(error.response.data.detail)
      if (error.response) {
        const addError = []
        if (error.response.data.detail !== undefined) { addError.push(error.response.data.detail) }
        if (error.response.data.username !== undefined) { addError.push(error.response.data.username[0]) }
        if (error.response.data.non_field_errors !== undefined) { addError.push(error.response.data.non_field_errors[0]) }
        // console.log('addError: ', addError)
        setFormError(addError)
      }
    }
    // getAccount()
  }

  // GET ACCOUNT INFO FOR NEXT PAGE ROUTING
  async function getAccount() {
    const myId = getMyProfileId()
    try {
      const { data: { access_level, onboarding_counter } } = await axios.get(`/api/account/group/view/${myId}/`, {
      // const { data: { id, username, nickname, first_name, last_name, email, access_level, image_profile, birthday, ref_head, onboarding_counter } } = await axios.get(`/api/account/group/view/${myId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      // const myData = {
      //   id,
      //   username,
      //   nickname,
      //   first_name,
      //   last_name,
      //   email,
      //   access_level,
      //   image_profile,
      //   birthday,
      //   ref_head,
      //   onboarding_counter
      // }
      // setMyAccount(myData)
      console.log('access_level: ', access_level , '| onboarding_counter: ', onboarding_counter)
      // Go to which page...
      if (access_level === 4) {
        console.log('hit L4')
        return navigate('/kids/dashboard') // go to small people's dashboard
      }
      if ((access_level === (3||2||1)) && (onboarding_counter > 0)) {
        return navigate('/dashboard') // go to big people's dashboard
      }
      else {
        return navigate('/welcome') // go to onboarding
      }
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  function handleChange(e) {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
    setFormError('') // resets the error when typing into a form field
    console.log(loginFormData, formError)
  }

  return (
    <>
      <div className='login wrapper'>
        <main id='login'>
          <section className='auth-form'>
            <img className='logo' src={logoWord} alt='Smelly Earnie logo' />
            <h1>Log in</h1>
            <form onSubmit={handleLoginSubmit}>
              <label className='label-text' htmlFor='text'>Username</label>
              <input className='input-text' type='text' placeholder='username' name='username' id='username' value={loginFormData.username} onChange={handleChange} required />
              {/* <label htmlFor='email'>E-mail</label>
            <input type='email' placeholder='email' name='email' id='email' value={loginFormData.email} onChange={handleChange} required /> */}
              <label className='label-password' htmlFor='password'>Password</label>
              <input className='input-password' type='password' placeholder='password' name='password' id='password' value={loginFormData.password} onChange={handleChange} required />
              <div className='auth-form-errors'>
                {/* <FormErrors /> */}
                {
                  formError.length > 0 ?
                    formError.map(formError => {
                      return (
                        <p className='error'>{formError}</p>
                      )
                    })
                    :
                    <p className='error'></p>
                }
              </div>
              {/* <p className='auth-form-error'>{formError}error unexpected stuff happens! error unexpected stuff happens! error unexpected stuff happens! error unexpected stuff happens!</p> */}
              <button type='submit'>Log in</button>
            </form>
            <p className='link-to'><a href='#'>Reset Password</a></p>
            <Link to={'/register'} className='link-to'>Don&apos;t have an account? Sign Up</Link>
          </section>
        </main>
      </div>
    </>
  )
}