import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/legal.css';

function LegalPage() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
  
    const options = [
      { icon: '📄', title: 'Property Damage & Insurance', route: '/insurance-help' },
      { icon: '🏠', title: 'Housing & Eviction', route: '/housing-eviction' },
      { icon: '👷', title: 'Employment & Lost Wages', route: '/employment-help' },
      { icon: '🐶', title: 'Dependents & Animal Care', route: '/animal-care' },
      { icon: '📝', title: 'Lost Documents', route: '/document-replacement' },
      { icon: '⚖️', title: 'General Legal Help / Not Sure', route: '/general-legal-resources' }
    ];
  
    const handleClick = (option) => {
      navigate(option.route);
    };
  
    return (
      <div className='main-container'>
        <Header />
        <div className='legal-content-container'>
          <div className='title-section'>
            <div className='legal-title'>
              <h1>Legal Assistance</h1>
              <p>Find the legal help you need.</p>
              <p>Note: Seek professional legal help for more information or assistance.</p>
            </div>
          </div>
          <h2 className='center-text'>What type of legal help are you looking for?</h2>
          <div className='option-card-container'>
            {options.map((option) => (
              (selected === null || selected === option.title) && (
                  <div
                  key={option.title}
                  className="option-card"
                  onClick={() => handleClick(option)}
                >
                  <div className="resource-icon">{option.icon}</div>
                  <h3>{option.title}</h3>
                </div>
              )
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default LegalPage;