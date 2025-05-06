import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';

import '../styles/legal.css';

function InsuranceHelp() { 
    const [step, setStep] = useState(1);
    const [insuranceName, setInsuranceName] = useState('');
    const [damageType, setDamageType] = useState('');
    const [apiResult, setApiResult] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            const response = await fetch(
                'https://noggin.rea.gent/passing-galliform-7022',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_2n7c2ftjh1s0tamxbvyfecqvb7vhgmftaanu_ngk',
                },
                body: JSON.stringify({
                    // fill variables here.
                    damageType,
                    insuranceName,
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

    return (
        <div>
            <Header/>
            <h1>Property Damage & Insurance</h1>
            <div className="center-text resource-icon">📄</div>
            {step === 1 && (
                <>
                    <h2 className='center-text'>Have you filed a claim with your insurance company yet?</h2>
                    <div className='btn-container'>
                        <div className='legal-btn' onClick={() => setStep(2)}>Yes</div>
                        <div className='legal-btn' onClick={() => setStep(3)}>No</div>
                    </div>
                    <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            {step === 2 && (
                <>
                <h2 className='center-text'>Do you need help with claim denials or appeals?</h2>
                <div className='btn-container'>
                    <div className='legal-btn' onClick={() => setStep(3)}>Yes</div>
                    <div className='legal-btn' onClick={() => setStep(4)}>No</div>
                </div>
                <div className='back-btn' onClick={handleBack}>Back</div>
                </>
            )}

            {step === 3 && (
                <>
                <h2 className='center-text'>We can help you start the claims process.</h2>
                <div className='contain'>
                    <Dropdown options = {['Structural Damage', 'Water Damage', 'Smoke Damage', 'Personal Property Loss', 'Outside/Exterior Damage', 'Utility Systems Damage', 'Secondary/Indirect Damage']} placeholder="Select Damage Type" onSelect={(value) => setDamageType(value)}/>
                    <div className='text-input'>
                        <input type="text" placeholder="Enter name of insurance" value={insuranceName} onChange={(e) => setInsuranceName(e.target.value)}/>
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

            {step === 4 && (
                <>
                <h2 className='center-text'>Okay, check out our other resources if needed.</h2>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}

            {step === 5 && (
                <>
                <h2 className='center-text'>Next Steps to File an Insurance Claim</h2>
                <div className="result-output">{apiResult.split('\n').map((line, idx) => ( <p key={idx}>{line}</p>))}</div>
                <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            <Footer />

        </div>
    );
}; 

export default InsuranceHelp;