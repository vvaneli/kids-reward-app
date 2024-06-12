import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken, isLoggedIn } from '../../lib/auth.js'

// Sub-Components
import NavBar from '../subcomponents/NavBar.jsx'

export default function ProfilesGroupList() {
  const [profilesList, setProfilesList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

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

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <header>
          <h1>Profiles List</h1>
        </header>
        <main id='profiles-list'>
          {profilesList.length > 0 ?
            profilesList.map(profilesList => {
              return (
                <article key={profilesList.id}>
                  <div>
                  <img src={profilesList.image_profile} alt={profilesList.title} />
                  </div>
                  <div>
                  <h2>{profilesList.nickname}</h2>
                  <p>Access level: {profilesList.access_level}</p>
                  <div className='spacer'></div>
                  <Link to={`/profiles/${profilesList.id}`} className='item-detail-link'>Details</Link>
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
          <Link to={'/profiles/group/add'}><p className=''>Add new member</p></Link>
        </main>
      </div>
    </>
  )

}