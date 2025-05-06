import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';
// @ts-ignore
import EmploymentRights from '../components/EmploymentRights';
import '../styles/legal.css';

function EmploymentPage() { 
    const [step, setStep] = useState(1);
    const [unemployedTime, setUnemployedTime] = useState('');
    const [destroyedType, setDestroyedType] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [apiResult, setApiResult] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [selections, setSelections] = useState({
        unsafeHome: false,
        shelteringEvacuees: false,
        rentIssue: false,
        rentIncrease: false,
        evictionNotice: false,
        other: '',
      });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelections({ ...selections, [name]: checked });
    };

    const handleOtherChange = (e) => {
        setSelections({ ...selections, other: e.target.value });
      };

    const handleBack = () => {
        if (step == 6) {
          setStep(1);
        }
        if (step == 2) {
            setStep(1);
        }
        if (step == 3) {
            setStep(2);
        }
        if (step == 4) {
            setStep(1);
        }
        if (step == 5) {
            setStep(4);
        }
      };

      const handleGoToLegal = () => {
        navigate('/legal-rights');  // whatever route you want to go to
      };
      

    const handleNextSteps = async () => {
        setLoading(true);
        try {
            // import fetch from 'node-fetch'; // for node.js
            const response = await fetch(
                'https://noggin.rea.gent/smooth-cobra-5924',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_eywo1sgzszw9ojmskkgy1wb4xaomdn9lr42q_ngk',
                  },
                  body: JSON.stringify({
                    // fill variables here.
                    "jobTitle": jobTitle,
                    "unemploymentTime": unemployedTime,
                    "employmentStatus": employmentStatus,
                    "YN": destroyedType,
                  }),
                }
              )
    
          const result = await response.text();
          setApiResult(result);
          setStep(3); // move to next step once API responds
    
        } catch (error) {
            console.error('Error sending data:', error);
            setApiResult('Sorry, there was a problem submitting your info. Please try again.');
            setStep(5);
        }
        setLoading(false);
      };

    return (
        <div>
            <Header/>
            <h1>Employment & Lost Wages</h1>
            <div className="center-text resource-icon">👷</div>
            {step === 1 && (
                <>
                    <h2 className='center-text'>Have you missed work or lost your job due to a wildfire?</h2>
                    <div className='btn-container'>
                        <div className='legal-btn' onClick={() => setStep(2)}>Yes</div>
                        <div className='legal-btn' onClick={() => setStep(4)}>No</div>
                    </div>
                    <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            {step === 2 && (
                <>
                <h2 className='center-text'>Enter your scenario</h2>
                <div className='contain-e'>
                    <div className='text-bar-e'>
                        <input type="text" placeholder="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/><br/>
                    </div>
                    <Dropdown options = {['Yes', 'No']} placeholder="Was your workplace destroyed?" onSelect={(value) => setDestroyedType(value)}/>
                    <div className='text-bar-e'>
                        <input type="text" placeholder="How long were you out of work for?" value={unemployedTime} onChange={(e) => setUnemployedTime(e.target.value)}/><br/>
                    </div>
                    <Dropdown options = {['Employee (W-2)', 'Independent Contractor (1099 / self-employed)', 'Undocumented Worker', 'Day Laborer / Informal Work Domestic Worker']} placeholder="Employment Status" onSelect={(value) => setEmploymentStatus(value)}/>
                </div>
                {loading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                )}
                <div className='center-item'>
                    <div className='next-btn' onClick={handleNextSteps}>Next Steps</div>
                </div>
                <div className='back-btn' onClick={handleBack}>Back</div>
                </>
            )}

            {step === 3 && (
                <>
                <h2 className='center-text'>Here are the steps you should take</h2>
                <div className="result-output">{apiResult.split('\n').map((line, idx) => ( <p key={idx}>{line}</p>))}</div>
                <div className='back-btn' onClick={handleBack}>Back</div>
                </>
            )}

            {step === 4 && (
                <>
                <h2 className='center-text'>Would you like to learn about your job protections and employment rights during wildfire recovery?</h2>
                <div className='btn-container'>
                        <div className='legal-btn' onClick={() => setStep(6)}>Yes</div>
                        <div className='legal-btn' onClick={() => setStep(5)}>No</div>
                </div>
                <div className='back-btn' onClick={handleBack}>Back</div>
                </>
            )}

            {step === 5 && (
                <>
                <h2 className='center-text'>Okay, check out our other resources if needed.</h2>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            {step === 6 && (
                <>
                <EmploymentRights/>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            <Footer />

        </div>
    );
}; 

export default EmploymentPage;