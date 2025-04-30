import React from 'react'; 
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/home.css';

function HomePage() { 
    return (
        <div className='main-container'>
            <Header />
            <div className='content-container'>
                <div className='current-conditions'>
                    <h2>Current Conditions</h2>
                    <div className='conditions-container'>
                        <div className='condition-card' id='air'>
                            <h3>
                                <span className="status-indicator status-poor"></span>
                                Air Quality
                            </h3>
                            <p className='status'><strong>Status:</strong> Poor (AQI 187)</p>
                            <p className='advice'><strong>Health Advice:</strong> Wear N95 masks outdoors. Keep windows closed.</p>
                            <p className='updated'><small>Updated: Today, 08:45 AM</small></p>
                        </div>
                        <div className='condition-card' id='water'>
                            <h3>
                                <span className="status-indicator status-moderate"></span>
                                Water Quality
                            </h3>
                            <p className='status'><strong>Status:</strong> Advisory in effect</p>
                            <p className='advice'><strong>Health Advice:</strong> Boil water before drinking in affected areas.</p>
                            <p className='updated'><small>Updated: Today, 07:30 AM</small></p>
                        </div>
                        <div className='condition-card' id='fire'>
                            <h3>
                                <span className="status-indicator status-poor"></span>
                                Fire Containment
                            </h3>
                            <p className='status'><strong>Status:</strong> 35% contained</p>
                            <p className='advice'><strong>Area:</strong> 7,850 acres affected</p>
                            <p className='updated'><small>Updated: Today, 06:15 AM</small></p>
                        </div>
                        <div className='condition-card' id='power'>
                            <h3>
                                <span className="status-indicator status-good"></span>
                                Power Status
                            </h3>
                            <p className='status'><strong>Status:</strong> Restored in major areas</p>
                            <p className='advice'><strong>Outages:</strong> Eastern sector still affected</p>
                            <p className='updated'><small>Updated: Today, 09:00 AM</small></p>
                        </div>
                    </div>
                </div>
                <div className='resources-support'>
                    <h2>Resources & Support</h2>
                    <div className='resource-container'>
                        <div className='resource-card'>
                            <div className="resource-icon">📋</div>
                            <h3>Resource Directory</h3>
                            <p>Find emergency shelters, food distribution centers, clean water sources, and medical aid stations.</p>
                            <Link to='/resource'><p className='resource-btn'>Resources</p></Link>
                        </div>
                        <div className="resource-card">
                            <div className="resource-icon">⚖️</div>
                            <h3>Legal Rights & Assistance</h3>
                            <p>Learn about your rights, insurance claims, FEMA assistance, and connect with pro bono legal help.</p>
                            <Link to='/legal'><p className='resource-btn'>Legal</p></Link>
                        </div>
                        
                        <div className="resource-card">
                            <div className="resource-icon">🔔</div>
                            <h3>Live Updates</h3>
                            <p>Stay informed with real-time updates about evacuation zones, fire progression, and emergency services.</p>
                            <Link to='/updates'><p className='resource-btn'>Live Updates</p></Link>
                        </div>
                        
                        <div className="resource-card">
                            <div className="resource-icon">🏠</div>
                            <h3>Community Contacts</h3>
                            <p>Connect with local organizations offering support, services, and resources.</p>
                            <Link to='/community'><p className='resource-btn'>Contacts</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}; 

export default HomePage;