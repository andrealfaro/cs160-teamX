import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/resource.css'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment, setDoc, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../components/AuthContext.jsx';

const formatRelativeTime = (date) => {
    if (!date) return 'Time N/A'; 

    const now = new Date();
    const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    } else if (diffInSeconds < 3600) { // less than 1 hour
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) { // less than 24 hours
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else { // 24 hours or more (date format)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
};


function ResourcePage() {
    const { user, loading } = useAuth();
    
    const [showForm, setShowForm] = useState(false);
    const [resources, setResources] = useState([]); 

    const [savedResourcesIds, setSavedResourcesIds] = useState(new Set());
    const [resourceTitle, setResourceTitle] = useState('');
    const [resourceDescription, setResourceDescription] = useState('');
    const [resourceLocation, setResourceLocation] = useState('');
    const [resourceType, setResourceType] = useState([]); 
    const [resourceDates, setResourceDates] = useState('');
    const [resourceContact, setResourceContact] = useState('');

    const [searchInput, setSearchInput] = useState('');
    const [nogginFilerRes, setNogginFilterRes] = useState(false);
    const [searchSpinner, setSearchSpinner] = useState(false);
    const [locInput, setLocInput] = useState('');

    const [activeFilters, setActiveFilters] = useState({
        'resource-type': 'All',
        'location': 'All Areas',
        'status': 'All' 
    });

    const resetForm = () => {
        setResourceTitle('');
        setResourceDescription('');
        setResourceLocation('');
        setResourceType([]);
        setResourceDates('');
        setResourceContact('');
    };

    // toggle form visibility and reset inputs 
    const toggleForm = () => {
        if (showForm) {
            resetForm(); 
        }
        setShowForm(!showForm);
    };

    const handleFilterClick = (group, option) => {
        setActiveFilters(prevFilters => ({
            ...prevFilters,
            [group]: option
        }));
    };

    useEffect(() => {
        // fetch documents from the 'resources' collection, ordered by by most recent 
        const q = query(collection(db, 'resources'), orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const resourcesArray = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const createdAtDate = data.timestamp?.toDate();

                if(createdAtDate) {
                   resourcesArray.push({
                       id: doc.id,
                       ...data,
                       createdAt: createdAtDate,
                   });
                } else {
                    console.warn(`Resource document ${doc.id} is missing a valid timestamp or was pending.`);
                }
            });
            setResources(resourcesArray);
            console.log("Resources fetched:", resourcesArray); 
        }, (error) => {
            console.error("Error fetching resources: ", error);
        });

        return () => unsubscribe();
    }, []); 

    // save new resources
    const handlePostResource = async (e) => {
        e.preventDefault(); 

        // basic validation - make sure form isn't empty
        if (!resourceTitle || !resourceDescription || !resourceLocation || resourceType.length === 0) {
            alert('Please fill in all required fields (Title, Description, Location, Resource Type)');
            return;
        }

        try {
            await addDoc(collection(db, "resources"), {
                title: resourceTitle,
                description: resourceDescription,
                location: resourceLocation,
                type: resourceType, 
                datesAvailable: resourceDates,
                contact: resourceContact,
                timestamp: serverTimestamp(), 
                userId: user, // store user ID if logged in 
                postedBy: user.name || 'Anonymous', // default to anonymous
                helpfulCount: 0,
                shareCount: 0,
                savedBy: [],
            });

            console.log("Resource successfully posted!");

            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error("Error posting resource: ", error);
            alert("There was an error posting your resource. Please try again.");
        }
    };

    const handleVerifyClick = async (resourceId) => {
        if (!user) { 
            console.log("User must be logged in to verify."); 
            alert("Please log in to verify this resource.");
            return;
        }
        try {
            const resourceRef = doc(db, 'resources', resourceId);
            await updateDoc(resourceRef, {
                helpfulCount: increment(1), // increment the helpful count
            });
            console.log("Resource verified successfully!");
        } catch (error) {
            console.error("Error verifying resource: ", error);
            alert("There was an error verifying this resource. Please try again.");
        }
    };
        
    // filter resources based on type tags
    const filteredResources = resources.filter(resource => {
        // filter by type
        const typeFilter = activeFilters['resource-type'];
        if (typeFilter !== 'All' && (!resource.type || !Array.isArray(resource.type) || !resource.type.includes(typeFilter))) {
            return false;
        }

        //filter by location
        const locationFilter = activeFilters['location'];
        if (locationFilter !== 'All Areas' && (!resource.location || resource.location !== locationFilter)) {
            return false; 
        }

        // filter by status
        const statusFilter = activeFilters['status'];
        if (statusFilter !== 'All') {
             console.warn("Status filtering is not yet implemented in resource data.");
        }

        // all filters passed
        return true;
    });

    const doNogginSearch = async() => {
        setSearchSpinner(true);
        const allResourceInfo = resources.map((r, i) => `${i}. Title: ${r.title}, Posted By: ${r.postedBy}, Description: ${r.description}, Address: ${r.address}, Location: ${r.location}, Hours: ${r.hours}, Contact: ${r.contact}, Type: ${r.type}, Status: ${r.status}, Time Posted: ${r.timePosted}`).join('\n');

        const response = await fetch(
            'https://noggin.rea.gent/surviving-iguana-8198',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_ytcfh8iyego2i3i5di2npzebv2jwtr8blzq5_ngk',
                },
                body: JSON.stringify({
                    // fill variables here.
                    "prompt": allResourceInfo,
                    "request": searchInput,
                }),
            });
            
            const text = await response.text();
            const indices = text.match(/\d+/g).map(Number);

            const nogginResultsBools = indices.map(i => resources[i]).filter(Boolean);
            setNogginFilterRes(nogginResultsBools);
            setSearchSpinner(false);
    };

    const filterLogic = (resources) => {
        return resources.filter(resource => {
            // filter by type
            const typeFilter = activeFilters['resource-type'];
            if (typeFilter !== 'All' && (!resource.type || !Array.isArray(resource.type) || !resource.type.includes(typeFilter))) {
                return false;
            }
    
            //filter by location
            const locationFilter = activeFilters['location'];
            if (locationFilter !== 'All Areas' && (!resource.location || resource.location !== locationFilter)) {
                return false; 
            }
    
            // filter by status
            const statusFilter = activeFilters['status'];
            if (statusFilter !== 'All') {
                 console.warn("Status filtering is not yet implemented in resource data.");
            }
    
            // all filters passed
            return true;
        })};

    const doLocSearch = async() => {
        if (!locInput) {
            alert("Please enter a location.");
            return;
        }

        setSearchSpinner(true);
        const allResourceInfo = resources.map((r, i) => `${i}. Location: ${r.location}`).join('\n');

        // import fetch from 'node-fetch'; // for node.js

        const response = await fetch(
            'https://noggin.rea.gent/hidden-snake-4976',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_sel28t9vkg4rrt9gtm6cttxg4p3yn5kzxfsa_ngk',
                },
                body: JSON.stringify({
                    // fill variables here.
                    "var1": allResourceInfo,
                    "var2": locInput,
                }),
            }
        );

        const text = await response.text();
        if (text.includes('-1')) {
            alert("No matches for the inputted location!");
            setLocInput("");
            setSearchSpinner(false);
            return;
        }
        const indices = text.match(/\d+/g).map(Number);
        

        const nogginResultsBools = indices.map(i => resources[i]).filter(Boolean);
        setNogginFilterRes(nogginResultsBools);
        setSearchSpinner(false);
    }

    const finalResultsToShow = nogginFilerRes.length > 0 ? filterLogic(nogginFilerRes) : filterLogic(filteredResources);

    const clearFiltersFunc = () => {
        setActiveFilters({
            'resource-type': 'All',
            'location': 'All Areas',
            'status': 'All' 
        });
        setSearchInput('');
        setLocInput('');
        setNogginFilterRes([]);
    };

    const handleSaveResource = async (resource) => {
        if (!user) {
            console.log("User must be logged in to save.");
            alert("Please log in to save this resource.");
            return; 
        }

        try {
            const savedRef = doc(db, 'savedResources', `${user.$id}_${resource.id}`);
            console.log(user.$id);

            await setDoc(savedRef, {
              ...resource,
              savedBy: user.$id,
            });
        
            console.log('Post saved successfully');
            setSavedResourcesIds(prev => new Set(prev).add(resource.id));
            console.log("savedResourcesIds miau", savedResourcesIds);
        } catch (error) {
            console.error("Error saving resource: ", error);
            alert("There was an error saving this resource. Please try again.");
        }
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
                    {!loading && user && (
                        <button onClick={toggleForm} className='post-rsrc btn'>+ POST NEW RESOURCE</button>
                    )}                
                </div>
                {/* new resource post */}
                {showForm && user && (
                    <div className='rsrc-post-container'>
                        <form className='rsrc-post-form' onSubmit={handlePostResource}>
                            <h3>Share a Resource</h3>
                            <div className='rsrc-form-group'>
                                <label htmlFor='rsrc-title'>Resource Title*</label>
                                <input
                                    type='text'
                                    id='rsrc-title'
                                    placeholder='e.g., Food Drive at Community Center'
                                    required
                                    value={resourceTitle}
                                    onChange={(e) => setResourceTitle(e.target.value)}
                                ></input>
                            </div>
                            <div className='rsrc-form-group'>
                                <label htmlFor='resrc-description'>Description*</label>
                                <textarea
                                    id='resrc-description'
                                    placeholder='Provide details about the resource, availability, requirements, etc.'
                                    required
                                    value={resourceDescription}
                                    onChange={(e) => setResourceDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='rsrc-form-group'>
                                <label htmlFor='rsrc-location'>Location*</label>
                                <input
                                    type='text'
                                    id='rsrc-location'
                                    placeholder='Address or area'
                                    required
                                    value={resourceLocation}
                                    onChange={(e) => setResourceLocation(e.target.value)}
                                ></input>
                            </div>
                            <div className='rsrc-form-group'>
                                <label htmlFor='rsrc-type'>Resource Type*</label>
                                <p>Hold Control or Command to select multiple</p>
                                <select
                                    id='rsrc-type'
                                    required
                                    multiple
                                    value={resourceType}
                                    onChange={(e) => {
                                        const options = e.target.options;
                                        const selectedValues = [];
                                        for (let i = 0; i < options.length; i++) {
                                            if (options[i].selected) {
                                                selectedValues.push(options[i].value);
                                            }
                                        }
                                        setResourceType(selectedValues);
                                    }}
                                >
                                    <option value="" disabled>-- Select Type --</option>
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
                            <div className='rsrc-form-group'>
                                <label htmlFor='rsrc-dates'>Dates Available</label>
                                <input
                                    type='text'
                                    id='rsrc-dates'
                                    placeholder='e.g., April 23-20, or Ongoing'
                                    value={resourceDates}
                                    onChange={(e) => setResourceDates(e.target.value)}
                                ></input>
                            </div>
                            <div className='rsrc-form-group'>
                                <label htmlFor='rsrc-contact'>Contact Information</label>
                                <input
                                    type='text'
                                    id='rsrc-contact'
                                    placeholder='Phone number, email, or website'
                                    value={resourceContact}
                                    onChange={(e) => setResourceContact(e.target.value)}
                                ></input>
                            </div>
                            <div className='rsrc-form-actions'>
                                <button type="button" className='cancel-btn rsrc-btn' onClick={toggleForm}>CANCEL</button>
                                <button type="submit" className='submit-btn rsrc-btn'>POST RESOURCE</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="rsrc-filter-bar">
                    <div className="rsrc-filter-groups">
                         {[
                         { group: 'resource-type', title: 'Resource Type', options: ['All','Food','Water','Medical','Shelter','Clothing','Financial','Cleanup','Supplies','Transportation'] },
                         { group: 'location', title: 'Location (within 5 miles)', options: []},
                         { group: 'status', title: 'Status', options: ['All','Verified','Urgent','Active'] }
                         ].map(({ group, title, options }) => (
                         <div key={group} className={`rsrc-filter-group ${group}`}>
                             <h4>{title}</h4>
                             <div className="rsrc-filter-options">
                             {options.map((opt, i) => (
                                 <span
                                     key={i}
                                     className={`rsrc-filter-tag ${activeFilters[group] === opt ? 'active' : ''}`}
                                     onClick={() => handleFilterClick(group, opt)} 
                                 >
                                     {opt}
                                 </span>
                             ))}
                             {group === 'location' && (<div className='loc-bar'> <input type='text' placeholder='City or zip code' value={locInput} onChange={(x) => setLocInput(x.target.value)}/>
                             <button className='go-btn' onClick={doLocSearch}>Go</button> </div>)}
                             </div>
                         </div>
                            ))}
                    </div>
                    <div className="search-bar">
                        {/* TODO: Implement search functionality */}
                        <input type="text" value={searchInput} placeholder="Search resources..." onChange={(x) => setSearchInput(x.target.value)}/>
                        <button className="search-btn" onClick={doNogginSearch} disabled={searchSpinner}>{searchSpinner ? "Searching..." : "Search"}</button>
                        <button className='clear-filters-btn' onClick={clearFiltersFunc}> Clear Filters </button>
                        {searchSpinner && <div className='spinner'></div>}
                    </div>
                </div>

                <div className='rsrc-posts'>
                    {finalResultsToShow.length === 0 ? (
                         <p>No resources found matching your criteria. Try adjusting your filters!</p>
                    ) : (
                        finalResultsToShow.map((resource) => (
                            <div key={resource.id} className='rsrc-card'>
                                <div className='rsrc-header'>
                                    <h3>{resource.title}</h3>
                                </div>
                                <div className='rsrc-meta'>
                                    <span id='post-time'>{formatRelativeTime(resource.createdAt)}</span>
                                    <span id='post-by'>Posted by: {resource.postedBy || 'Anonymous'} </span>
                                </div>
                                <p>{resource.description}</p>
                                {resource.location && <p><strong>Location:</strong> {resource.location}</p>}
                                {resource.datesAvailable && <p><strong>Dates Available:</strong> {resource.datesAvailable}</p>}
                                {resource.contact && <p><strong>Contact:</strong> {resource.contact}</p>}

                                {resource.type && Array.isArray(resource.type) && resource.type.length > 0 && (
                                    <div className="tag-list">
                                        {resource.type.map((typeTag, index) => (
                                            <span key={index} className="tag">{typeTag}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="resource-actions">
                                    <div className="action-btns">
                                        <div className='helpful-share'>
                                            <div className='verify-container'>
                                                <button className="action-btn" 
                                                    onClick={() => handleVerifyClick(resource.id)}
                                                    title={(!user) ? "Log in to verify this resource." : "I verify that this information is correct and helpful."}
                                                >✅ Verify ({resource.helpfulCount || 0})</button>
                                                <span className='rsrc-popup'>
                                                    {(!user) ? "Log in to verify this resource." : "I verify that this information is correct and helpful."}
                                                </span>
                                            </div>
                                            <button className="action-btn">💬 Share</button>
                                        </div>
                                        {savedResourcesIds.has(resource.id) ? (
                                            <button disabled className="action-btn">Saved!</button>
                                            ) : (
                                            <button className="action-btn" onClick={() => handleSaveResource(resource)}>📌 Save</button>
                                            )}
                                        {/* <button className="action-btn" onClick={() => handleSaveResource(resource)}>📌 Save</button> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

export default ResourcePage; 
                        
