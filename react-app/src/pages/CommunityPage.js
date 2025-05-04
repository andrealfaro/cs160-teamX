import React from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/community.css';

function CommunityPage() { 
    return (
        <div>
            <Header/>
            <h1>Community Contact Page</h1>
            <h2 className="center-text">Emergency & Immediate Response</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">🚨</div>
                    <h3>911</h3>
                    <p>Dial 911 in the case of an emergency.</p>
                </div>
                <div className="community-card">
                    <div className="resource-icon">🧑‍🚒</div>
                    <h3>LA County Fire Department Dispatch</h3>
                </div>
                <div className="community-card">
                    <div className="resource-icon">📞</div>
                    <h3>LA City Fire Department Non-Emergency</h3>
                    <p>Dial 311</p>
                </div>
            </div>
            <h2 className="center-text">Shelters & Evacuation Centers</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">⛑️</div>
                    <h3>American Red Cross Los Angeles Region</h3>
                    <p>They manage emergency shelters and reunification services.</p>
                    <button className="community-btn" onClick={() => window.open("https://www.redcross.org/local/california/los-angeles/about-us/our-work/california-wildfires-response-january-2025.html", "_blank")}>Go to Website</button>
                </div>
                <div className="community-card">
                    <div className="resource-icon">🏠</div>
                    <h3>LA Homeless Services Authority</h3>
                    <p>For those displaced by fires.</p>
                    <button className="community-btn" onClick={() => window.open("https://www.lahsa.org/", "_blank")}>Go to Website</button>
                </div>
            </div>
            <h2 className="center-text">Health & Medical Support</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">🏥</div>
                    <h3>211</h3>
                    <p>Central helpline for shelter, food, healthcare, and recovery services. Dial 211</p>
                </div>
                <div className="community-card">
                    <div className="resource-icon">⚕️</div>
                    <h3>LA County Department of Public Health</h3>
                    <p>Helpline: (213) 240-8144</p>
                    <button className="community-btn" onClick={() => window.open("http://publichealth.lacounty.gov/", "_blank")}>Go to Website</button>
                </div>
            </div>
            <h2 className="center-text">Disaster Recovery & Relief Resources</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">🛠️</div>
                    <h3>FEMA Helpline</h3>
                    <p>For federal disaster assistance applications. Dial (800) 621-3362</p>
                </div>
                <div className="community-card">
                    <div className="resource-icon">👨‍💼</div>
                    <h3>California Governor’s Office of Emergency Services</h3>
                    <button className="community-btn" onClick={() => window.open("https://www.disasterassistance.gov/", "_blank")}>Go to Website</button>
                </div>
            </div>
            <h2 className="center-text">Community & Mutual Aid Networks</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">📢</div>
                    <h3>Mutual Aid LA</h3>
                    <button className="community-btn" onClick={() => window.open("mutualaiddisasterrelief.org", "_blank")}>Go to Website</button>
                </div>
                <div className="community-card">
                    <div className="resource-icon">🍲</div>
                    <h3>LA Community Fridges</h3>
                    <p>For food security support.</p>
                    <button className="community-btn" onClick={() => window.open("lacommunityfridge.com", "_blank")}>Go to Website</button>
                </div>
            </div>
            <h2 className="center-text">Animal Rescue & Evacuations</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">🐾</div>
                    <h3>LA Animal Services Emergency Line</h3>
                    <p>Dial (888) 452-7381</p>
                </div>
                <div className="community-card">
                    <div className="resource-icon">🐶</div>
                    <h3>Humane Society of the United States</h3>
                    <p>Disaster Response: (202) 452-1100</p>
                    <button className="community-btn" onClick={() => window.open("https://www.americanhumane.org/what-we-do/rescue-and-protect/disaster-response/?gad_source=1&gad_campaignid=22281105569&gbraid=0AAAAAD3xDS9a2veygyT5C9XN6fCZ0yyT5&gclid=Cj0KCQjw_dbABhC5ARIsAAh2Z-RkoTtgxKFdQOkCeVzyAPLYc6ZHJfySfK1fhPrUGXygehgmCVxePJcaAvbqEALw_wcB", "_blank")}>Go to Website</button>
                    
                </div>
            </div>
            <h2 className="center-text">24/7 Mental Health Helplines</h2>
            <div className="community-container">
                <div className="community-card">
                    <div className="resource-icon">📞</div>
                    <h3>Los Angeles County Department of Mental Health​</h3>
                    <p>Help Line: Call 800-854-7771 for confidential support, crisis counseling, and referrals.</p>
                </div>
                <div className="community-card">
                    <div className="resource-icon">❤️</div>
                    <h3>Suicide & Crisis Lifeline ​</h3>
                    <p>Call or text 988 for immediate assistance with mental health crises, suicidal thoughts, or emotional distress.</p>
                </div>
                <div className="community-card">
                    <div className="resource-icon">🏠</div>
                    <h3>Crisis Text Line​</h3>
                    <p>Text HOME to 741741 to connect with a trained crisis counselor.</p>
                </div>
            </div>
            <Footer/>

        </div>
    );
}; 

export default CommunityPage;

/* 
🏠 Shelters & Evacuation Centers
American Red Cross Los Angeles Region: (800) 675-5799
(They manage emergency shelters and reunification services.)

LA Homeless Services Authority (LAHSA): (213) 683-3333
(For those displaced by fires.)

🌲 Wildfire & Air Quality Updates
Cal Fire Incident Info: (916) 653-5123 or via their website

AirNow (Local AQI Reports): https://www.airnow.gov/

🏥 Health & Medical Support
211 LA: Dial 211
(Central helpline for shelter, food, healthcare, and recovery services.)

LA County Department of Public Health: (213) 240-8144

🛠️ Disaster Recovery & Relief Resources
FEMA Helpline: (800) 621-3362
(For federal disaster assistance applications.)

California Governor’s Office of Emergency Services (Cal OES): (916) 845-8911

🐶 Animal Rescue & Evacuations
LA Animal Services Emergency Line: (888) 452-7381

Humane Society of the United States — Disaster Response: (202) 452-1100

📚 Legal Aid & Housing Assistance
Neighborhood Legal Services of Los Angeles County (NLSLA): (800) 433-6251
(Helps with housing rights, insurance claims, etc.)

Bet Tzedek Legal Services: (323) 939-0506

📢 Community & Mutual Aid Networks
Mutual Aid LA: mutualaiddisasterrelief.org

LA Community Fridges: lacommunityfridge.com
(For food security support.)

 24/7 Mental Health Helplines
Los Angeles County Department of Mental Health (LACDMH) Help Line: Call 800-854-7771 for confidential support, crisis counseling, and referrals. ​
LAUSD

988 Suicide & Crisis Lifeline: Call or text 988 for immediate assistance with mental health crises, suicidal thoughts, or emotional distress. ​
Department of Mental Health


Crisis Text Line: Text HOME to 741741 to connect with a trained crisis counselor.
*/