import React from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/userprofile.css';
import { useAuth } from '../components/AuthContext.jsx';
import { useEffect, useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import UserResourceCard from '../components/UserResourceCard';

import UserUpdateCard from '../components/UserUpdateCard';
function UserProfilePage() { 
    const { user, loading, getUserProfilePicture } = useAuth();

    const [activeTab, setActiveTab] = useState('posts');
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


    if (!user) {
        return <p>User not logged in.</p>;
    }
    
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
                        {/* <img id='profile-picture' src={profilePicture } alt='User Profile' /> */}
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
                            <button className={activeTab === 'resources' ? 'active' : ''}
                                onClick={() => setActiveTab('resources')}>
                                Saved Resources
                            </button>
                        </div>
                        <div className='tab-content'>
                            {activeTab === 'posts' && (
                                    <div className='posts-container'>
                                        <h3>Your Published Posts/Resources</h3>
                                        <UserUpdateCard />
                                        <UserResourceCard />
                                    </div>
                                )
                            }
                            {activeTab === 'saved' && (
                                <div className='posts-container'>
                                    <h3>Your Saved Posts</h3>
                                    <UserUpdateCard filteredUpdatesId='saved'/>
                                </div>
                            )}
                            {activeTab === 'resources' && (
                                <div className='posts-container'>
                                    <h3>Your Saved Resources</h3>
                                    {/* <UserUpdateCard filteredUpdatesId='resources'/> */}
                                    <ResourceCard />
                                </div>
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