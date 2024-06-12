//! https://www.django-rest-framework.org/api-guide/authentication/

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setToken, isLoggedIn } from '../../lib/auth'

// import FormErrors from '../elements/FormErrors'
import logoWord from '../../assets/smelly-earnie-logo.svg'

export default function Register() {

  // State variables
  const [formData, setFormData] = useState({
    username: '',
    // nickname: '',
    email: '',
    password: '',
    password_confirmation: '',
    legal_agree: Boolean(),
  })
  // const [successMsg, setSuccessMsg] = useState('')
  const [errorMsgs, setErrorMsgs] = useState()
  const [formError, setFormError] = useState()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      // const { data: { message, access } } = await axios.post('/api/account/register/', formData)
      // const { data: { access } } = await axios.post('/api/account/register/', formData)
      await axios.post('/api/account/register/', formData)
      // if (!access) throw new Error(setFormError('Couldn\'t create an account.'))
      // setToken(access)
      // console.log('message: ', message)
      //! TO BE UPDATED, NEED TO RETURN A TOKEN IN REGISTER VIEW
      // console.log('isLoggedIn: ',isLoggedIn())
      if (isLoggedIn === true) {
        navigate('/welcome')
      } else {
        navigate('/login')
      }
    } catch (error) {
      // console.log(error)
      // console.log(error.response.data)
      if (error.response) {
        const addError = []
        if (error.response.data.username !== undefined) { addError.push(error.response.data.username[0]) }
        if (error.response.data.email !== undefined) { addError.push(error.response.data.email[0]) }
        if (error.response.data.non_field_errors !== undefined) { addError.push(error.response.data.non_field_errors[0]) }
        console.log('addError: ', addError)
        setErrorMsgs(addError)
      }
    }
  }

  //   function handleCheckbox(e) {
  // console.log(e.target.checked)
  //   }

  function handleChange(e) {
    // const inputValue = e.target.value

    // // checkbox input
    // if (e.target.checked) { 
    // // spread existing options into new options array, add the new value
    // setFormData({ ...formData, legal_agree: [...formData.legal_agree, inputValue]})
    // } else {
    //   // else remove the unchecked box by filtering it out of the existing array
    //   setFormData({...formData, legal_agree: formData.legal_agree.filter(option => option !== inputValue)})
    // }

    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    setFormError('')
    console.log('formData: ', formData)
    console.log('formError: ', formError)
  }

  return (
    <>
      <div className='register wrapper'>
        <main id='register'>
          <div className='auth-form-container'>
            <article>
              <img className='logo' src={logoWord} alt='Smelly Earnie logo' />
              <h1>Register</h1>
              <form onSubmit={handleSubmit}>

                <label className='label-text' htmlFor='username'>Username</label>
                <input className='input-text' type='text' placeholder='unique username' name='username' id='username' value={formData.username} onChange={handleChange} required />

                {/* <label htmlFor='nickname'>Nickname</label>
            <input type='text' placeholder='nickname' name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} required /> */}

                <label className='label-email' htmlFor='email'>E-mail</label>
                <input className='input-email' type='email' placeholder='e-mail' name='email' id='email' value={formData.email} onChange={handleChange} required />

                <label className='label-password' htmlFor='password'>Password</label>
                <input className='input-password' type='password' placeholder='password' name='password' id='password' value={formData.password} onChange={handleChange} required />

                <label className='label-password' htmlFor='password_confirmation'>Confirm Password</label>
                <input className='input-password' type='password' placeholder='confirm password' name='password_confirmation' id='password_confirmation' value={formData.password_confirmation} onChange={handleChange} required />

                <label className='label-checkbox' htmlFor='legal_agree'><input className='input-checkbox' type='checkbox' name='legal_agree' value={formData.legal_agree} onChange={handleChange} required />
                  I agree
                </label>

                <div className='auth-form-errors'>
                  {/* <FormErrors /> */}
                  {
                    // errorMsgs.length > 0 ?
                    errorMsgs ?
                      errorMsgs.map(errorMsg => {
                        return (
                          <p className='error'>{errorMsg}</p>
                        )
                      })
                      :
                      <p className='error'></p>
                  }
                </div>
                <button type='submit'>Sign up</button>
              </form>
            </article>
            <aside>
              <Link to={'/login'} className='link-to'>Already have an account? Log in</Link>
            </aside>
          </div>
        </main>
      </div>
    </>
  )
}