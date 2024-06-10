import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Sub-Components
import { getToken, isLoggedIn } from '../../lib/auth.js'

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
      <main id='profiles-list'>
        <h1>Profiles List</h1>
        {profilesList.length > 0 ?
          profilesList.map(profilesList => {
            return (
              <article key={profilesList.id}>
                <h2>{profilesList.nickname}</h2>
                <img src={profilesList.image_profile} alt={profilesList.title} />
                <p>{profilesList.access_level}</p>
                <Link to={`/profiles/${profilesList.id}`} className=''>Details</Link>
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
    </>
  )

}