import axios from 'axios'
// import Form from '../subcomponents/Form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../../lib/auth'

import NavBar from '../subcomponents/NavBar.jsx'
import ImageUpload from '../elements/ImageUpload'
// import MediaUpload from '../elements/MediaUpload'

import default_goal_img from '../../assets/default_goal_log.svg'

export default function GoalAddNew() {

  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    title: '',
    title_audio_url: '',
    date_start: today,
    date_end: undefined, // so an end date is not compulsory
    image1: undefined, // so when image is not povided, DB default will be used
    notes: '',
    refs_assignees: [],
    ref_reward_define: '',
    ref_story: '',
  })

  // Get related data
  const [rewardDefineList, setRewardDefineList] = useState([])
  const [profilesList, setProfilesList] = useState([])
  const [storiesList, setStoriesList] = useState([])

  // Set errors
  const [errorMsg, setErrorMsg] = useState('')
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  //! GET REWARD DEFINITIONS
  useEffect(() => {
    async function getRewardDefineList() {
      try {
        const { data } = await axios.get('/api/rewards-define/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Define a reward to use for goal setting.') }
        setRewardDefineList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getRewardDefineList()
  }, [])

  //! GET ASSIGNEES
  useEffect(() => {
    async function getProfiles() {
      try {
        const { data } = await axios.get('/api/account/group/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        // if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setProfilesList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getProfiles()
  }, [])

  //! GET STORIES
  useEffect(() => {
    async function getStoriesList() {
      try {
        const { data } = await axios.get('/api/stories/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        // if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setStoriesList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getStoriesList()
  }, [])

  //! HANDLE FORM
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    const { data } = await axios.post('/api/goals/add/', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    navigate(`/goals/${data.id}`)
  }

  function handleChange(e) {
    console.log(e.target.value)
    e.preventDefault()
    let value = e.target.value
    //   if e.target.name does include date_ (i.e. the input name contains string 'date_') then  Date(e.target.vale).toISOString().slice(0, 10),
    if (e.target.name.includes('date_')) {
      value = new Date(value).toISOString().slice(0, 10)
    }
    if (e.target.multiple) {
      const valueOptions = ([...e.target.options].filter(option => option.selected).map(option => option.value))
      value = [...valueOptions]
    }

    setFormData({ ...formData, [e.target.name]: value })
    setFormError('')
    // console.log(formData, formError)
  }

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Goal Add New</h1>
        </header>
        <main id='goal-add-new'>
          <form onSubmit={handleSubmit}>

            {/* title */}
            <div className='form-field-group'>
              <label htmlFor='title'>Title<span className='required'>*</span></label>
              <input type='text' id='title' name='title' value={formData.title} onChange={handleChange} required placeholder='Brief headline' />
            </div>

            {/* title_audio_url */}
            {/* <label htmlFor='title_audio_url'>Audio file of spoken title</label>
          <input type='text' id='title_audio_url' name='title_audio_url' value={formData.title_audio_url} onChange={handleChange} /> */}
            {/* <MediaUpload formData={formData} setFormData={setFormData} fieldName={'title_audio_url'} /> */}

            <div className='form-field-group'>
              {/* date_start */}
              <label htmlFor='date_start'>Goal start date<span className='required'>*</span></label>
              <input type='date' id='date_start' name='date_start' min={today} value={formData.date_start} onChange={handleChange} required placeholder={today} />
              {/* date_end */}
              <label htmlFor='date_end'>Goal end date</label>
              <input type='date' id='date_end' name='date_end' value={formData.date_end} onChange={handleChange} placeholder='' />
            </div>
            {/* image1 */}
            {/* <label htmlFor='image1'>Image</label>
          <input type='text' id='image1' name='image1' value={formData.image1} onChange={handleChange} /> */}
            {/* <p>Add an image:</p> */}
            {/* <MediaUpload formData={formData} setFormData={setFormData} fieldName={'image1'} /> */}

              <p>Add an image:</p>
            <div className='form-field-group upload-field'>
              <img className='upload-preview-img' src={default_goal_img} alt='goal image' />
              <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image1'} />
            </div>

            {/* notes */}
            <div className='form-field-group'>
              <label htmlFor='notes'>Notes</label>
              <input type='text' id='notes' name='notes' value={formData.notes} onChange={handleChange} placeholder='Add a note about this goal' />
            </div>

            {/* refs_assignees */}
            <div className='form-field-group'>
              <label htmlFor='refs_assignees'>Set goal for</label>
              {profilesList.length > 0 ?
                <select multiple value={formData.refs_assignees} name='refs_assignees' id='refs_assignees' onChange={handleChange} required>
                  <option value='' disabled>Pick a person</option>
                  {profilesList.map(profileItem => {
                    return (
                      profileItem.access_level === 4 ?
                        <option key={profileItem.id} value={profileItem.id}>{profileItem.nickname}</option>
                        :
                        <></>
                    )
                  })}
                </select>
                :
                errorMsg ?
                  <option>{errorMsg}</option>
                  :
                  <option>Getting list of people&#8230;</option>
              }
              </div>

              {/* ref_reward_define */}
              <div className='form-field-group'>
              <label htmlFor='ref_reward_define'>Reward if goal is achieved</label>
              {rewardDefineList.length > 0 ?
                <select value={formData.ref_reward_define} name='ref_reward_define' id='ref_reward_define' onChange={handleChange} required>
                  <option value='' disabled>Pick a reward</option>
                  {rewardDefineList.map(rewardDefineItem => {
                    return (
                      <option key={rewardDefineItem.id} value={rewardDefineItem.id}>{rewardDefineItem.title} (target {rewardDefineItem.value})</option>
                    )
                  })}
                </select>
                :
                errorMsg ?
                  <p>{errorMsg}</p>
                  :
                  <p>Getting reward list&#8230;</p>
              }
              </div>

              {/* ref_story */}
              <div className='form-field-group'>
              <label htmlFor='ref_story'>Story</label>
              {storiesList.length > 0 ?
                <select value={formData.ref_story} name='ref_story' id='ref_story' onChange={handleChange} required>
                  <option value='' disabled>Pick a story</option>
                  {storiesList.map(storyItem => {
                    return (
                      <option key={storyItem.id} value={storyItem.id}>{storyItem.title}</option>
                      // <Link to={`/stories/${storiesList.id}`} className=''>Details</Link>
                    )
                  })}
                </select>
                :
                errorMsg ?
                  <p>{errorMsg}</p>
                  :
                  <p>Getting story list&#8230;</p>
              }
              {formError && <p><em>{formError}</em></p>}

            </div>

            <button type='submit'>Save</button>
          </form>
          {/* <Form request={handleCreate} fields={fields} submit="Create"/> */}

        </main>
      </div>
    </>
  )
}

{/* <p><em>{errorMsg}</em></p>
:
<p><em>Getting story list&#8230;</em></p> */}