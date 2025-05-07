import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/home.css';

function HomePage() { 
    const [airState, airFunc] = useState(null);
    const [nwsState, setNwsFunc] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((currPos) => {
                const lat = currPos.coords.latitude; //47.35259539134266
                const lon = currPos.coords.longitude; //-96.49255693382979

                console.log(currPos.coords.latitude);
                console.log(currPos.coords.longitude);
                

                const apiKey = "a05610bc6dd9531e9c80d075e39ca6fc";
                const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                const url2 = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${apiKey}`;
                const url3 = `https://api.weather.gov/points/${lat},${lon}`;
                

                fetch (url)
                    .then((data) => {
                    return data.json(); 
                })
                .then((json) => {
                    const currAQI = json.list[0].main.aqi;
                    const aqiDesc = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
                    const advice = ["No precautions.", "No precautions.", "No strict precautions. If you see smoke, close windows.", 
                        "Wear N95 masks, do not go outdoors, and close windows.", "Wear N95 masks, do not go outdoors, and close windows."];
                    airFunc({
                        val: currAQI,
                        desc: aqiDesc[currAQI - 1],
                        updated: new Date().toLocaleTimeString(),
                        advice: advice[currAQI - 1]
                    });
                });

                fetch (url2)
                    .then((data) => {
                    return data.json(); 
                })
                .then((json) => {
                    console.log(json[0]);
                    document.getElementById("location").textContent = json[0].name + ", " + json[0].state;         
                });

                fetch (url3)
                    .then((data) => {
                    return data.json(); 
                })
                .then((json) => {
                    const url3_1 = json.properties.forecastZone;
                    const zoneId = url3_1.split('/').pop();
                    console.log(url3_1);
                    console.log(zoneId);

                    return fetch(`https://api.weather.gov/alerts/active/zone/${zoneId}`);
                })
                .then((data) => {
                    return data.json();
                })
                .then((newJson) => {
                    const fireFilter = newJson.features.filter(alert => {
                        const currProperties = alert.properties;
                        const currText = currProperties.description.toLowerCase();
                        return currText.includes('fire') || currText.includes('wildfire');// || currText.includes('wind');
                    });

                    if (fireFilter.length > 0) {
                        const firstAlert = fireFilter[0];
                        setNwsFunc({
                            headline: firstAlert.properties.headline,
                            ends: firstAlert.properties.ends,
                            description: firstAlert.properties.description
                        });
                    } else {
                        setNwsFunc({
                            headline: "All clear. If an alert goes into effect, this will auto-update immediately.",
                            ends: "All clear.",
                            description: "All clear."
                        });
                    }
                });
            })
        }
    }, []);

    return (
        <div className='main-container'>
            <Header />
            <div className='content-container'>
                <div className='current-conditions'>
                    <h2>Current Conditions in <span id='location'>Loading...</span></h2>
                    <div className='conditions-container'>
                        <div className='condition-card' id='air'>
                            <h3>
                                <span className="status-indicator status-poor"></span>
                                Air Quality
                            </h3>
                            <p className='status'><strong>Status:</strong> {airState ? airState.desc: 'Loading...'} </p>
                            <p className='advice'><strong>Health Advice:</strong> {airState ? airState.advice: 'Loading...'} </p>
                            <p className='updated'><small>Updated: Today, {airState ? airState.updated: 'Loading...'} </small></p>
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
                                National Weather Service Fire Alerts
                            </h3>
                            <p className='status'><strong>Status:</strong> {nwsState ? nwsState.headline: 'Loading...'} </p>
                            <p className='advice'><strong>Description:</strong> {nwsState ? nwsState.description: 'Loading...'} </p>
                            <p className='advice'><strong>Ends:</strong> {nwsState ? nwsState.ends: 'Loading...'} </p>
                            <p className='updated'><small>Updated: Today, {airState ? airState.updated: 'Loading...'}</small></p>
                        </div>
                        <div className='condition-card' id='power'>
                            <h3>
                                <span className="status-indicator status-good"></span>
                                Power Status
                            </h3>
                            <p className='status'><strong>Status:</strong> To check outages in your area, visit:
                            <a href="https://www.sce.com/outage-center/check-outage-status" style={{color:'blue'}}> Southern California Edison's Outage Status</a>.</p>
                            <p className='updated'><small>Note: It may take up to 30 minutes for reported outages to appear on the map.</small></p>
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
                            <Link to='/resources'><p className='resource-btn'>Resources</p></Link>
                        </div>
                        <div className="resource-card">
                            <div className="resource-icon">⚖️</div>
                            <h3>Legal Rights & Assistance</h3>
                            <p>Learn about your rights, insurance claims, FEMA assistance, and connect with pro bono legal help.</p>
                            <Link to='/legal-rights'><p className='resource-btn'>Legal</p></Link>
                        </div>
                        
                        <div className="resource-card">
                            <div className="resource-icon">🔔</div>
                            <h3>Live Updates</h3>
                            <p>Stay informed with real-time updates about evacuation zones, fire progression, and emergency services.</p>
                            <Link to='/live-updates'><p className='resource-btn'>Live Updates</p></Link>
                        </div>
                        
                        <div className="resource-card">
                            <div className="resource-icon">🏠</div>
                            <h3>Community Contacts</h3>
                            <p>Connect with local organizations offering support, services, and resources.</p>
                            <Link to='/community-contacts'><p className='resource-btn'>Contacts</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}; 

export default HomePage;