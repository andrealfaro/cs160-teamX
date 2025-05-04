import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/resource.css';

function ResourcePage() { 
    const [showForm, setShowForm] = useState(false); 
    const [filters, setFilters] = useState({
        'resource-type': 'All',
        location: 'All Areas',
        status: 'All'
    });
    const toggleForm = () => setShowForm(!showForm);

    const [allResources, setAllResources] = useState([
    {
        title: "Water Distribution at City Hall",
        postedBy: "John Doe",
        description: "Clean bottled water available for all affected residents. Bring containers for additional water. Each household can receive up to 5 gallons. ID not required.",
        address: "2375 Ridge Road, North County",
        location: "North County",
        hours: "8:00 AM - 8:00 PM daily through April 30",
        contact: "555-234-5678",
        type: "Water",
        status: "Official",
        timePosted: "1 hour ago"
    },
    /*{
        title: "Food Distribution at Regional Food Bank",
        postedBy: "Aaron Donald",
        description: "Bottled water and meal for everyone. ID required.",
        address: "1734 East 41st Street, Los Angeles, CA 90058",
        location: "East Side",
        hours: "8:00 AM - 12:00 PM daily through May 5",
        contact: "323-234-3030",
        type: "Food",
        status: "Official",
        timePosted: "15 mins ago"*/
    ]);

    const [formInput, setFormInput] = useState({
        title: '',
        postedBy: '',
        description: '',
        address: '',
        location: '',
        hours: '',
        contact: '',
        type: 'Water',
        status: '',
        timePosted: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/resources').then(res => res.json()).then(data => {
            setAllResources(data);
        })
    });

    const doPostFormUpdate = (e) => {
        e.preventDefault();
        
        const rToAdd = {
            title: formInput.title,
            postedBy: formInput.postedBy,
            description: formInput.description,
            address: formInput.address,
            location: formInput.location,
            hours: formInput.hours,
            contact: formInput.contact,
            type: formInput.type,
            status: formInput.status,
            timePosted: formInput.timePosted
        };

        // setAllResources(prev => [rToAdd, ...prev]);
        fetch('http://localhost:5000/api/resources', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rToAdd)
        }).then(() => {
            setAllResources(prev => [rToAdd, ...prev]);
        });

        setFormInput({ title: '',
            postedBy: '',
            description: '',
            address: '',
            location: '',
            hours: '',
            contact: '',
            type: 'Water',
            status: '',
            timePosted: ''});
        setShowForm(false);
    }

    const handleFilterClick = (e, group) => {
        /*const siblings = document.querySelectorAll(`.${group} .filter-tag`);
        siblings.forEach(sib => sib.classList.remove('active'));
        e.target.classList.add('active');*/
        const currSelected = e.target.textContent;
        setFilters(temp => ({
            ...temp,
            [group]: currSelected
        }));
      };

    const filteredResources = allResources.filter(currR => {
        const sameType = filters['resource-type'] == 'All' || filters['resource-type'] == currR.type;
        const sameLoc = filters.location == 'All Areas' || filters.location == currR.location;
        const sameStatus = filters.status == 'All' || filters.status == currR.status;
        return sameType && sameLoc && sameStatus;
    });

    return (
        <div className='main-container'>
            <Header/>
            <div className='resource-content-container'> 
                <div className='title-section'>
                    <div className='rsrc-title'>
                        <h1>Available Resources</h1>
                        <p>Find or share resources in your community.</p>
                    </div>
                    <button onClick={toggleForm} className='post-rsrc btn'>+ POST NEW RESOURCE</button>
                </div>
                {/* new resource post */}
                {showForm && (
                    <div className='post-container'>
                        <form className='post-form' onSubmit={doPostFormUpdate}>
                            <h3>Share a Resource</h3>
                            <div className='form-group'>
                                <label for='rsrc-title'>Resource Title*</label>
                                <input type='text' id='rsrc-title' placeholder='e.g., Food Drive at Community Center' required value={formInput.title} onChange={(e) => setFormInput({...formInput, title: e.target.value})}></input>
                            </div>
                            <div className='form-group'>
                                <label for='rsrc-description'>Description*</label>
                                <textarea id='resrc-description' placeholder='Provide details about the resource, availability, requirements, etc.' required value={formInput.description} onChange={(e) => setFormInput({...formInput, description: e.target.value})}></textarea>
                            </div>
                            <div className='form-group'> 
                                <label for='rsrc-location'>Location*</label>
                                <input type='text' id='rsrc-location' placeholder='Address or area' required value={formInput.address} onChange={(e) => setFormInput({...formInput, address: e.target.value})}></input>
                            </div>
                            <div className='form-group'>
                                <label for='rsrc-type'>Resource Type*</label>
                                {/* <p>Hold Control or Command to select multiple</p> */}
                                <select id='rsrc-type' required multiple value={formInput.type} onChange={(e) => setFormInput({...formInput, type: Array.from(e.target.selectedOptions, (currOpt) => currOpt.value)})}>
                                    <option value="">-- Select Type --</option>
                                    <option value="Food">Food</option>
                                    <option value="Water">Water</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Shelter">Shelter</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Financial">Financial Aid</option>
                                    <option value="Cleanup">Cleanup</option>
                                    <option value="Supplies">Supplies</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                                <div className='form-group'>
                                <label for='rsrc-dates'>Dates Available</label>
                                <input type='text' id='rsrc-dates' placeholder='e.g., April 23-20, or Ongoing' required value={formInput.hours} onChange={(e) => setFormInput({...formInput, hours: e.target.value})}></input>
                            </div>
                            <div className='form-group'>
                                <label for='rsrc-contact'>Contact Information</label>
                                <input type='text' id='rsrc-contact' placeholder='Phone number, email, or website' required value={formInput.contact} onChange={(e) => setFormInput({...formInput, contact: e.target.value})}></input>
                            </div>
                            <div className='form-actions'>
                                <button className='cancel-btn rsrc-btn' onClick={toggleForm}>CANCEL</button>
                                <button className='submit-btn rsrc-btn'>POST RESOURCE</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="filter-bar">
                    <div className="filter-groups">
                        {[
                        { group: 'resource-type', title: 'Resource Type', options: ['All','Food','Water','Medical','Shelter','Clothing','Financial','Cleanup','Supplies','Transportation'] },
                        { group: 'location', title: 'Location', options: ['All Areas','North County','Downtown','East Side','South Hills','West Valley'] },
                        { group: 'status', title: 'Status', options: ['All','Verified','Urgent','Active'] }
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
                        <input type="text" placeholder="Search resources..." />
                        <button className="search-btn">Search</button>
                    </div>
                </div>

                <div className='rsrc-posts'>
                    {filteredResources.map((r, i) => (
                        <div key={i} className='rsrc-card'>
                            <div className='rsrc-header'>
                                <h3>{r.title}</h3>
                            </div>
                            <div className='rsrc-meta'>
                                <span id='post-by'>Posted by: {r.postedBy}</span>
                                <span id='post-time'>{r.timePosted}</span>
                            </div>
                            <p>{r.description}</p>
                            <p><strong> Location: </strong> {r.address} </p>
                            <p><strong> Hours: </strong> {r.hours} </p>
                            <p><strong> Contact: </strong> {r.contact} </p>
                            <div className="tag-list">
                                <span className="tag">{r.status}</span>
                                <span className="tag">{r.type}</span>
                                <span className="tag">{r.location}</span>
                            </div>
                            <div className="resource-actions">
                                <div className="action-btns">
                                    <div className='helpful-share'>
                                        <button className="action-btn">👍 Helpful (45)</button>
                                        <button className="action-btn">💬 Share (12)</button>
                                    </div>
                                    <button className="action-btn">📌 Save</button>
                                </div>
                            </div>
                        </div> 
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}; 

export default ResourcePage;