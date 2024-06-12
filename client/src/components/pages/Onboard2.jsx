import { Link, useNavigate } from 'react-router-dom'

export default function Onboard2() {

  const AddL4a = {
    'h2': 'Add a youngster',
    // 'p1': 'Profile is saved.',
    'p1': 'It\'s unusually quiet around here.',
    'p2': 'Let\'s add a youngster...',
    // 'img1': ''
  }

  const AddL4b = {
    'h2': 'Add a youngster',
    'p1': 'New youngster profile saved',
    'p2': 'Add another youngster, or go to the next page...',
    // 'img1': ''
  }

  const AddL23a = {
    'h2': 'Add big people',
    'p1': 'It takes a village to raise a child.',
    'p2': 'Add group members to your \'village\'...',
    // 'img1': ''
  }

  // const addProfileAtLevel = Number()
  const navigate = useNavigate()

  function goToProfileGroupAdd() {
    navigate('/welcome/add', { state: { access_level: 4 } })
  }

  return (
    <div className='onboard wrapper'>
      <main id='onboard2'>
        <header>
          {/* <img className='logo' src={logoWord} alt='Smelly Earnie logo' /> */}
          <h1>Welcome!</h1>
        </header>
        <h2>{AddL4a.h2}</h2>
        <p>{AddL4a.p1}</p>
        <p>{AddL4a.p2}</p>
        {/* <img src='' alt='' /> */}
        <div className='onboard-nav'>
          {/* <button>Next</button> */}
          {/* <Link to={`/profiles/group/add`} className='' onClick={goToProfileGroupAdd}>Add</Link> */}
          {/* <Link to={`/dashboard`} className=''>Done</Link> */}
          <button><Link to={`/dashboard`} className=''>Done</Link></button>
          <div className='spacer'></div>
        <button onClick={goToProfileGroupAdd}>Add</button>
        </div>
      </main>
    </div>
  )
}