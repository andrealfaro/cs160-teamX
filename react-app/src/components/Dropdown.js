import React, { useState } from 'react';
import '../styles/Dropdown.css';  // optional for styling

function Dropdown({ options, placeholder = 'Select an option', onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); 
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selected} <span className="arrow">{isOpen ? '↑' : '↓'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option, idx) => (
            <div 
              key={idx} 
              className="dropdown-item" 
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;