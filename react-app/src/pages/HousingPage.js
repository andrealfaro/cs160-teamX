import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';
import '../styles/legal.css';

function HousingPage() { 
    const [step, setStep] = useState(1);
    const [helpType, setHelpType] = useState('');
    const [urgencyType, setUrgencyType] = useState('');
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
            setStep(1);
        }
        if (step == 4) {
            setStep(3);
        }
        if (step == 6) {
            setStep(3);
        }
      };

      const handleGoToLegal = () => {
        navigate('/legal-rights');  // whatever route you want to go to
      };
      

    const handleNextSteps = async () => {
        setLoading(true);
        try {
            const selectedOptions = Object.entries(selections).filter(([key, value]) => value === true || (key === 'other' && value.trim() !== '')).map(([key, value]) => key === 'other' ? value : key);
            // import fetch from 'node-fetch'; // for node.js

            const response = await fetch(
                'https://noggin.rea.gent/coming-harrier-1199',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_gd657pduv4p8qn9tkb6c5clhxniwhkyhvf11_ngk',
                  },
                  body: JSON.stringify({
                    // fill variables here.
                    "reasons": selectedOptions,
                  }),
                }
              );
    
          const result = await response.text();
          setApiResult(result);
          setStep(5); // move to next step once API responds
    
        } catch (error) {
            console.error('Error sending data:', error);
            setApiResult('Sorry, there was a problem submitting your info. Please try again.');
            setStep(5);
        }
        setLoading(false);
      };

      const handleNextSteps2 = async () => {
        setLoading(true);
        try {
            const selectedOptions = Object.entries(selections).filter(([key, value]) => value === true || (key === 'other' && value.trim() !== '')).map(([key, value]) => key === 'other' ? value : key);
            console.log(selectedOptions);
            // import fetch from 'node-fetch'; // for node.js

            const response = await fetch(
                'https://noggin.rea.gent/influential-mule-5546',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_za5lr4z3ot2tzarnj8z9dctedru7ssot90aw_ngk',
                  },
                  body: JSON.stringify({
                    // fill variables here.
                    "helpType": helpType,
                    "urgencyLevel": urgencyType,
                  }),
                }
              );
    
          const result = await response.text();
          setApiResult(result);
          setStep(7); // move to next step once API responds
    
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
            <h1>Housing & Eviction</h1>
            <div className="center-text resource-icon">🏠</div>
            {step === 1 && (
                <>
                    <h2 className='center-text'>Are you currently being asked to leave your home by your landlord, property manager, or city official?</h2>
                    <div className='btn-container'>
                        <div className='legal-btn' onClick={() => setStep(2)}>Yes</div>
                        <div className='legal-btn' onClick={() => setStep(3)}>No</div>
                    </div>
                    <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            {step === 2 && (
                <>
                <h2 className='center-text'>Select the reasons for eviction</h2>
                <div className='check-contain'>
                    <label className='checkbox-label'><input type="checkbox" name="unsafeHome" checked={selections.unsafeHome} onChange={handleCheckboxChange} className='checkbox-input'/> My home was damaged or unsafe after a fire</label><br/>
                    <label className='checkbox-label'><input type="checkbox" name="shelteringEvacuees" checked={selections.shelteringEvacuees} onChange={handleCheckboxChange} className='checkbox-input'/> I’m sheltering evacuees, pets, or family</label><br/>
                    <label className='checkbox-label'><input type="checkbox" name="rentIssue" checked={selections.rentIssue} onChange={handleCheckboxChange} className='checkbox-input'/> I can’t pay rent due to fire-related job loss/expenses</label><br/>
                    <label className='checkbox-label'><input type="checkbox" name="rentIncrease" checked={selections.rentIncrease} onChange={handleCheckboxChange} className='checkbox-input'/> I received a rent increase after the fire</label><br/>
                    <label className='checkbox-label'><input type="checkbox" name="evictionNotice" checked={selections.evictionNotice} onChange={handleCheckboxChange} className='checkbox-input'/> I was given an eviction notice</label><br/>
                    <div className='text-bar'>
                        <input type="text" placeholder="Other (describe here)" value={selections.other} onChange={handleOtherChange}/><br/>
                    </div>
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
                <h2 className='center-text'>Need help with rent, repairs, or temporary housing?</h2>
                <div className='btn-container'>
                        <div className='legal-btn' onClick={() => setStep(6)}>Yes</div>
                        <div className='legal-btn' onClick={() => setStep(4)}>No</div>
                </div>
                <div className='back-btn' onClick={handleBack}>Back</div>
                </>
            )}

            {step === 4 && (
                <>
                <h2 className='center-text'>Okay, check out our other resources if needed.</h2>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}

            {step === 5 && (
                <>
                <h2 className='center-text'>These are your rights</h2>
                <div className="result-output">{apiResult.split('\n').map((line, idx) => ( <p key={idx}>{line}</p>))}</div>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            {step === 6 && (
                <>
                <h2 className='center-text'>What kind of help do you need?</h2>
                <div className='contain'>
                    <Dropdown options = {['Rent', 'Repairs', 'Temporary Housing']} placeholder="Select Help type" onSelect={(value) => setHelpType(value)}/>
                    <Dropdown options = {['Immediate Assistance Needed (within 24 hours)', 'Urgent (within 1-3 days)', 'Soon (within a week)', 'Not Urgent (general inquiry)']} placeholder="Select Urgency" onSelect={(value) => setUrgencyType(value)}/>
                </div>
                {loading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                )}
                <div className='center-item'>
                    <div className='next-btn' onClick={handleNextSteps2}>Next Steps</div>
                </div>
                <div className='back-btn' onClick={handleBack}>Back</div>
                </>
            )}
            {step === 7 && (
                <>
                <h2 className='center-text'>Here are resources and steps you should take</h2>
                <div className="result-output">{apiResult.split('\n').map((line, idx) => ( <p key={idx}>{line}</p>))}</div>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            <Footer />

        </div>
    );
}; 

export default HousingPage;