import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/updates.css'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useAuth } from '../components/AuthContext.jsx';

// format time as 'x time ago' for update cards
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

// format timestamp as date and time for "Last updated" status
const formatSpecificDateTime = (date) => {
    if (!date) return 'Date N/A'; 

     const options = {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric', 
         hour12: true 
     };
    return date.toLocaleString('en-US', options);
};


function LiveUpdatesPage() {
    const { user, loading } = useAuth();
    
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => setShowForm(!showForm);

    const [activeFilter, setActiveFilter] = useState('All Updates');
    const [updates, setUpdates] = useState([]); 
    const [lastUpdatedDisplay, setLastUpdatedDisplay] = useState('Loading...');

    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateLocation, setUpdateLocation] = useState('');

    const [updateType, setUpdateType] = useState([]);
    const [sourceInfo, setSourceInfo] = useState('');

    const filters = [
        'All Updates',
        'Fire Sighting', 
        'Evacuation Info',
        'Road Condition', 
        'General Info',
        'Other'
    ];

    const handlePostUpdate = async (e) => {
        e.preventDefault(); 

        // basic validation - make sure that the form is filled out
        if (!updateTitle || !updateDescription || !updateLocation || updateType.length === 0 || !sourceInfo) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            // add a new document to the 'updates' collection
            await addDoc(collection(db, 'updates'), {
                title: updateTitle,
                description: updateDescription,
                location: updateLocation,
                type: updateType, 
                source: sourceInfo,
                timestamp: serverTimestamp(),
                userId: user, // store user ID if logged in
                postedBy: user.name || 'Anonymous', // default to anonymous
                helpfulCount: 0,
                shareCount: 0,
                savedBy: [],
            });

            console.log("Update posted successfully!");
            
            // clear form and hide (should only be visible when clicked)
            setUpdateTitle('');
            setUpdateDescription('');
            setUpdateLocation('');
            setUpdateType([]);
            setSourceInfo('');
            setShowForm(false);

        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Failed to post update. Please try again.");
        }
    };

    const handleVerifyClick = async (updateId) => {
        if (!user) { 
            console.log("User must be logged in to verify."); 
            alert("Please log in to verify this resource.");
            return;
        }
        try {
            const updateRef = doc(db, 'updates', updateId);
            await updateDoc(updateRef, {
                helpfulCount: increment(1), // increment the helpful count
            });
            console.log("Resource verified successfully!");
        } catch (error) {
            console.error("Error verifying resource: ", error);
            alert("There was an error verifying this resource. Please try again.");
        }
    };


    useEffect(() => {
        // fetch documents from the 'updates' collection, ordered by by most recent 
        const q = query(collection(db, 'updates'), orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatesData = [];
            querySnapshot.forEach((doc) => {
                 const data = doc.data();
                 const createdAtDate = data.timestamp?.toDate();

                 if(createdAtDate) {
                    updatesData.push({
                        id: doc.id,
                        ...data,
                        createdAt: createdAtDate, 
                    });
                 } else {
                     console.warn(`Document ${doc.id} is missing a valid timestamp or was pending.`);
                 }
            });

            console.log("Fetched updates:", updatesData); 
            setUpdates(updatesData); // update state with fetched data

            if (updatesData.length > 0 && updatesData[0].createdAt) {
                // formatSpecificDateTime for the main header display (last updated)
                setLastUpdatedDisplay(formatSpecificDateTime(updatesData[0].createdAt));
            } else {
                // if no updates
                setLastUpdatedDisplay('No updates yet');
            }

        }, (error) => {
            console.error("Error fetching updates: ", error);
            setLastUpdatedDisplay('Error loading updates'); 
        });

        return () => unsubscribe();
    }, []); 

    // filter updates based on activeFilter
    const filteredUpdates = updates.filter(update => {
        if (activeFilter === 'All Updates') {
            return true; 
        }
        // check if the update's type array includes the active filter value
         if (update.type && Array.isArray(update.type)) {
            return update.type.includes(activeFilter);
         }
         return false;
    });


    return (
        <div className='main-container'>
            <Header/>
            <div className='updates-content-container'>
                <div className='title-section'>
                    <div className='update-title'>
                        <h1>Live Community Updates</h1>
                        <p>Last updated: {lastUpdatedDisplay}</p>
                    </div>
                    <div className='update-refresh'>
                        {!loading && user && (
                            <button onClick={toggleForm} className='post-update btn'>+ POST NEW UPDATE</button>
                        )}
                        <button className='refresh-update btn' onClick={() => {}}>Refresh Updates</button>
                    </div>
                </div>
                <div className='safety-update'>
                    <h2>Safety Update</h2>
                    <p>For life-threatening emergencies, call 911.</p>
                    <p>Only share verified information. Do not put yourself at risk to gather information.</p>
                    <p><strong>Note:</strong> This is a community-driven platform. Please verify information before acting on it.</p>
                </div>
                {/* new update post */}
                {showForm && user && (
                    <div className='upd-post-container'>
                        <form className='upd-post-form' onSubmit={handlePostUpdate}>
                            <h3>Share an Update</h3>
                            <div className='upd-form-group'>
                                <label htmlFor='update-title'>Update Title*</label>
                                <input
                                    type='text'
                                    id='update-title'
                                    placeholder='e.g., Evacuation notice for North part of Berkeley'
                                    required
                                    value={updateTitle} 
                                    onChange={(e) => setUpdateTitle(e.target.value)}
                                />
                            </div>
                            <div className='upd-form-group'>
                                <label htmlFor='update-description'>Description*</label>
                                <textarea
                                    id='update-description'
                                    placeholder='Provide details about the resource, availability, requirements, etc.'
                                    required
                                    value={updateDescription} 
                                    onChange={(e) => setUpdateDescription(e.target.value)} 
                                ></textarea>
                            </div>
                            <div className='upd-form-group'>
                                <label htmlFor='update-location'>Location*</label>
                                <input
                                    type='text'
                                    id='update-location'
                                    placeholder='Address or area'
                                    required
                                    value={updateLocation} 
                                    onChange={(e) => setUpdateLocation(e.target.value)} 
                                />
                            </div>
                            <div className='upd-form-group'>
                                <label htmlFor='update-type'>Update Type*</label>
                                <p>Hold Control or Command to select multiple</p> 
                                <select
                                    id='update-type'
                                    required
                                    multiple
                                    value={updateType} 
                                    onChange={(e) => {
                                        const options = e.target.options;
                                        const selectedValues = [];
                                        for (let i = 0; i < options.length; i++) {
                                            if (options[i].selected) {
                                                selectedValues.push(options[i].value);
                                            }
                                        }
                                        setUpdateType(selectedValues);
                                    }}
                                >
                                    <option value="" disabled>-- Select Type(s) --</option>
                                    <option value="Fire Sighting">Fire Sighting</option>
                                    <option value="Road Condition">Road Condition</option>
                                    <option value="Evacuation Info">Evacuation Info</option>
                                    <option value="General Info">General Info</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='upd-form-group'>
                                <label htmlFor='source-info'>Source of Information*</label>
                                <select
                                    id='source-info'
                                    required
                                    value={sourceInfo} 
                                    onChange={(e) => setSourceInfo(e.target.value)} 
                                >
                                    <option value="" disabled>--Select Source--</option>
                                    <option value='Personal Observation'>I observed this directly</option>
                                    <option value='Local Official'>Local official</option>
                                    <option value='Friend/Neighbor'>Friend/neighbor</option>
                                    <option value='News Source'>Local news</option>
                                    <option value='Social Media'>Social media</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className='upd-form-actions'>
                                <button className='cancel-btn update-btn' type='button' onClick={toggleForm}>CANCEL</button>
                                <button className='submit-btn update-btn' type='submit'>POST UPDATE</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className='upd-filter-bar'>
                    {filters.map((filter) => (
                        <button
                        key={filter}
                        className={`upd-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                        >
                        {filter}
                        </button>
                    ))}
                </div>
                <div className='updates-list'>
                    {filteredUpdates.length === 0 ? (
                        <p>No updates found matching the current filters. Try posting one!</p>
                    ) : (
                        filteredUpdates.map(update => (
                            <div className='update-card' key={update.id}> 
                                <div className='update-header'>
                                    <h3>{update.title}</h3>
                                    <span id='post-time'>{formatRelativeTime(update.createdAt)}</span>
                                </div>
                                <div className='update-meta'>
                                    <span id='post-by'>Posted by: {update.postedBy || 'Anonymous'}</span>
                                </div>
                                <p>{update.description}</p>
                                {update.location && <p><strong>Location:</strong> {update.location}</p>}

                                <div className="tag-list">
                                    {update.type && Array.isArray(update.type) && update.type.map((tag, index) => (
                                        <span className="tag" key={index}>{tag}</span>
                                    ))}
                                    {update.source && <span className="tag">{update.source}</span>}
                                </div>
                                <div className="update-actions">
                                    <div className="action-btns">
                                        <div className='helpful-share'>
                                            <button className="action-btn" onClick={() => handleVerifyClick(update.id)}>✅ Verify ({update.helpfulCount || 0})</button>
                                            <button className="action-btn">💬 Share</button>
                                        </div>
                                        <button className="action-btn">📌 Save</button>
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

export default LiveUpdatesPage;


