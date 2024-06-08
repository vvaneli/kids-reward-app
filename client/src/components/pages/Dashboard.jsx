import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken, getMyProfileId, isLoggedIn } from '../../lib/auth.js'

// Sub-Components
import Menu from '../subcomponents/Menu.jsx'

export default function Dashboard() {

  const navigate = useNavigate()

  // set data from DB
  const [myAccount, setMyAccount] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    const myId = getMyProfileId()
    async function getAccount() {
      try {
        const { data: { id, username, nickname, first_name, last_name, email, access_level, image_profile, birthday, ref_head, onboarding_counter  } } = await axios.get(`/api/account/group/view/${myId}/`, {
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

  function goToNextPage(){

    console.log('access_level: ', myAccount.access_level , '| onboarding_counter: ', myAccount.onboarding_counter)
    // Go to which page...
    if (myAccount.access_level === 4) {
      console.log('hit L4')
      navigate('/kids/tasks-define-smelly') // go to small people's dashboard
      // navigate('/kids/dashboard') // go to small people's dashboard
    } else {
      console.log('smelly')
      navigate('/kids/tasks-define-smelly')
    }
    if ((myAccount.access_level === 3|2|1) & (myAccount.onboarding_counter <= 0)) {
      console.log('fallback to onboarding')
      navigate('/welcome') // go to onboarding
    }
  
  }

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
      <main id='home'>
        <Menu />
        <h1>Home</h1>
        {myAccount
          ? <h1>Hello {myAccount.nickname}</h1>
          : <p>{error}</p>
        }
        {error && <p>{error}</p>}
      </main>
    </>
  )

}