import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/legal.css';

function GeneralPage() { 

    /* 


⚖️ If "General Legal Help / Not Sure":
“No problem — we’ll connect you with free local legal services for wildfire recovery. Would you like to request a callback or visit their website?”

Direct to: Legal aid sign-up or hotline info

    */
    const [step, setStep] = useState(1);
    const [apiResult, setApiResult] = useState('');
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

      const handleGoToLegal = () => {
        navigate('/legal-rights');  // whatever route you want to go to
      };
      

    const handleNextSteps = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'https://noggin.rea.gent/willowy-moose-5177',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_hw88ifciu6zyfvx24npinvwv2kgyn34rj36m_ngk',
                  },
                  body: JSON.stringify({
                    // fill variables here.
                    "topic": topic,
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
        <div className='main-container'>
            <Header/>
            <div className="title-section">
                <h1>General Legal Help / Not Sure</h1>
            </div>
            <div className="center-text resource-icon">⚖️</div>
            {step === 1 && (
                <>
                    <h2 className='center-text'>Enter a general topics / keywords and we will assist you</h2>
                    <div className='center-item'>
                        <div className='text-bar'>
                            <input type="text" placeholder="Enter keyword(s)" value={topic} onChange={(e) => setTopic(e.target.value)}/><br/>
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
                    <div className="result-output">{apiResult.split('\n').map((line, idx) => ( <p key={idx}>{line}</p>))}</div>
                    <div className='back-btn' onClick={handleGoToLegal}>Back</div>
                </>
            )}
            <Footer />
        </div>
    );
}; 

export default GeneralPage;