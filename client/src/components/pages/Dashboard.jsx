import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken, getMyProfileId, isLoggedIn } from '../../lib/auth.js'

import NavBar from '../subcomponents/NavBar.jsx'
import smelly from '../../assets/smelly.svg'
import earnie_blink from '../../assets/earnie.svg'
import earnie from '../../assets/earnie2.svg'


export default function Dashboard() {

  const navigate = useNavigate()

  // set data from DB
  const [myAccount, setMyAccount] = useState()
  const [error, setError] = useState('')
  const [goalsList, setGoalsList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const myId = getMyProfileId()
    async function getAccount() {
      try {
        const { data: { id, username, nickname, first_name, last_name, email, access_level, image_profile, birthday, ref_head, onboarding_counter } } = await axios.get(`/api/account/group/view/${myId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        const data = {
          id,
          username,
          nickname,
          first_name,
          last_name,
          email,
          access_level,
          image_profile,
          birthday,
          ref_head,
          onboarding_counter
        }
        setMyAccount(data)
        // goToNextPage()
      } catch (error) {
        console.log(error.message)
        setError(error.message)
      }
    }
    getAccount()
  }, [])

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

  // function goToNextPage() {

  //   console.log('access_level: ', myAccount.access_level, '| onboarding_counter: ', myAccount.onboarding_counter)
  //   // Go to which page...
  //   if (myAccount.access_level === 4) {
  //     console.log('hit L4')
  //     navigate('/kids/tasks-define-smelly') // go to small people's dashboard
  //     // navigate('/kids/dashboard') // go to small people's dashboard
  //   } else {
  //     console.log('smelly')
  //     navigate('/kids/tasks-define-smelly')
  //   }
  //   if ((myAccount.access_level === 3 | 2 | 1) & (myAccount.onboarding_counter <= 0)) {
  //     console.log('fallback to onboarding')
  //     navigate('/welcome') // go to onboarding
  //   }

  // }

  // async function nextPageRouting() {
  //   try {
  //     const { data: { access_level, onboarding_counter } } = await axios.get(`/api/account/${profileId}/`, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //     console.log('profileId', profileId)
  //     console.log('access_level: ', access_level)
  //     console.log('onboarding_counter: ', onboarding_counter)
  //     // navigate('/dashboard') // go to login landing page
  //   } catch (error) {
  //     console.log(error)
  //     setError(error)
  //   }
  // }

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          {myAccount
            ? <h1>Hello, {myAccount.nickname}</h1>
            : <p>{error}</p>
          }
          {error && <p>{error}</p>}
        </header>
        <main id='home'>
          <section>
            <h2>Log a task done</h2>
            <div className='dashboard-buttons'>
              <button><Link to={`/tasks/add`} className=''>
                <img src={smelly} alt='smelly' />+ Smelly</Link>
              </button>
              <button><Link to={`/tasks/add`} className=''>
                {/* <img className='no-hover' src={earnie} alt='earnie' /> */}
                <img className='hover' src={earnie_blink} alt='earnie' />
                + Earnie</Link>
              </button>
            </div>
          </section>
          <section>
            <h2 className='dashboard-goals'>Goals</h2>

            {goalsList.length > 0 ?
              goalsList.map(goalItem => {
                return (
                  <article key={goalItem.id}>
                    <div>
                      <h3>{goalItem.title}</h3>
                      <img className='hero' src={goalItem.image1} alt={goalItem.title} />
                    </div>
                    <div>
                      {
                        goalItem.date_end ?
                          <p>End: {goalItem.date_end}</p>
                          :
                          <p>End: no end date</p>
                      }
                      <p>{goalItem.reward_is_claimed}</p>

                      <p>Reward: {goalItem.ref_reward_define.title}</p>
                      <p>Target points: {goalItem.ref_reward_define.value}</p>

                      <div className='spacer'></div>
                      <Link to={`/goals/${goalItem.id}`} className='item-detail-link'>Details</Link>
                    </div>
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