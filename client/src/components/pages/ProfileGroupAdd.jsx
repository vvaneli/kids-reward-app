import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'
// import accessLevelByName from '../elements/accessLevelByName'
import profile from '../../assets/default_profile.svg'
import ImageUpload from '../elements/ImageUpload.jsx'

export default function ProfileGroupAdd() {

  // const [profileItem, setProfileItem] = useState()

  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    birthday: Date(),
    access_level: Number(),
    legal_agree: Boolean(),
  })

  const today = new Date().toISOString().slice(0, 10);

  const [errorMsgs, setErrorMsgs] = useState()
  const [formError, setFormError] = useState([])
  // const [error, setError] = useState([])

  // let { profileId } = useParams()

  const { state } = useLocation() // Preset access_level from onboarding screens
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/account/group/add/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      if (state) {
        navigate('/welcome/add', { state: { access_level: state.access_level } }) // if came from onboarding, go back there to add another profile
      } else {
        navigate(`/profiles/group`)
      }
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
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

  // If coming from onboarding screens, set the access_level passed down
  function setAccessLevel() {
    if (state) {
      formData.access_level = Number(state.access_level)
    }
  }

  function handleChange(e) {
    console.log(e.target.value)
    e.preventDefault()
    let value = e.target.value
    // for dates
    if (e.target.name.includes('birthday')) {
      value = new Date(value).toISOString().slice(0, 10)
    }
    // for dropdown
    if (e.target.multiple) {
      const valueOptions = ([...e.target.options].filter(option => option.selected).map(option => option.value))
      value = [...valueOptions]
    }
    // setFormData({ ...formData, [e.target.name]: value })
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    // setFormError('') // resets the error when typing into a form field
    setAccessLevel()
    // for checkbox
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : value })
    setFormError('')
    console.log('formData: ', formData)
    console.log('formError: ', formError)
  }

  // function accessLevelByName() {
  //   console.log('Level: ', profileItem.access_level)
  //   if (profileItem.access_level === 4) {
  //     return 'Youngster'
  //   } else if (profileItem.access_level === 3) {
  //     return 'Helper'
  //   } else if (profileItem.access_level === 2) {
  //     return 'Elder'
  //   } else if (profileItem.access_level === 1) {
  //     return 'Head of this group'
  //   } else {
  //     return 'not yet assigned'
  //   }
  // }

  return (
    <>
      <main id='profile-group-add'>
        <h1>Add a Group Member</h1>
        {/* <Link to={'/profiles'}><p className=''>All Profiles</p></Link> */}
        {/* {profileItem ? */}
        <form onSubmit={handleSubmit}>
          {/* <h2>{profileItem.nickname}</h2> */}

          <div className='form-field-group'>
            <p>Profile image:</p>
            <img src={profile} alt='profile image' />
            <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image_profile'} />
          </div>

          <div className='form-field-group'>
            {/* <p>Nickname:</p> */}
            <label htmlFor='text'>Nickname<span className='required'>*</span></label>
            <input type='text' placeholder='Name the youngster is called by' name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} required />
          </div>

          <div className='form-field-group'>
            {/* <p>Username:</p> */}
            <label className='label-text' htmlFor='username'>Unique Username<span className='required'>*</span></label>
            <input className='input-text' type='text' placeholder='Unique username' name='username' id='username' value={formData.username} onChange={handleChange} required />
          </div>

          <div className='form-field-group'>
            {/* <p>First name:</p> */}
            <label htmlFor='first_name'>First name</label>
            <input type='text' placeholder='First name' name='first_name' id='first_name' value={formData.first_name} onChange={handleChange} />
          </div>

          <div className='form-field-group'>
            {/* <p>Last name:</p> */}
            <label htmlFor='last_name'>Last name</label>
            <input type='text' placeholder='Last name' name='last_name' id='last_name' value={formData.last_name} onChange={handleChange} />
          </div>

          {/* <div className='form-field-group'>
              <p>Birthday:</p>
              <label htmlFor='birthday'>New birthday:</label>
              <input type='date' max={today} id='birthday' name='birthday' value={formData.birthday} onChange={handleChange} />
            </div> */}

          {/* If a Youngster, show 'birthday' and 'password' fields OR if adult, show email field */}
          {state && state.access_level === 4 ?
            <>
              <div className='form-field-group'>
                <label className='label-password' htmlFor='password'>Password<span className='required'>*</span></label>
                <input className='input-password' type='password' placeholder='password' name='password' id='password' value={formData.password} onChange={handleChange} required />
                <label className='label-password' htmlFor='password_confirmation'>Confirm Password<span className='required'>*</span></label>
                <input className='input-password' type='password' placeholder='confirm password' name='password_confirmation' id='password_confirmation' value={formData.password_confirmation} onChange={handleChange} required />
              </div>

              <div className='form-field-group'>
                <label htmlFor='birthday'>Birthday</label>
                <input type='date' max={today} id='birthday' name='birthday' value={formData.birthday} onChange={handleChange} />
              </div>

              <label className='label-checkbox' htmlFor='legal_agree'><input className='input-checkbox' type='checkbox' name='legal_agree' value={formData.legal_agree} onChange={handleChange} required />
                I am, or have permission from, the legal guardian to add this child to my account
              </label>
            </>
            :
            <>
              <div className='form-field-group'>
                {/* <p>Email:</p> */}
                <label className='label-email' htmlFor='email'>E-mail<span className='required'>*</span></label>
                <input className='input-email' type='email' placeholder='E-mail' name='email' id='email' value={formData.email} onChange={handleChange} required />
              </div>
              <label className='label-checkbox' htmlFor='legal_agree'><input className='input-checkbox' type='checkbox' name='legal_agree' value={formData.legal_agree} onChange={handleChange} required />
                I have permission from this person to add their details to my account
              </label>
            </>
          }

          {/* If coming from onboarding screens, hide dropdown */}
          {(state) ?
            <div></div>
            :
            <>
              <hr />
              <div className='form-field-group'>
                {/* <p>Access level: {profileItem.access_level}</p> */}
                <p>Account type:</p>
                {profileItem.access_level === 1 ?
                  <>
                    <p><strong>You are the head owner of this group.</strong></p>
                    <ul>
                      <li>To ensure a group always has a head owner, you cannot change this account type, but can transfer your role.</li>
                      <li>To transfer your role as the head owner, replace both &lsquo;username&rsquo; and &lsquo;email&rsquo; with the email address of the person you want to transfer to.</li>
                      <li>Note: if you wish to remain a member of this group afterwards, then <em>before transferring your head owner role,</em> first add a new account with yourself as a group member.</li>
                    </ul>
                  </>
                  :
                  <>
                    <label htmlFor='access_level' hidden></label>
                    <select value={profileItem.access_level} name='access_level' id='access_level' onChange={handleChange}>
                      <option value={profileItem.access_level} >Pick an account type</option>
                      <option key='2' value='2' disabled>Elder</option>
                      <option key='3' value='3' disabled>Helper</option>
                      {/* <option key='4' value='4'>Youngster</option> */}
                    </select>
                  </>
                }
              </div>
            </>
          }

          <p><small><span className='required'>*</span> indicates a required field. You can edit these details later.</small></p>
          <button type='submit'>Save</button>
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
        </form>
        {/* //   :
        //   errorMsg ?
        //     <p><em>{errorMsg}</em></p>
        //     :
        //     <p><em>Downloading&#8230;</em></p>
        // } */}
      </main >
    </>
  )

}