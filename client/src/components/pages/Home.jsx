import { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isLoggedIn } from '../../lib/auth.js'
import { getToken } from '../../lib/auth.js'

// Sub-Components
import Nav from '../subcomponents/Nav.jsx'

export default function Home() {

  const navigate = useNavigate()

  // let { profileId } = useParams()

  const { state } = useLocation()

  // set data from DB
  const [myAccount, setMyAccount] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  // useEffect(() => {
  //   async function getAccount() {
  //     try {
  //       const { data } = await axios.get(`/api/account/${profileId}/`, {
  //         headers: {
  //           Authorization: `Bearer ${getToken()}`
  //         }
  //       })
  //       console.log(data)
  //       setMyAccount(data)
  //     } catch (error) {
  //       console.log(error.message)
  //       setErrorMsg(error.message)
  //     }
  //   }
  //   getAccount()
  // }, [])

  return (
    <>
      <main id='home'>
        <Nav />
        <h1>Home</h1>
        {(!state)
          ? <h1>Hello {myAccount.nickname}</h1>
          : <p>{state.successMsg}</p>
        }
        {errorMsg && <p>{errorMsg}</p>}
      </main>
    </>
  )

}