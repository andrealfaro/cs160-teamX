import React, { useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/resource.css';

function ResourcePage() { 
    const [showForm, setShowForm] = useState(false); 
    const toggleForm = () => setShowForm(!showForm); 

    const handleFilterClick = (e, group) => {
        const siblings = document.querySelectorAll(`.${group} .filter-tag`);
        siblings.forEach(sib => sib.classList.remove('active'));
        e.target.classList.add('active');
      };

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
                        <form className='post-form'>
                            <h3>Share a Resource</h3>
                            <div className='form-group'>
                                <label for='rsrc-title'>Resource Title*</label>
                                <input type='text' id='rsrc-title' placeholder='e.g., Food Drive at Community Center' required></input>
                            </div>
                            <div className='form-group'>
                                <label for='rsrc-description'>Description*</label>
                                <textarea id='resrc-description' placeholder='Provide details about the resource, availability, requirements, etc.' required></textarea>
                            </div>
                            <div className='form-group'> 
                                <label for='rsrc-location'>Location*</label>
                                <input type='text' id='rsrc-location' placeholder='Address or area' required></input>
                            </div>
                            <div className='form-group'>
                                <label for='rsrc-type'>Resource Type*</label>
                                {/* <p>Hold Control or Command to select multiple</p> */}
                                <select id='rsrc-type' required multiple>
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
                                <input type='text' id='rsrc-dates' placeholder='e.g., April 23-20, or Ongoing'></input>
                            </div>
                            <div className='form-group'>
                                <label for='rsrc-contact'>Contact Information</label>
                                <input type='text' id='rsrc-contact' placeholder='Phone number, email, or website'></input>
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
                                <span key={i} className={`filter-tag ${i === 0 ? 'active' : ''}`} onClick={(e) => handleFilterClick(e, group)}>{opt}</span>
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
                    {/* basic template for the resource card */}
                    <div className='rsrc-card'>
                        <div className='rsrc-header'>
                            <h3>Water Distribution at City Hall</h3>
                        </div>
                        <div className='rsrc-meta'>
                            <span id='post-by'>Posted by: John Doe</span>
                            <span id='post-time'>1 Hour ago</span>
                        </div>
                        <p>Clean bottled water available for all affected residents. Bring containers for additional water. Each household can receive up to 5 gallons. ID not required.</p>
                        <p><strong>Location:</strong> 2375 Ridge Road, North County</p>
                        <p><strong>Hours:</strong> 8:00 AM - 8:00 PM daily through April 30</p>
                        <p><strong>Contact:</strong> 555-234-5678</p>
                        <div className="tag-list">
                            <span className="tag">Official</span>
                            <span className="tag">Water</span>
                            <span className="tag">North County</span>
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

                    <div className='rsrc-card'>
                        <div className='rsrc-header'>
                            <h3>Water Distribution at City Hall</h3>
                        </div>
                        <div className='rsrc-meta'>
                            <span id='post-by'>Posted by: John Doe</span>
                            <span id='post-time'>1 Hour ago</span>
                        </div>
                        <p>Clean bottled water available for all affected residents. Bring containers for additional water. Each household can receive up to 5 gallons. ID not required.</p>
                        <p><strong>Location:</strong> 2375 Ridge Road, North County</p>
                        <p><strong>Hours:</strong> 8:00 AM - 8:00 PM daily through April 30</p>
                        <p><strong>Contact:</strong> 555-234-5678</p>
                        <div className="tag-list">
                            <span className="tag">Official</span>
                            <span className="tag">Water</span>
                            <span className="tag">North County</span>
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

                    <div className='rsrc-card'>
                        <div className='rsrc-header'>
                            <h3>Water Distribution at City Hall</h3>
                        </div>
                        <div className='rsrc-meta'>
                            <span id='post-by'>Posted by: John Doe</span>
                            <span id='post-time'>1 Hour ago</span>
                        </div>
                        <p>Clean bottled water available for all affected residents. Bring containers for additional water. Each household can receive up to 5 gallons. ID not required.</p>
                        <p><strong>Location:</strong> 2375 Ridge Road, North County</p>
                        <p><strong>Hours:</strong> 8:00 AM - 8:00 PM daily through April 30</p>
                        <p><strong>Contact:</strong> 555-234-5678</p>
                        <div className="tag-list">
                            <span className="tag">Official</span>
                            <span className="tag">Water</span>
                            <span className="tag">North County</span>
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

                    <div className='rsrc-card'>
                        <div className='rsrc-header'>
                            <h3>Water Distribution at City Hall</h3>
                        </div>
                        <div className='rsrc-meta'>
                            <span id='post-by'>Posted by: John Doe</span>
                            <span id='post-time'>1 Hour ago</span>
                        </div>
                        <p>Clean bottled water available for all affected residents. Bring containers for additional water. Each household can receive up to 5 gallons. ID not required.</p>
                        <p><strong>Location:</strong> 2375 Ridge Road, North County</p>
                        <p><strong>Hours:</strong> 8:00 AM - 8:00 PM daily through April 30</p>
                        <p><strong>Contact:</strong> 555-234-5678</p>
                        <div className="tag-list">
                            <span className="tag">Official</span>
                            <span className="tag">Water</span>
                            <span className="tag">North County</span>
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

                </div>
            </div>
            <Footer />
        </div>
    );
}; 

export default ResourcePage;