import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';
import '../styles/legal.css';

function DependentsPage() { 
    const [step, setStep] = useState(1);
    const [urgencyType, setUrgencyType] = useState('');
    const [concern, setConcern] = useState('');
    const [apiResult, setApiResult] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [selections, setSelections] = useState({
        Children: false,
        ElderlyFamily: false,
        PetsAnimals: false,
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
      };

      const handleGoToLegal = () => {
        navigate('/legal-rights');  // whatever route you want to go to
      };
      

    const handleNextSteps = async () => {
        setLoading(true);
        try {
            const selectedOptions = Object.entries(selections).filter(([key, value]) => value === true || (key === 'other' && value.trim() !== '')).map(([key, value]) => key === 'other' ? value : key);
            const response = await fetch(
                'https://noggin.rea.gent/joyous-wren-9691',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_epb3kggcuoanfqk37bmrxw8p00dbjsgddo45_ngk',
                  },
                  body: JSON.stringify({
                    // fill variables here.
                    "dependentType": selectedOptions,
                    "concern": concern,
                    "urgencyLevel": urgencyType,
                  }),
                }
              );
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
        <div className='main-container'>
            <Header/>
            <div className='title-section'>
                <h1>Dependents & Animal Care</h1>
            </div>
            <div className="center-text resource-icon">🐶</div>
            {step === 1 && (
                <>
                    <h2 className='center-text'>Are you caring for children, elderly family, or animals displaced by the wildfire?</h2>
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
                    <div className='check-contain'>
                        <label className='checkbox-label'><input type="checkbox" name="Children" checked={selections.unsafeHome} onChange={handleCheckboxChange} className='checkbox-input'/>I have child dependents</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="ElderlyFamily" checked={selections.shelteringEvacuees} onChange={handleCheckboxChange} className='checkbox-input'/>I care for elderly family</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="PetsAnimals" checked={selections.rentIssue} onChange={handleCheckboxChange} className='checkbox-input'/>I care for pets/animals</label><br/>
                        <div className='text-bar'>
                            <input type="text" placeholder="Other (describe here)" value={selections.other} onChange={handleOtherChange}/><br/>
                        </div>
                    </div>
                    <div className='text-bar-e'>
                        <input type="text" placeholder="Enter you biggest concern" value={concern} onChange={(e) => setConcern(e.target.value)}/><br/>
                    </div>
                    <Dropdown options = {['Immediate Assistance Needed (within 24 hours)', 'Urgent (within 1-3 days)', 'Soon (within a week)', 'Not Urgent (general inquiry)']} placeholder="Select Urgency" onSelect={(value) => setUrgencyType(value)}/>
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
                <h2 className='center-text'>Okay, check out our other resources if needed.</h2>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            <Footer />

        </div>
    );
}; 

export default DependentsPage;