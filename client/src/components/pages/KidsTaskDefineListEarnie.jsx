import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

// Images
import smelly from '../../assets/smelly.svg'
import earnie from '../../assets/earnie.svg'

export default function KidsTaskDefineListEarnie() {
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

  // {let audio = new Audio("/.mp3")}
  // const [audio, setAudio] = new Audio()

  // function handlePlay(e){
  //   const start = () => {
  //     audio.play()
  //   }
  // }

  return (
    <>
      <div id='kids-tasks-define-list' className='wrapper'>
        <main className='tasks-define kids'>

          <header>
            {/* <h1>tasks-define</h1> */}
            <img className='hero smelly' src={smelly} alt='smelly' />
            <img className='hero earnie' src={earnie} alt='earnie' />
          </header>
          <section>
            {taskDefineList.length > 0 ?
              taskDefineList.map(taskDefineList => {
                return (
                  <article key={taskDefineList.id}>
                    {/* <h2>{taskDefineList.title}</h2> */}
                    <figure>
                      <img className='audioImg' src={taskDefineList.image1} alt={taskDefineList.title} />
                      <audio>
                        <source src={taskDefineList.title_audio_url} />
                      </audio>
                    </figure>
                    {/* <p>{taskDefineList.title_audio_url}</p> */}
                    {/* <p>{taskDefineList.value}</p> */}
                    {/* <p>{taskDefineList.description}</p> */}
                    {/* <p>{taskDefineList.description_audio_url}</p> */}
                    {/* <Link to={`/tasks-define/${taskDefineList.id}`} className=''>Details</Link> */}
                  </article>
                )
              })
              :
              errorMsg ?
                <p><em>{errorMsg}</em></p>
                :
                <p><em>Downloading&#8230;</em></p>
            }
          </section>
        </main>
      </div>
    </>
  )
}