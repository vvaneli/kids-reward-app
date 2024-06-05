import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function TaskDefineList() {
  const [taskDefineList, setTaskDefineList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getTaskDefineList() {
      try {
        const { data } = await axios.get('/api/tasks-define/', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        if (data.length === 0) { setErrorMsg('Nothing here yet. Define a Task to contribute towards a goal.') }
        setTaskDefineList(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getTaskDefineList()
  }, [])

  return (
    <>
      <main id='tasks-define-list'>
        <h1>tasks-define</h1>
        {taskDefineList.length > 0 ?
              taskDefineList.map(taskDefineList => {
                return (
                  <article key={taskDefineList.id}>
                    <h2>{taskDefineList.title}</h2>
                    <img src={taskDefineList.image1} alt={taskDefineList.title} />
                    <p>{taskDefineList.title_audio_url}</p>
                    <p>{taskDefineList.value}</p>
                    <p>{taskDefineList.description}</p>
                    <p>{taskDefineList.description_audio_url}</p>
                    <Link to={`/tasks-define/${taskDefineList.id}`} className=''>Details</Link>
                  </article>
                )
              })
              :
              errorMsg ?
                <p><em>{errorMsg}</em></p>
                :
                <p><em>Downloading&#8230;</em></p>
            }
      </main>
    </>
  )
}