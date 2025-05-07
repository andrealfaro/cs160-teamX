import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ResourcePage from '../pages/ResourcePage';
import LiveUpdatesPage from '../pages/LiveUpdatesPage';
import LegalPage from '../pages/LegalPage';
import CommunityPage from '../pages/CommunityPage';
import AboutPage from '../pages/AboutPage';
import UserProfilePage from '../pages/UserProfilePage';
import InsurancePage from '../pages/InsurancePage';
import HousingPage from '../pages/HousingPage';
import EmploymentPage from '../pages/EmploymentPage';
import DependentsPage from '../pages/DependentsPage';
import DocumentsPage from '../pages/DocumentsPage';
import GeneralPage from '../pages/GeneralPage';


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
                {/* <Route path='/about' element= {<AboutPage/>}/> */}
                <Route path='/user-profile' element= {<UserProfilePage/>}/>
                <Route path='/insurance-help' element= {<InsurancePage/>}/>
                <Route path='/housing-eviction' element= {<HousingPage/>}/>
                <Route path='/employment-help' element= {<EmploymentPage/>}/>
                <Route path='/animal-care' element= {<DependentsPage/>}/>
                <Route path='/document-replacement' element= {<DocumentsPage/>}/>
                <Route path='/general-legal-resources' element= {<GeneralPage/>}/>
            </Routes>
        </Router> 
    );
};

export default AppRoutes; 