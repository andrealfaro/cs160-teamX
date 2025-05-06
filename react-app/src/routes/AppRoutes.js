import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ResourcePage from '../pages/ResourcePage';
import LiveUpdatesPage from '../pages/LiveUpdatesPage';
import LegalPage from '../pages/LegalPage';
import CommunityPage from '../pages/CommunityPage';
import AboutPage from '../pages/AboutPage';
import UserProfilePage from '../pages/UserProfilePage';
import LoginPage from '../pages/LoginPage';


// page linking
function AppRoutes() { 
    return  (
        <Router> 
            <Routes> 
                <Route path='/' element= {<HomePage/>}/> 
                <Route path='/home' element= {<HomePage/>}/> 
                <Route path='/resources' element= {<ResourcePage/>}/> 
                <Route path='/live-updates' element= {<LiveUpdatesPage/>}/>
                <Route path='/legal-rights' element= {<LegalPage/>}/>
                <Route path='/community-contacts' element= {<CommunityPage/>}/>
                <Route path='/about' element= {<AboutPage/>}/>
                <Route path='/user-profile' element= {<UserProfilePage/>}/>
                <Route path='/login' element= {<LoginPage/>}/>
          
            </Routes>
        </Router> 
    );
};

export default AppRoutes; 