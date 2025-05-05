import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/community.css';

function CommunityPage() { 
    const [showForm, setShowForm] = useState(false); 
    const [filters, setFilters] = useState({
        'resource-type': 'All',
        location: 'All Areas',
        status: 'All'
    });
    const handleFilterClick = (e, group) => {
        const currSelected = e.target.textContent;
        setFilters(temp => ({
            ...temp,
            [group]: currSelected
        }));
      };

    const allResources = [
        // Emergency
        {
          id: 1,
          name: "911",
          type: "Emergency",
          icon: "🚨",
          description: "Dial 911 in the case of an emergency.",
          title: "Emergency & Immediate Response"
        },
        {
          id: 3,
          name: "LA City Fire Department Non-Emergency",
          type: "Emergency",
          icon: "📞",
          description: "Dial 311",
          title: "Emergency & Immediate Response"
        },
      
        // Shelter
        {
          id: 4,
          name: "American Red Cross Los Angeles Region",
          type: "Shelter",
          icon: "⛑️",
          description: "They manage emergency shelters and reunification services.",
          link: "https://www.redcross.org/local/california/los-angeles/about-us/our-work/california-wildfires-response-january-2025.html",
          title: "Shelters & Evacuation Centers"
        },
        {
          id: 5,
          name: "LA Homeless Services Authority",
          type: "Shelter",
          icon: "🏠",
          description: "For those displaced by fires.",
          link: "https://www.lahsa.org/",
          title: "Shelters & Evacuation Centers"
        },
      
        // Medical
        {
          id: 6,
          name: "211",
          type: "Medical",
          icon: "🏥",
          description: "Central helpline for shelter, food, healthcare, and recovery services. Dial 211",
          title: "Health & Medical Support"
        },
        {
          id: 7,
          name: "LA County Department of Public Health",
          type: "Medical",
          icon: "⚕️",
          description: "Helpline: (213) 240-8144",
          link: "http://publichealth.lacounty.gov/",
          title: "Health & Medical Support"
        },
        //Preparation
        {
            id: 8,
            name: "LA County Fire Department Dispatch",
            type: "Preparation",
            icon: "🧑‍🚒",
            description: "Official site with wildfire safety tips, emergency alerts, evacuation info, and community resources.",
            link: "https://fire.lacounty.gov/emergency-disaster-preparedness-safety-tips/",
            title: "Fire Preparation"
        },
        {
            id: 9,
            name: "Community Emergency Response Team Training",
            type: "Preparation",
            icon: "🔥",
            description: "Free training courses to educate residents on disaster preparedness & fire safety",
            link: "https://lafd.org/disaster-preparedness",
            title: "Fire Preparation"
        },
        {
            id: 10,
            name: "Wildfire Smoke & Ash Health & Safety Tips",
            type: "Preparation",
            icon: "🧯",
            description: "Learn how to protect yourself from wildfire smoke and ash",
            link: "https://www.aqmd.gov/home/air-quality/wildfire-health-info-smoke-tips",
            title: "Fire Preparation"
        },
        // Recovery
        {
          id: 11,
          name: "FEMA Helpline",
          type: "Recovery",
          icon: "🛠️",
          description: "For federal disaster assistance applications. Dial (800) 621-3362",
          title: "Disaster Recovery & Relief Resources"
        },
        {
          id: 12,
          name: "California Governor’s Office of Emergency Services",
          type: "Recovery",
          icon: "👨‍💼",
          link: "https://www.disasterassistance.gov/",
          title: "Disaster Recovery & Relief Resources"
        },
      
        // Mutual Aid
        {
          id: 13,
          name: "Mutual Aid LA",
          type: "Mutual Aid",
          icon: "📢",
          link: "https://mutualaiddisasterrelief.org",
          title: "Community & Mutual Aid Networks"
        },
        {
          id: 14,
          name: "LA Community Fridges",
          type: "Mutual Aid",
          icon: "🍲",
          description: "For food security support.",
          link: "https://lacommunityfridges.com",
          title: "Community & Mutual Aid Networks"
        },
      
        // Animal
        {
          id: 15,
          name: "LA Animal Services Emergency Line",
          type: "Animal",
          icon: "🐾",
          description: "Dial (888) 452-7381",
          title: "Animal Rescue & Evacuations"
        },
        {
          id: 16,
          name: "Humane Society of the United States",
          type: "Animal",
          icon: "🐶",
          description: "Disaster Response: (202) 452-1100",
          link: "https://www.americanhumane.org/what-we-do/rescue-and-protect/disaster-response/",
          title: "Animal Rescue & Evacuations"
        },
      
        // Mental Health
        {
          id: 17,
          name: "Los Angeles County Department of Mental Health​",
          type: "Mental Health",
          icon: "📞",
          description: "Help Line: Call 800-854-7771 for confidential support, crisis counseling, and referrals.",
          title: "24/7 Mental Health Helplines"
        },
        {
          id: 18,
          name: "Suicide & Crisis Lifeline",
          type: "Mental Health",
          icon: "❤️",
          description: "Call or text 988 for immediate assistance with mental health crises, suicidal thoughts, or emotional distress.",
          title: "24/7 Mental Health Helplines"
        },
        {
          id: 19,
          name: "Crisis Text Line",
          type: "Mental Health",
          icon: "🏠",
          description: "Text HOME to 741741 to connect with a trained crisis counselor.",
          title: "24/7 Mental Health Helplines"
        }
    ];

    const sectionTitles = [
        { type: "Emergency", title: "Emergency & Immediate Response" },
        { type: "Shelter", title: "Shelters & Evacuation Centers" },
        { type: "Medical", title: "Health & Medical Support" },
        { type: "Preparation", title: "Fire Preparation"},
        { type: "Recovery", title: "Disaster Recovery & Relief Resources" },
        { type: "Mutual Aid", title: "Community & Mutual Aid Networks" },
        { type: "Animal", title: "Animal Rescue & Evacuations" },
        { type: "Mental Health", title: "24/7 Mental Health Helplines" }
    ];

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    const handleSearchClick = () => {
        setSearchQuery(searchInput);
    };

    const filteredResources = allResources.filter(r => {
        const matchesFilter = filters['resource-type'] === 'All' || r.type === filters['resource-type'];
        const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div>
            <Header/>
            <h1>Community Contact Page</h1>
            <div className="com-filter-bar">
                <div className="filter-groups">
                    {[
                    { group: 'resource-type', title: 'Community Resource Type', options: ['All','Emergency','Shelter','Medical','Preparation','Recovery','Mutual Aid','Animal','Mental Health'] }
                    ].map(({ group, title, options }) => (
                    <div key={group} className={`filter-group ${group}`}>
                        <h4>{title}</h4>
                        <div className="filter-options">
                        {options.map((opt, i) => (
                            <span key={i} className={`filter-tag ${filters[group] == opt ? 'active' : ''}`} onClick={(e) => handleFilterClick(e, group)}>{opt}</span>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Search resources..." value={searchInput} onChange={handleSearchInputChange}/>
                    <button className="search-btn" onClick={handleSearchClick}>Search</button>
                </div>
            </div>

            
            {sectionTitles.map(({ type, title }) => {
            const resourcesInSection = filteredResources.filter(r => r.type === type);
            if (resourcesInSection.length === 0) return null;
            return (
                <div key={type}>
                <h2 className="center-text">{title}</h2>
                <div className="community-container">
                    {resourcesInSection.map(r => (
                    <div key={r.id} className="community-card">
                        <div className="resource-icon">{r.icon}</div>
                        <h3>{r.name}</h3>
                        {r.description && <p>{r.description}</p>}
                        {r.phone && <p>{r.phone}</p>}
                        {r.link && (
                        <button
                            className="community-btn"
                            onClick={() => window.open(r.link, "_blank")}
                        >
                            Go to Website
                        </button>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            );
            })}
            <Footer/>

        </div>
    );
}; 

export default CommunityPage;