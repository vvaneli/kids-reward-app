import axios from 'axios'
import Form from '../subcomponents/Form'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../lib/auth'

//! Uses form component

export default function GoalAddNew() {

  const fields = {
    title: 'text',
    title_audio_url: 'text',
    // date_start: Date(),
    // date_end: Date(),
    date_start: 'date',
    date_end: 'date',
    image1: 'file',
    // image1: 'image',
    notes: 'text',
    refs_assignees: 'number',
    ref_rewards_define: 'number',
    ref_story: 'number',
  }

  const navigate = useNavigate()

  async function handleCreate(formData) {
    const { data } = await axios.post('/api/goals/add/', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    // navigate(`/events/${data._id}`)
  }
  return (
    <>
      <main id='goal-add-new'>
        <h1>Goal Add New</h1>
        <Form request={handleCreate} fields={fields} submit="Save"/>
      </main>
    </>
  )
}