import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <>
      <main id='menu'>
        <h2>Log an action</h2>
        <Link to={'/tasks/add'} className='link-to'>Log an Earnie</Link>
        <Link to={'/tasks/add'} className='link-to'>Log a Smelly</Link>
        <h2>See Status</h2>
        <Link to={'/tasks'} className='link-to'>See list of tasks done</Link>
        <Link to={'/goals'} className='link-to'>See list of goals</Link>

        <h2>Setup</h2>

        <h3>Set goals</h3>
        <Link to={'/goals/add'} className='link-to'>Set a goal</Link>
        <h3>Define Rewards</h3>
        <Link to={'/rewards-define'} className='link-to'>Reward definitions</Link>
        <Link to={'/rewards-define/add'} className='link-to'>Reward definition -- form</Link>
        <h3>Define Tasks</h3>
        <Link to={'/tasks-define'} className='link-to'>Task definitions</Link>
        <Link to={'/tasks-define/add'} className='link-to'>Task definition -- form</Link>
        <h2>Admin</h2>
        {/* <Link to={'/profiles/edit/'} className='link-to'>Edit Profile -- form</Link> */}
        <Link to={'/stories'} className='link-to'>LMy stories</Link>
        <Link to={'/profiles'} className='link-to'>Villager profiles</Link>
      </main>
    </>
  )
}