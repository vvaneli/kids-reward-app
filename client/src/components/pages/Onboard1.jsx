import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken, getMyProfileId } from '../../lib/auth'

import profile from '../../assets/default_profile.svg'
// import arrowLeft from '../../assets/arrow_left_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import arrowRight from '../../assets/arrow_right_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import ImageUpload from '../elements/ImageUpload'

import { getRewardDefine1, getRewardDefine2, getRewardDefine3, getTaskDefine1, getTaskDefine2, getStory1, getStory2, getStory3 } from '../elements/OnboardItems'

//! NEED TO ADD OWNER TO STORY MODEL, THEN FILTER BY OWNER

export default function Onboard1() {

  const myId = getMyProfileId()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    // username: '',
    email: '',
    access_level: 1,
    onboarding_counter: 1,
    // birthday: Date(),
    ref_head: Number(myId),
  })

  // const [myAccount, setMyAccount] = useState()
  const [formError, setFormError] = useState([])
  // const [error, setError] = useState([])

  const [display1, setDisplay1] = useState('')
  const [display2, setDisplay2] = useState('hide')
  const [display3, setDisplay3] = useState('hide')
  const [display4, setDisplay4] = useState('hide')

  const navigate = useNavigate()

  async function handleAddRewardDefItems(e) {
    e.preventDefault()
    setDisplay1('hide')
    setDisplay2('')
    try {
      await axios.post(`/api/rewards-define/add/`, getRewardDefine1, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      await axios.post(`/api/rewards-define/add/`, getRewardDefine2, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      await axios.post(`/api/rewards-define/add/`, getRewardDefine3, {
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
    setDisplay2('hide')
    setDisplay3('')
    try {
      await axios.post(`/api/tasks-define/add/`, getTaskDefine1, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      await axios.post(`/api/tasks-define/add/`, getTaskDefine2, {
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
    setDisplay3('hide')
    setDisplay4('')
    try {
      await axios.post(`/api/stories/add/`, (getStory1), {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      await axios.post(`/api/stories/add/`, (getStory2), {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      await axios.post(`/api/stories/add/`, (getStory3), {
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
      navigate('/welcome/setup')
    } catch (error) {
      console.log(error.response.data)
      setFormError(error.response.data)
    }
  }

  function handleChange(e) {
    console.log(e.target.value)
    e.preventDefault()
    let value = e.target.value
    if (e.target.name.includes('birthday')) {
      value = new Date(value).toISOString().slice(0, 10)
    }
    setFormData({ ...formData, [e.target.name]: value })
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError('') // resets the error when typing into a form field
    console.log(formData, formError)
  }

  // function addNewAccountItems(){

  // }

  // function handlePart1() {
  //   setDisplay1('hide')
  //   setDisplay2('')
  //   handleAddTaskDefItems()
  // }

  // function handlePart2() {
  //   setDisplay2('hide')
  //   setDisplay3('')
  //   handleAddRewardDefItems()
  // }

  // function handlePart3() {
  //   setDisplay3('hide')
  //   setDisplay4('')
  //   handleAddStoryItems()
  // }

  return (
    <>
      <div className='onboard wrapper'>
        <main id='onboard1'>
          <header>
            {/* <img className='logo' src={logoWord} alt='Smelly Earnie logo' /> */}
            <h1>Welcome!</h1>
          </header>
          <aside className='onboard-info'>
            <h2>Smelly Earlie helps little people practice good habits</h2>

            <div className={display1}>
              <h3>Youngsters can:</h3>
              <ul>
                <li>Understand what&apos;s a positive or a negative behaviour. We call this an &lsquo;earnie&rsquo; or a &lsquo;smelly&rsquo;.</li>
                <li>Earn rewards by accumulating &lsquo;earnies&rsquo; towards a goal.</li>
                {/* <li>The fewer &lsquo;smellies&rsquo; they do, the faster they achieve a reward goal.</li> */}
                <li>See a visual &lsquo;story&rsquo; that reflects their progress.</li>
                <li>Learn to correlate their actions with outcomes.</li>
              </ul>
              <div className='onboard-nav'>
                <div className='spacer'></div>
                <button onClick={handleAddRewardDefItems}><img src={arrowRight} alt='next' /></button>
                {/* <button><img src={arrowLeft} alt='back' /></button> */}
              </div>
            </div>

            <div className={display2}>
              <h3>You can:</h3>
              <ul>
                <li>Define positive or negative actions (called &lsquo;tasks&rsquo;).</li>
                <li>Define rewards when positive tasks accumulate.</li>
                <li>Set goals for &lsquo;youngsters&rsquo; to follow.</li>
              </ul>
              <div className='onboard-nav'>
                <div className='spacer'></div>
                <button onClick={handleAddTaskDefItems}><img src={arrowRight} alt='next' /></button>
                {/* <button><img src={arrowLeft} alt='back' /></button> */}
              </div>
            </div>

            <div className={display3}>
              <h3>You and your family group can:</h3>
              <ul>
                <li>Log tasks done towards a goal.</li>
                <li>Help manage and reinforce good habits.</li>
              </ul>
              <div className='onboard-nav'>
                <div className='spacer'></div>
                <button onClick={handleAddStoryItems}><img src={arrowRight} alt='next' /></button>
                {/* <button><img src={arrowLeft} alt='back' /></button> */}
              </div>
            </div>
          </aside>

          <article className={display4}>
            <h2>Let&apos;s set up your account&#8230;</h2>
            <form onSubmit={handleSubmit}>

              <div className='form-field-group upload-field'>
                <p>Profile image:</p>
                <img className='upload-preview-img' src={profile} alt='profile image' />
                <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image_profile'} />
              </div>

              <div className='form-field-group'>
                <label htmlFor='nickname'>Nickname<span className='required'>*</span></label>
                <input type='text' placeholder='How youngsters call you' name='nickname' id='nickname' value={formData.nickname} onChange={handleChange} required />
                {/* <small>(the name little people call you by)</small> */}
              {/* </div>

              <div className='form-field-group'> */}
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
          </article>

        </main>
      </div>
    </>
  )
}