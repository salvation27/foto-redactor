import React from 'react'
import {Link} from 'react-router-dom'
const Nav = () => {
  return (
    <div className='menu'>
        <ul>
            <li>
            <Link to="/"> Home</Link>
            </li>
            <li>
            <Link to="contacts">Contacts</Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav