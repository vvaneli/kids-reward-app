import axios from 'axios'
// import Form from '../subcomponents/Form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../../lib/auth'
import ImageUpload from '../elements/ImageUpload.jsx'

export default function TaskAddNew() {

  // const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    image1: undefined, // so when image is not povided, DB default will be used
    image2: '',
    notes: '',
    refs_assignees: [],
    ref_task_define: Number(),
    ref_goal_log: '', // in case there is no goal set
  })

  // Get related data
  const [taskDefineList, setTaskDefineList] = useState([])
  const [profilesList, setProfilesList] = useState([])
  const [goalsList, setGoalsList] = useState([])

  // Set errors
  const [errorMsg, setErrorMsg] = useState('')
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  //! GET TASK DEFINITIONS
  useEffect(() => {
    async function getTaskDefineList() {
      try {
        const { data } = await axios.get('/api/tasks-define/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Define a task towards reward goals.') }
        setTaskDefineList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getTaskDefineList()
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

  //! GET GOALS
  useEffect(() => {
    async function getGoalsList() {
      try {
        const { data } = await axios.get('/api/goals/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Set a goal to earn a reward.') }
        setGoalsList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getGoalsList()
  }, [])

  //! HANDLE FORM
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    const { data } = await axios.post('/api/tasks/add/', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    navigate(`/tasks/${data.id}`)
  }

  function handleChange(e) {
    console.log(e.target.value)
    e.preventDefault()
    let value = e.target.value
    //   if e.target.name does include date_ (i.e. the input name contains string 'date_') then  Date(e.target.vale).toISOString().slice(0, 10),
    // if (e.target.name.includes('date_')) {
    //   value = new Date(value).toISOString().slice(0, 10)
    // }
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
      <main id='task-add-new'>
        <h1>Task Add New</h1>
        <form onSubmit={handleSubmit}>

          {/* ref_task_define */}
          <label htmlFor='ref_task_define'>Task done</label>
          {taskDefineList.length > 0 ?
            <select value={formData.ref_task_define} name='ref_task_define' id='ref_task_define' onChange={handleChange}>
              <option value='' disabled>Pick a task</option>
              {taskDefineList.map(taskDefineItem => {
                return (
                  <option key={taskDefineItem.id} value={taskDefineItem.id}>{taskDefineItem.title} (points: {taskDefineItem.value})</option>
                )
              })}
            </select>
            :
            errorMsg ?
              <p>{errorMsg}</p>
              :
              <p>Getting task list&#8230;</p>
          }

          {/* refs_assignees */}
          <label htmlFor='refs_assignees'>By</label>
          {profilesList.length > 0 ?
            <select multiple value={formData.refs_assignees} name='refs_assignees' id='refs_assignees' onChange={handleChange} required>
              <option value='' disabled>Pick a person</option>
              {profilesList.map(profileItem => {
                return (
                  profileItem.access_level === 4 ?
                  <option key={profileItem.id} value={profileItem.id}>{profileItem.nickname}</option>
                  :
                  <option disabled >No youngsters found</option>
                )
              })}
            </select>
            :
            errorMsg ?
              <option>{errorMsg}</option>
              :
              <option>Getting list of people&#8230;</option>
          }

          {/* ref_goal_log */}
          <label htmlFor='ref_goal_log'>Towards reward goal</label>
          {setGoalsList.length > 0 ?
            <select value={formData.ref_goal_log} name='ref_goal_log' id='ref_goal_log' onChange={handleChange}>
              <option value='' disabled>Pick a goal</option>
              {goalsList.map(goalItem => {
                return (
                  <option key={goalItem.id} value={goalItem.id}>{goalItem.title} (target points: {goalItem.ref_reward_define.value})</option>
                )
              })}
            </select>
            :
            errorMsg ?
              <p>{errorMsg}</p>
              :
              <p>Getting goal list&#8230;</p>
          }

          {/* image1 */}
          <p>Add images</p>
          {/* <label htmlFor=''></label>
          <input type='url' id='' name=''  value='{formData.image1}' onChange={handleChange} placeholder=''/> */}
          <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image1'} />

          {/* image2 */}
          {/* <label htmlFor=''></label>
          <input type='url' id='' name=''  value='{formData.image1}' onChange={handleChange} placeholder=''/> */}
          <ImageUpload formData={formData} setFormData={setFormData} fieldName={'image2'} />

          {/* notes */}
          <label htmlFor='notes'>Notes</label>
          <input type='text' id='notes' name='notes' value={formData.notes} onChange={handleChange} placeholder='Notes' />

          {formError && <p><em>{formError}</em></p>}
          <button type='submit'>Save</button>

        </form>
        {/* <Form request={handleCreate} fields={fields} submit="Create"/> */}

      </main>
    </>
  )
}