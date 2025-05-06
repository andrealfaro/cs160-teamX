import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/legal.css';

function DocumentsPage() { 
    const [step, setStep] = useState(1);
    const [apiResult, setApiResult] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [selections, setSelections] = useState({
        ID: false,
        BirthCertificate: false,
        ImmigrationPapers: false,
        PropertyDeeds: false,
        SSN: false,
        Passport: false,
        other: '',
      });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelections({ ...selections, [name]: checked });
    };

    const handleOtherChange = (e) => {
        setSelections({ ...selections, other: e.target.value });
      };

      const handleGoToLegal = () => {
        navigate('/legal-rights');  // whatever route you want to go to
      };
      

    const handleNextSteps = async () => {
        setLoading(true);
        try {
            const selectedOptions = Object.entries(selections).filter(([key, value]) => value === true || (key === 'other' && value.trim() !== '')).map(([key, value]) => key === 'other' ? value : key);
            const response = await fetch(
                'https://noggin.rea.gent/elaborate-wren-9106',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_somle2gvd45hxbht3oeluaja52ms8g4m4wdh_ngk',
                  },
                  body: JSON.stringify({
                    // fill variables here.
                    "toReplace": selectedOptions,
                  }),
                }
              );
          const result = await response.text();
          setApiResult(result);
          setStep(2); // move to next step once API responds
    
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
            <h1>Lost Documents</h1>
            <div className="center-text resource-icon">📝</div>
            {step === 1 && (
                <>
                    <h2 className='center-text'>Which important documents do you need replaced?</h2>
                    <div className='check-contain'>
                        <label className='checkbox-label'><input type="checkbox" name="ID" checked={selections.unsafeHome} onChange={handleCheckboxChange} className='checkbox-input'/>ID / Driver's License</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="BirthCertificate" checked={selections.shelteringEvacuees} onChange={handleCheckboxChange} className='checkbox-input'/>Birth Certificate</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="ImmigrationPapers" checked={selections.rentIssue} onChange={handleCheckboxChange} className='checkbox-input'/>Immigration Papers</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="PropertyDeeds" checked={selections.unsafeHome} onChange={handleCheckboxChange} className='checkbox-input'/>Property Deeds</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="SSN" checked={selections.unsafeHome} onChange={handleCheckboxChange} className='checkbox-input'/>Social Security Card</label><br/>
                        <label className='checkbox-label'><input type="checkbox" name="Passport" checked={selections.unsafeHome} onChange={handleCheckboxChange} className='checkbox-input'/>Passport</label><br/>
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
                    <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            {step === 2 && (
                <>
                    <h2 className='center-text'>These are the steps you should take to recover your documents</h2>
                    <div className="result-output">{apiResult.split('\n').map((line, idx) => ( <p key={idx}>{line}</p>))}</div>
                    <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            <Footer />
        </div>
    );
}; 

export default DocumentsPage;