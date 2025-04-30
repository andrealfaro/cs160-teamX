import React from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/footer.css'

function Footer() { 
    return ( 
        <div className='footer'>
            <div className='foot-container'>
                <div className='title'>
                    <h2>FireAid: Supporting Wildfire Recovery</h2>
                </div>
                <ul className='links'>
                    <li>
                        <Link to='/home'><p className='link'>Home</p></Link>
                    </li>
                    <li>                            
                        <Link to='/resource'><p className='link'>Resources</p></Link>
                    </li>
                    <li>
                        <Link to='/updates'><p className='link'>Live Updates</p></Link>
                    </li>
                    <li>
                        <Link to='/legal'><p className='link'>Legal</p></Link>
                    </li>
                    <li>
                        <Link to='/community'><p className='link'>Community</p></Link>
                    </li>
                    <li>
                        <Link to='/about'><p className='link'>About</p></Link>
                    </li>
                </ul>
            </div>
            <p className='copy'>© 2025 FireAid</p>
        </div>
    );
};

export default Footer;
