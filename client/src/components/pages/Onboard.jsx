import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken, getMyProfileId } from '../../lib/auth'

// import Form2 from '../subcomponents/Form2'
import profile from '../../assets/default_profile.svg'
// import arrowLeft from '../../assets/arrow_left_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import arrowRight from '../../assets/arrow_right_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import ImageUpload from '../elements/ImageUpload'

import { getRewardDefine1, getRewardDefine2, getRewardDefine3, getTaskDefine1, getTaskDefine2, getStory1, getStory2, getStory3} from '../elements/OnboardItems'
// import { getRewardDefine1, getRewardDefine2, getRewardDefine3 } from '../elements/OnboardItems'

export default function Onboard() {

  const myId = getMyProfileId()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    // username: '',
    email: '',
    access_level: 1,
    // birthday: Date(),
    ref_head: Number(myId),
  })

  // const [myAccount, setMyAccount] = useState()
  const [formError, setFormError] = useState([])
  // const [error, setError] = useState([])

  const navigate = useNavigate()

  async function handleAddRewardDefItems(e) {
    e.preventDefault()
    try {
      await axios.post(`/api/rewards-define/add-list/`, (getRewardDefine1, getRewardDefine2, getRewardDefine3), {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      // navigate('/welcome/add')
    } catch (error) {
      console.log(error.response.data.detail)
      setFormError(error.response.data.detail)
    }
  }

  async function handleAddTaskDefItems(e) {
    e.preventDefault()
    try {
      await axios.post(`/api/tasks-define/add-list/`, (getTaskDefine1, getTaskDefine2), {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      // navigate('/welcome/add')
    } catch (error) {
      console.log(error.response.data.detail)
      setFormError(error.response.data.detail)
    }
  }

  async function handleAddStoryItems(e) {
    e.preventDefault()
    try {
      await axios.post(`/api/stories/add-list/`, (getStory1, getStory2, getStory3), {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      // navigate('/welcome/add')
    } catch (error) {
      console.log(error.response.data.detail)
      setFormError(error.response.data.detail)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.patch(`/api/account/${myId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      navigate('/welcome/add')
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
    setFormData({ ...formData, [e.target.name]: value })
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError('') // resets the error when typing into a form field
    console.log(formData, formError)
  }

  // function addNewAccountItems(){

  // }

  return (
    <>
      <div className='wrapper'>
        <main id='onboard'>
          <section className='onboard-form'>
            <header>
              {/* <img className='logo' src={logoWord} alt='Smelly Earnie logo' /> */}
              <h1>Welcome!</h1>
            </header>
            <section>
              <h2>Smelly Earlie helps little people practice good habits</h2>

              <div>
                <p>You can:</p>
                <ul>
                  <li>Define positive or negative actions (called &lsquo;tasks&rsquo;).</li>
                  <li>Define rewards when positive tasks accumulate.</li>
                  <li>Set goals for little people to follow.</li>
                </ul>
                <div className='onboard-nav'>
                  <div className='spacer'></div>
                  <button onClick={handleAddRewardDefItems}><img src={arrowRight} alt='next' />REWARDS</button>
                  {/* <button><img src={arrowLeft} alt='back' /></button> */}
                </div>
              </div>

              <div>
                <p>Little people can:</p>
                <ul>
                  <li>Understand what&apos;s a positive (an &lsquo;earnie&rsquo;) or a negative behaviour (a &lsquo;smelly&rsquo;).</li>
                  <li>Earn rewards by accumulating &lsquo;earnies&rsquo; towards a goal.</li>
                  <li>See a visual &lsquo;story&rsquo; that reflects their progress.</li>
                  <li>Learn to correlate their actions with outcomes.</li>
                </ul>
                <div className='onboard-nav'>
                  <div className='spacer'></div>
                  <button onClick={handleAddTaskDefItems}><img src={arrowRight} alt='next' />TASKS</button>
                  {/* <button><img src={arrowLeft} alt='back' /></button> */}
                </div>
              </div>

              <div>
                <p>Your family group can:</p>
                <ul>
                  <li>Log tasks done towards a goal.</li>
                  <li>Help manage and reinforce good habits.</li>
                </ul>
              </div>

              <div className='onboard-nav'>
                  <div className='spacer'></div>
                  <button onClick={handleAddStoryItems}><img src={arrowRight} alt='next' />STORIES</button>
                  {/* <button><img src={arrowLeft} alt='back' /></button> */}
                </div>

            </section>

            <section>
              <h2>Let&apos;s set up your account&#8230;</h2>
              <form onSubmit={handleSubmit}>

                <div className='form-field-group'>
                  <img src={profile} alt='profile image' />
                  <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image_profile'} />
                </div>

                <div className='form-field-group'>
                  <label htmlFor='nickname'>Nickname<span className='required'>*</span></label>
                  <input type='text' placeholder='The name little people call you by' name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} required />
                  {/* <small>(the name little people call you by)</small> */}
                </div>

                <div className='form-field-group'>
                  <label htmlFor='first_name'>First name</label>
                  <input type='text' placeholder='' name='first_name' id='first_name' value={formData.first_name} onChange={handleChange} />
                  <label htmlFor='last_name'>Last name</label>
                  <input type='text' placeholder='' name='last_name' id='last_name' value={formData.last_name} onChange={handleChange} />
                </div>

                <p><small><span className='required'>*</span> indicates a required field. You can edit these details later.</small></p>
                <div className='onboard-nav'>
                  <div className='spacer'></div>
                  <button type='submit'>Save</button>
                  {/* <button><img src={arrowLeft} alt='back' /></button> */}
                </div>
              </form>
            </section>

          </section>
        </main>
      </div>
    </>
  )
}


//     <form onSubmit={handleSubmit}>
//       <label className='label-text' htmlFor='text'>Username</label>
//       <input className='input-text' type='text' placeholder='unique username' name='username' id='username' value={formData.username} onChange={handleChange} required />
//       {/* <label htmlFor='text'>Nickname</label>
//     <input type='text' placeholder='nickname' name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} required /> */}

//     <div className='auth-form-errors'>
//     {/* <FormErrors /> */}
//     {
//       formError.length > 0 ?
//         formError.map(formError => {
//           return (
//             <p className='error'>{formError}</p>
//           )
//         })
//         :
//         <p className='error'></p>
//     }
//   </div>
//   <button type='submit'>Sign up</button>
// </form>
// <Link to={'/login'} className='link-to'>Already have an account? Log in</Link>


{/* <div className='register wrapper'>
        <main id='register'>
          <section className='auth-form'>
            <img className='logo' src={logoWord} alt='Smelly Earnie logo' />
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
              <label className='label-text' htmlFor='text'>Username</label>
              <input className='input-text' type='text' placeholder='unique username' name='username' id='username' value={formData.username} onChange={handleChange} required />
              <label htmlFor='text'>Nickname</label>
            <input type='text' placeholder='nickname' name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} required />
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
                <FormErrors />
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
              <button type='submit'>Sign up</button>
            </form>
            <Link to={'/login'} className='link-to'>Already have an account? Log in</Link>
          </section>
        </main>
      </div> */}