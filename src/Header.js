import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {

    return (
        <header>
            <Link to='/'><h2 className='logo'>SampleApp</h2></Link>
            <nav>
                <ul className='nav__links'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/projects'>Projects</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </nav>
            <div className='user'>
                <div className='user__name'><h5>{user.nickname}</h5></div>
                <div className='user_job'>
                    {user.isLogined ? (
                        <button className='log-btn' onClick={logout}>Logout</button>
                    ) : (
                        <button className='log-btn'><Link to='/login'>Login</Link></button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
