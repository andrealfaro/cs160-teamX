import React from 'react'; 
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 
import { doc, deleteDoc, setDoc, getDocs, where } from "firebase/firestore";
import { useAuth } from './AuthContext';

function UserUpdateCard({filteredUpdatesId}) { 
    const [updates, setUpdates] = useState([]);
    const { user } = useAuth();
    const [lastUpdatedDisplay, setLastUpdatedDisplay] = useState('Loading...');
    const [filteredPublishedUpdates, setFilteredPublishedUpdates] = useState([]);


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

    const handleDelete = async (postId) => {
        try {
          await deleteDoc(doc(db, 'updates', postId));
          console.log('Post deleted successfully');
        } catch (err) {
          console.error("Error deleting post:", err);
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

    const fetchSavedPosts = async (userId) => {
        const q = query(collection(db, "savedPosts"), where("savedBy", "==", userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };
    
      useEffect(() => {
        if (!user) return;
      
        const updateFiltered = async () => {
          if (filteredUpdatesId === 'saved') {
            const saved = await fetchSavedPosts(user.$id);
    
            const normalized = saved.map(post => ({
                ...post,
                createdAt: post.timestamp?.toDate ? post.timestamp.toDate() : new Date(post.timestamp)
              }));
            setFilteredPublishedUpdates(normalized);
          } else {
            const posted = updates.filter(update => update.postedBy === user.name);
            setFilteredPublishedUpdates(posted);
            console.log("miau posted:", posted);
          }
        };
      
        updateFiltered();
      }, [filteredUpdatesId, user, updates]);

    return (
        <div className='post-card'>
            {filteredPublishedUpdates.length === 0 ? (
                <p>No posts found under your account. Try posting one in the Live Community Updates Page!</p>
            ) : (
                filteredPublishedUpdates.map(update => (
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
                                    {/* /* <button className="action-btn">✅ Verify ({update.helpfulCount || 0})</button> */}
                                    {/* <button className="action-btn">Remove from Saved</button>  */}
                                </div>
                                <div className='delete-save'>
                                    {filteredUpdatesId !== 'saved' && (
                                        <button className="action-btn" onClick={() => handleDelete(update.id)}>🗑️ Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div> 
        )
    ;
}; 

export default UserUpdateCard;