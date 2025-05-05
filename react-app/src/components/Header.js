import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../assets/fire-logo.png'
import '../styles/header.css';
import { useAuth } from './AuthContext';

function Header() { 
    const { user, loginWithGoogle, logout, loading } = useAuth();
    return ( 
        <div className='header'>
            <div className='logo-container'>
                <Link to='/'><img src={logo} className='logo' alt='logo'/></Link> 
                <Link to='/'><h1 className='app-title'>FireAid</h1></Link>
            </div>
            <ul className='nav-links'>
                <li>
                    <Link to='/home'><h1 className='link'>Home</h1></Link>
                </li>
                <li>
                    <Link to='/resources'><h1 className='link'>Resources</h1></Link>
                </li>
                <li>
                    <Link to='/live-updates'><h1 className='link'>Live Updates</h1></Link>
                </li>
                <li>
                    <Link to='/legal-rights'><h1 className='link'>Legal</h1></Link>
                </li>
                <li>
                    <Link to='/community-contacts'><h1 className='link'>Community</h1></Link>
                </li>
                <li>
                    <Link to='/about'><h1 className='link'>About</h1></Link>
                </li>
            </ul>
            {/* <div className='language-container'>
                <select className='language' id='language'>
                    <option value='english'>ENG</option>
                    <option value='spanish'>SPA</option>
                </select>
            </div> */}
      
            {!loading && !user && (
                <div className='signlog-container'>
                    <button className='login btn' onClick={loginWithGoogle}>Log In</button>
                </div>
            )}

            {!loading && user && (
                <div className='signlog-container'>
                    <p>Welcome, {user.name}</p>
                    <button className='login btn' onClick={logout}>Log Out</button>
                </div>
            )}
          
        </div>
    )
}; 

// maybe implement a hamburger method for the nav bar when the screen is small

export default Header;