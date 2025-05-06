import React from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/userprofile.css';
import { useAuth } from '../components/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 

function UserProfilePage() { 
    const { user, loading, getUserProfilePicture } = useAuth();

    const [location, setLocation] = useState('');
    const [updates, setUpdates] = useState([]); 
    const [profilePicture, setProfilePicture] = useState([]);
    const [lastUpdatedDisplay, setLastUpdatedDisplay] = useState('Loading...');

    useEffect(() => {
        if (!loading && user) {
            const loadPicture = async () => {
              try {
                const pic = await getUserProfilePicture();
                console.log(pic);
                setProfilePicture(pic);
                console.log(profilePicture);
              } catch (error) {
                console.error('Failed to fetch profile picture:', error);
                setProfilePicture(null);
              }
            };
      
            loadPicture();
          }
        }, [loading, user, getUserProfilePicture]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((currPos) => {
                const lat = currPos.coords.latitude; //47.35259539134266
                const lon = currPos.coords.longitude; //-96.49255693382979

                const url = `https://api.weather.gov/points/${lat},${lon}`;

                fetch (url)
                    .then((data) => {
                    return data.json(); 
                })

                .then((json) => {

                    const city = json.properties.relativeLocation.properties.city;
                    const state = json.properties.relativeLocation.properties.state;
                    setLocation(`${city}, ${state}`);
       
                });
            });
        }
    }, []);

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

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (!user) {
        return <p>User not logged in.</p>;
    }

    const filteredUpdates = updates.filter(update => {
        if (update.postedBy === user.name) {
            return true; 
        }
         return false;
    });



    return (
        <div className='page-container'>
       
            <Header/>
            <div className='main-container'>
                <div className='title-container'>
                    <h1>User Profile</h1>
                </div>
                
                <div className='user-container'>
                    <div className='user-profile-card'>
                        <img id='profile-picture' src={profilePicture } alt='User Profile' />
                        <h1>{user.name}</h1>
                        <p><span id='location'>{location || 'Loading...'}</span></p>
                        <p>{user.email}</p>
                    </div>

                    <div className='post-container'>
                        <h2>Posts</h2>
                        <div className='post-card'>
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
                                                <button className="action-btn">✅ Verify ({update.helpfulCount || 0})</button>
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

                </div> 
            </div>
            <Footer />
        </div>
    );
}; 

export default UserProfilePage;