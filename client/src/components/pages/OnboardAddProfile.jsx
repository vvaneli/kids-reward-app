import { Link, useNavigate } from 'react-router-dom'

export default function OnboardAddProfile() {

  const AddL4 = {
    'h2': 'Add a group member',
    'p1': 'Your account is all set up.',
    'p2': 'It\'s unusually quiet around here. Let\'s add a youngster...',
    // 'img1': ''
  }

  // const addProfileAtLevel = Number()
  const navigate = useNavigate()

  function goToProfileGroupAdd(){
    navigate('/profiles/group/add', { state: { access_level: 4 } })
  }

  return (
    <div className='wrapper'>
      <main id='onboard-add'>
        <header>
          {/* <img className='logo' src={logoWord} alt='Smelly Earnie logo' /> */}
          <h1>Welcome!</h1>
        </header>
        <section>
          <h2>{AddL4.h2}</h2>
          <p>{AddL4.p1}</p>
          <p>{AddL4.p2}</p>
          {/* <img src='' alt='' /> */}
          <div className='onboard-nav'>
            <button onClick={goToProfileGroupAdd}>Add</button>
            {/* <Link to={`/profiles/group/add`} className='' onClick={goToProfileGroupAdd}>Add</Link> */}
            <div className='spacer'></div>
            <button>Later</button>
          </div>
        </section>
      </main>
    </div>
  )
}