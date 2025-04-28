import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ResourcePage from '../pages/ResourcePage';
import LiveUpdatesPage from '../pages/LiveUpdatesPage';
import LegalPage from '../pages/LegalPage';
import CommunityPage from '../pages/CommunityPage';

// page linking
function AppRoutes() { 
    return  (
        <Router> 
            <Routes> 
                <Route path='/' element= {<HomePage/>}/> 
                <Route path='/home' element= {<HomePage/>}/> 
                <Route path='/resource' element= {<ResourcePage/>}/> 
                <Route path='/updates' element= {<LiveUpdatesPage/>}/>
                <Route path='/legal' element= {<LegalPage/>}/>
                <Route path='/community' element= {<CommunityPage/>}/>
            </Routes>
        </Router> 
    );
};

export default AppRoutes; 