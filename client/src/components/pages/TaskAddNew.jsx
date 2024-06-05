import axios from 'axios'
// import Form from '../subcomponents/Form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../lib/auth'

export default function TaskAddNew() {

  const [formData, setFormData] = useState({
    title: '',
    title_audio_url: '',
    date_start: new Date(),
    date_end: Date(),
    image1: '',
    notes: '',
    refs_assignees: [],
    ref_rewards_define: Number(),
    ref_story: Number(),
  })
  const [rewardDefineList, setRewardDefineList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  // useEffect(() => {
  //   async function getRewardDefineList() {
  //     try {
  //       const { data } = await axios.get('/api/rewards-define/', {
  //         headers: {
  //           Authorization: `Bearer ${getToken()}`
  //         }
  //       })
  //       console.log('data: ', data)
  //       if (data.length === 0) { setErrorMsg('Nothing here yet. Define a reward to use for goal setting.') }
  //       setRewardDefineList(data)
  //     } catch (error) {
  //       console.log(error.message)
  //       setErrorMsg(error.message)
  //     }
  //   }
  //   getRewardDefineList()
  // }, [])

  async function handleSubmit(formData) {
    const { data } = await axios.post('/api/tasks/add/', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    navigate(`/tasks/${data.id}`)
  }

  function handleChange(e) {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError('')
  }

  return (
    <>
      <main id='task-add-new'>
        <h1>TaskAddNew</h1>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <label htmlFor=''></label>
          <input type='text' id='' name=''  value='{formData.title}' onChange={handleChange} required placeholder=''/>

          {/* title_audio_url */}
          <label htmlFor=''></label>
          <input type='file' id='' name=''  value='{formData.title_audio_url}' onChange={handleChange} placeholder=''/>

          {/* date_start */}
          <label htmlFor=''></label>
          <input type='date' id='' name=''  value='{formData.date_start}' onChange={handleChange} required placeholder=''/>
          {/* date_end */}
          <label htmlFor=''></label>
          <input type='date' id='' name=''  value='{formData.date_end}' onChange={handleChange} placeholder=''/>

          {/* image1 */}
          <label htmlFor=''></label>
          <input type='url' id='' name=''  value='{formData.image1}' onChange={handleChange} placeholder=''/>

          {/* notes */}
          <label htmlFor=''></label>
          <input type='text' id='notes' name='notes'  value='{formData.notes}' onChange={handleChange} placeholder='Notes'/>

          {/* refs_assignees */}
          {/* refs_rewards */}
          {/* ref_story */}

          {formError && <p><em>{formError}</em></p>}
          <button type='submit'>Save</button>
        </form>
        {/* <Form request={handleCreate} fields={fields} submit="Create"/> */}

      </main>
    </>
  )
}