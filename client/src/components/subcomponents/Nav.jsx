import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <>
    <main id='admin'>
      <h1>Master Nav</h1>
      <hr/>
      <h2>Youngsters</h2>
      <Link to={'/kids/dashboard'} className='link-to'>Dashboard</Link>
      <Link to={'/kids/rewards-define'} className='link-to'>Reward definitions</Link>
      <Link to={'/kids/tasks-define'} className='link-to'>Task definitions</Link>
      <Link to={'/kids/profiles'} className='link-to'>Profiles</Link>

      <h3>Authentication</h3>
      <Link to={'/kids/login'} className='link-to'>Log in for kids</Link>
      <hr/>
      <h2>Big People</h2>
      <h3>Define Rewards</h3>
      <Link to={'/rewards-define'} className='link-to'>Reward definitions</Link>
      <Link to={'/rewards-define/add'} className='link-to'>Reward definition -- form</Link>
      <h3>Define Tasks</h3>
      <Link to={'/tasks-define'} className='link-to'>Task definitions</Link>
      <Link to={'/tasks-define/add'} className='link-to'>Task definition -- form</Link>
      <h3>Do Goals</h3>
      <Link to={'/goals'} className='link-to'>List of goals</Link>
      <Link to={'/goals/add'} className='link-to'>Set a goal -- form</Link>
      <h3>Do Tasks</h3>
      <Link to={'/tasks'} className='link-to'>List of tasks done</Link>
      <Link to={'/tasks/add'} className='link-to'>Add a task done -- form</Link>
      <h3>People</h3>
      <Link to={'/profiles'} className='link-to'>Profiles</Link>
      {/* <Link to={'/profiles/edit/'} className='link-to'>Edit Profile -- form</Link> */}
      <h3>Stories</h3>
      <Link to={'/stories'} className='link-to'>List of stories</Link>
      <h2>Log Tasks</h2>
      <hr/>

      <h3>Authentication</h3>
      <Link to={'/login'} className='link-to'>Log in</Link>
      <Link to={'/register'} className='link-to'>Register</Link>
      </main>
    </>
  )
}