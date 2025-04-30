import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../assets/fire-logo.png'
import '../styles/header.css';

function Header() { 
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
                    <Link to='/resource'><h1 className='link'>Resources</h1></Link>
                </li>
                <li>
                    <Link to='/updates'><h1 className='link'>Live Updates</h1></Link>
                </li>
                <li>
                    <Link to='/legal'><h1 className='link'>Legal</h1></Link>
                </li>
                <li>
                    <Link to='/community'><h1 className='link'>Community</h1></Link>
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
            <div className='signlog-container'>
                <button className='signup btn'>SIGNUP</button>
                <button className='login btn'>LOGIN</button>
            </div>
        </div>
    )
}; 

export default Header;