import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'

// Sub-Components
import NavBar from '../subcomponents/NavBar.jsx'

export default function GoalsList() {
  const [goalsList, setGoalsList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

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

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Goals</h1>
        </header>
        <main id='goals-list'>
          {goalsList.length > 0 ?
            goalsList.map(goalItem => {
              return (
                <article key={goalItem.id}>
                  <h2>{goalItem.title}</h2>
                  <p>{goalItem.title_audio_url}</p>
                  <img src={goalItem.image1} alt={goalItem.title} />
                  <p>Progress: {goalItem.ref_reward_define.value}</p>
                  <p>Start: {goalItem.date_start}</p>
                  {
                    goalItem.date_end ?
                      <p>End: {goalItem.date_end}</p>
                      :
                      <p>End: no end date</p>

                  }
                  <p>{goalItem.description}</p>
                  <p>{goalItem.description_audio_url}</p>
                  <p>{goalItem.notes}</p>
                  <p>{goalItem.reward_is_claimed}</p>
                  <p>{goalItem.timestamp_reward_claimed}</p>
                  <h3>{goalItem.ref_story.title}</h3>
                  <p>{goalItem.ref_story.title_audio_url}</p>
                  <p>{goalItem.ref_story.about}</p>
                  <p>{goalItem.ref_story.about_audio_url}</p>
                  {/* <p>Steps: {goalItem.ref_story.steps}</p> */}
                  <p>{goalItem.ref_story.scenes_narrative}</p>
                  <p>{goalItem.ref_story.scenes_narrative_audio_url}</p>
                  {/* //! needs to be a calculated field */}
                  <img src={goalItem.ref_story.scenes_artwork[1]} alt={goalItem.ref_story.title} />
                  {/* <img src={goalItem.ref_story.items_artwork[0]} alt={goalItem.ref_story.title} /> */}
                  <h3>{goalItem.ref_reward_define.title}</h3>
                  <p>{goalItem.ref_reward_define.title_audio_url}</p>
                  <img src={goalItem.ref_reward_define.image1} alt={goalItem.ref_reward_define.title} />
                  <p>{goalItem.ref_reward_define.value}</p>
                  <p>{goalItem.ref_reward_define.description}</p>
                  <p>{goalItem.ref_reward_define.description_audio_url}</p>
                  {/* assignees */}
                  {goalItem.refs_assignees.length > 0 ?
                    goalItem.refs_assignees.map(assignee => {
                      return (
                        <>
                          <p>Done by: {assignee.nickname}</p>
                          <img src={assignee.image_profile} alt='assignee.nickname' />
                        </>
                      )
                    }
                    )
                    :
                    <p>Getting assignees&#8230;</p>
                  }
                  <Link to={`/goals/${goalItem.id}`} className=''>Details</Link>
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
      </div>
    </>
  )
}