import React from 'react'; 
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 
import { doc, deleteDoc, setDoc, getDocs, where } from "firebase/firestore";
import { useAuth } from './AuthContext';

function UserResourceCard({filteredResourceId}) { 
    const [resources, setResources] = useState([]);
    const { user } = useAuth();
    const [lastUpdatedDisplay, setLastUpdatedDisplay] = useState('Loading...');
    const [filteredPublishedResources, setFilteredPublishedResources] = useState([]);


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
        const q = query(collection(db, 'resources'), orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const resourcesData = [];
            querySnapshot.forEach((doc) => {
                 const data = doc.data();
                 const createdAtDate = data.timestamp?.toDate();

                 if(createdAtDate) {
                    resourcesData.push({
                        id: doc.id,
                        ...data,
                        createdAt: createdAtDate, 
                    });
                 } else {
                     console.warn(`Document ${doc.id} is missing a valid timestamp or was pending.`);
                 }
            });

            console.log("Fetched resources:", resourcesData); 
            setResources(resourcesData); // update state with fetched data

            if (resourcesData.length > 0 && resourcesData[0].createdAt) {
                // formatSpecificDateTime for the main header display (last updated)
                setLastUpdatedDisplay(formatSpecificDateTime(resourcesData[0].createdAt));
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
          if (filteredResourceId === 'saved') {
            const saved = await fetchSavedPosts(user.$id);
    
            const normalized = saved.map(post => ({
                ...post,
                createdAt: post.timestamp?.toDate ? post.timestamp.toDate() : new Date(post.timestamp)
              }));
            setFilteredPublishedResources(normalized);
          } else {
            const posted = resources.filter(resources => resources.postedBy === user.name);
            setFilteredPublishedResources(posted);
            console.log("miau posted:", posted);
          }
        };
      
        updateFiltered();
      }, [filteredResourceId, user, resources]);

    return (
        <div className='post-card'>
            {filteredPublishedResources.length === 0 ? (
                <p>No posts found under your account. Try posting one in the Resources Page!</p>
            ) : (
                filteredPublishedResources.map(resource => (
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
                                        {/* <button className="action-btn" 
                                            onClick={() => handleVerifyClick(resource.id)}
                                            title={(!user) ? "Log in to verify this resource." : "I verify that this information is correct and helpful."}
                                        >✅ Verify ({resource.helpfulCount || 0})</button> */}
                                        <span className='rsrc-popup'>
                                            {(!user) ? "Log in to verify this resource." : "I verify that this information is correct and helpful."}
                                        </span>
                                    </div>
                                    {/* <button className="action-btn">💬 Share</button> */}
                                </div>
                                {/* <button disabled className="action-btn">📌 Saved!</button> */}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div> 
        )
    ;
}; 

export default UserResourceCard;