import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'
// import accessLevelByName from '../elements/accessLevelByName'

// Sub-Components
import ImageUpload from '../elements/ImageUpload'
import NavBar from '../subcomponents/NavBar.jsx'

export default function ProfileItemEdit() {

  const [profileItem, setProfileItem] = useState()

  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    // birthday: Date(),
    access_level: Number(),
  })


  const [errorMsg, setErrorMsg] = useState('')
  const [formError, setFormError] = useState([])
  // const [error, setError] = useState([])

  let { profileId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    async function getProfileItem() {
      try {
        const { data } = await axios.get(`/api/account/${profileId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        // if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setProfileItem(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getProfileItem()
    // accessLevelByName()
  }, [profileId])

  async function handleSubmit(e) {
    e.preventDefault()
    // if DB required fields are empty, use existing values
    if (!formData.username) {
      formData.username = profileItem.username //! Need to change this so there is a pre-validate to check new username is unique
    }
    if (!formData.email) {
      formData.email = profileItem.email
    }
    if (!formData.nickname) {
      formData.nickname = profileItem.nickname
    }
    try {
      await axios.patch(`/api/account/${profileId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      navigate(`/profiles/${profileId}`)
    } catch (error) {
      console.log(error.response.data)
      setFormError(error.response.data)
    }
  }

  function handleChange(e) {
    console.log(e.target.value)
    e.preventDefault()
    let value = e.target.value
    if (e.target.name.includes('birthday' || 'date_')) {
      value = new Date(value).toISOString().slice(0, 10)
    }
    if (e.target.multiple) {
      const valueOptions = ([...e.target.options].filter(option => option.selected).map(option => option.value))
      value = [...valueOptions]
    }
    setFormData({ ...formData, [e.target.name]: value })
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError('') // resets the error when typing into a form field
    console.log(formData, formError)
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
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Edit Profile</h1>
        </header>
        <main id='profile-item-edit'>
          {/* <Link to={'/profiles'}><p className=''>All Profiles</p></Link> */}
          {profileItem ?
            <form onSubmit={handleSubmit}>
              <h2>{profileItem.nickname}</h2>

              <div className='form-field-group'>
                <p>Profile image:</p>
                <img src={profileItem.image_profile} alt='profile image' />
                <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image_profile'} />
              </div>

              <div className='form-field-group'>
                <p>Nickname: {profileItem.nickname}</p>
                <label htmlFor='text'>Nickname<span className='required'>*</span></label>
                <input type='text' placeholder={profileItem.nickname} name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} />
              </div>

              <div className='form-field-group'>
                <p>Username: {profileItem.username}</p>
                <label className='label-text' htmlFor='text'>Unique Username<span className='required'>*</span></label>
                <input className='input-text' type='text' placeholder={profileItem.username} name='username' id='username' value={formData.username} onChange={handleChange} />
              </div>

              <div className='form-field-group'>
                <p>Email: {profileItem.email}</p>
                <label className='label-email' htmlFor='email'>E-mail<span className='required'>*</span></label>
                <input className='input-email' type='email' placeholder={profileItem.email} name='email' id='email' value={formData.email} onChange={handleChange} />
              </div>

              <div className='form-field-group'>
                <p>First name: {profileItem.first_name}</p>
                <label htmlFor='text'>First name</label>
                <input type='text' placeholder={profileItem.first_name} name='first_name' id='first_name' value={formData.first_name} onChange={handleChange} />
              </div>

              <div className='form-field-group'>
                <p>Last name: {profileItem.last_name}</p>
                <label htmlFor='text'>Last name</label>
                <input type='text' placeholder={profileItem.last_name} name='last_name' id='last_name' value={formData.last_name} onChange={handleChange} />
              </div>

              <div className='form-field-group'>
                <p>Birthday: {profileItem.birthday}</p>
                <label htmlFor='birthday'>New birthday:</label>
                <input type='date' id='birthday' name='birthday' value={formData.birthday} onChange={handleChange} placeholder={profileItem.birthday} />
              </div>

              {/* If a Youngster, show 'birthday' field */}
              {profileItem.access_level === 4 ?
                <div className='form-field-group'>
                  <p>Birthday: {profileItem.birthday}</p>
                  <label htmlFor='birthday'>Birthday</label>
                  <input type='date' id='birthday' name='birthday' value={formData.birthday} onChange={handleChange} placeholder={profileItem.birthday} />
                </div>
                : <div></div>
              }
              {/* //! Need to add ability to change password */}
              {/* <p>Password: {profileItem.password}</p> */}
              {/* <p>Confirm password: {profileItem.password_confirmation}</p> */}

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
              <p><small><span className='required'>*</span> indicates a required field. You can edit these details later.</small></p>
              <button type='submit'>Save</button>
            </form>
            :
            errorMsg ?
              <p><em>{errorMsg}</em></p>
              :
              <p><em>Downloading&#8230;</em></p>
          }
        </main >
      </div>
    </>
  )
}