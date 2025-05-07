import React from 'react'; 

import { useState, useEffect } from 'react';
import { query, collection, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../components/AuthContext';

function ResourceCard() { 
    const [finalResultsToShow, setFinalResultsToShow] = useState([]);
    const { user } = useAuth();

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

    const getSavedResources = async () => {
        if (!user) {
            console.log("User must be logged in to fetch saved resources.");
            return [];
        } try {
            const q = query(
                collection(db, 'savedResources'),
                where('savedBy', '==', user.$id)
            );

            const querySnapshot = await getDocs(q);
            const savedResources = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const normalized = savedResources.map(resource => ({
                ...resource,
                createdAt: resource.timestamp?.toDate ? resource.timestamp.toDate() : new Date(resource.timestamp)
              }));
    
            console.log("Saved resources:", normalized);
            setFinalResultsToShow(normalized);
            console.log("Saved resources:", normalized);
          
          } catch (error) {
            console.error("Error fetching saved resources:", error);
          return [];
      };
          
    };   
    useEffect(() => {
        getSavedResources();
    }, []);

    return (
        <div className='rsrc-posts'>
        {finalResultsToShow.length === 0 ? (
             <p>No saved resources found. Try saving some resources on the Resource Page!</p>
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
                                    {/* <button className="action-btn" 
                                        onClick={() => handleVerifyClick(resource.id)}
                                        title={(!user) ? "Log in to verify this resource." : "I verify that this information is correct and helpful."}
                                    >✅ Verify ({resource.helpfulCount || 0})</button> */}
                                    <span className='rsrc-popup'>
                                        {(!user) ? "Log in to verify this resource." : "I verify that this information is correct and helpful."}
                                    </span>
                                </div>
                                <button className="action-btn">💬 Share</button>
                            </div>
                            {/* <button disabled className="action-btn">📌 Saved!</button> */}
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>

    );
}; 

export default ResourceCard;