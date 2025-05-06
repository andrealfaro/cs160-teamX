import React from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/userprofile.css';
import { useAuth } from '../components/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserUpdateCard from '../components/UserUpdateCard';
function UserProfilePage() { 
    const navigate = useNavigate();
    const { user, loading, getUserProfilePicture } = useAuth();

    const [activeTab, setActiveTab] = useState('posts');
    const [filteredPublishedUpdates, setFilteredPublishedUpdates] = useState([]);
    const [filteredSavedUpdates, setFilteredSavedUpdates] = useState([]);
    const [location, setLocation] = useState('');
    const [profilePicture, setProfilePicture] = useState([]);


    //getting profile picture from user's account
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

    //getting location from user's device for user card
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


    //if a user logs out while on UserProfilePage, they will be redirected to the HomePage
    useEffect(() => {
        if (!loading && !user) {
          navigate('/home');
        }
      }, [user, loading, navigate]);
    
    if (loading) return <p>Loading...</p>;



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
                        {/* <h2>Puslished Posts</h2> */}
                        <div className='tabs-navbar'>
                            <button className={activeTab === 'posts' ? 'active' : ''}
                                onClick={() => setActiveTab('posts')}>
                                Published Posts
                            </button>
                            <button className={activeTab === 'saved' ? 'active' : ''}
                                onClick={() => setActiveTab('saved')}>
                                Saved Posts
                            </button>
                        </div>
                        <div className='tab-content'>
                            {activeTab === 'posts' && (
                                    <div className='posts-container'>
                                        <h3>Your Published Posts</h3>
                                        <UserUpdateCard />
                                    </div>
                                )
                            }
                            {activeTab === 'saved' && (
                                <div className='posts-container'>
                                    <h3>Your Favorites</h3>
                                    
                                </div>
                            )}
                        </div>
                        {/* <div className='post-card'>
                            {filteredUpdates.length === 0 ? (
                            <p>No posts found under your account. Try posting one in the Live Community Updates Page!</p>
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
                                            <div className='delete-save'>
                                                <button className="action-btn">📌 Save</button>
                                                <button className="action-btn" onClick={() => handleDelete(update.id)}>🗑️ Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        </div> */}
                    </div>

                </div> 
            </div>
            <Footer />
        </div>
    );
}; 

export default UserProfilePage;