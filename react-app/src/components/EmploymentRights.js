import React from 'react';
import '../styles/legal.css';

function EmploymentRights() {
  return (
    <div className="employment-rights">
      <h2>Employment Rights & Protections During Wildfire Recovery</h2>
      <h3>If You Lose Work or Income:</h3>
      <ul>
        <li><strong>Disaster Unemployment Assistance (DUA):</strong>
          <ul>
            <li>If you lose your job, can’t reach your workplace, or your workplace is closed because of a wildfire, you may qualify for DUA.</li>
            <li>Covers employees, self-employed people, independent contractors, and in some cases, undocumented workers.</li>
            <li>Apply through <strong>EDD (Employment Development Department)</strong> as soon as a federal disaster declaration is made.</li>
          </ul>
        </li>
      </ul>

      <h3>If You Miss Work for Safety or Evacuation:</h3>
      <ul>
        <li><strong>Labor Code Section 230:</strong> Protects you from being fired or disciplined for taking time off due to a mandatory evacuation order. Must give your employer notice (before or as soon as practical).</li>
      </ul>

      <h3>If Your Workplace Becomes Unsafe:</h3>
      <ul>
        <li><strong>Cal/OSHA regulations:</strong>
          <ul>
            <li>You have the right to refuse unsafe work.</li>
            <li>Employers must provide respiratory protection if the air quality index (AQI) exceeds 150 for PM2.5 (smoke particles) outdoors.</li>
            <li>Employers must also provide access to clean air and sufficient rest breaks.</li>
          </ul>
        </li>
      </ul>

      <h3>Paid Sick Leave:</h3>
      <ul>
        <li>California law requires employers to provide paid sick leave — you can use it for wildfire-related health issues, including stress, asthma, or other smoke-related conditions.</li>
      </ul>

      <h3>Leave to Care for Family:</h3>
      <ul>
        <li><strong>Family-School Partnership Act:</strong> If a child’s school or daycare is closed due to wildfire, you may be entitled to unpaid leave to care for them.</li>
      </ul>

      <h3>Protection from Retaliation:</h3>
      <ul>
        <li>Employers <strong>cannot retaliate</strong> (fire, discipline, demote, or otherwise punish you) for:
          <ul>
            <li>Using protected leave</li>
            <li>Reporting unsafe conditions</li>
            <li>Filing a claim for lost wages or unemployment benefits</li>
          </ul>
        </li>
      </ul>

      <h3>Undocumented Workers:</h3>
      <ul>
        <li>Undocumented workers are <strong>protected under state labor laws</strong> for:
          <ul>
            <li>Fair wages</li>
            <li>Safe working conditions</li>
            <li>Protection from retaliation</li>
            <li>Access to Workers’ Compensation if injured on the job</li>
          </ul>
        </li>
      </ul>

      <h3>Where to Get Help:</h3>
      <ul>
        <li><a href="https://edd.ca.gov" target="_blank" rel="noopener noreferrer">CA Employment Development Department (EDD)</a></li>
        <li>Legal Aid at Work: Free employment rights legal services</li>
        <li>Cal/OSHA: For unsafe workplace conditions: <strong>1-800-963-9424</strong></li>
        <li>Disaster Legal Services: Free legal help after a wildfire</li>
      </ul>
    </div>
  );
}

export default EmploymentRights;
