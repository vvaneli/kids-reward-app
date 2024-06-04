import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

export default function ProfileItem() {
  const [profile, setProfile] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await axios.get('/api/account/:id', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log('data: ', data)
        // if (data.length === 0) { setErrorMsg('Nothing here yet.') }
        setProfile(data)
      } catch (error) {
        console.log(error.message)
        setErrorMsg(error.message)
      }
    }
    getProfile()
  }, [])

  return (
    <>
      <main id=''>
        <h1>Profile Item</h1>
      </main>
    </>
  )

}