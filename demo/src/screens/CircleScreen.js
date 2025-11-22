import React from 'react';
import {useNavigate} from 'react-router-dom';
import './CircleScreen.css';

const CircleScreen = () => {
  const navigate = useNavigate();

  const members = [
    {name: 'Mom', relation: 'Family', initial: 'M'},
    {name: 'Sarah', relation: 'Friend', initial: 'S'},
    {name: 'Jake', relation: 'Friend', initial: 'J'},
  ];

  return (
    <div className="circle-screen">
      <div className="nav-bar">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="nav-title">My Circle</div>
        <div style={{width: '60px'}}></div>
      </div>
      <div className="circle-content">
        {members.map((member, index) => (
          <div key={index} className="member-card">
            <div className="member-avatar" style={{
              background: index === 0 
                ? 'linear-gradient(135deg, #4A90E2, #2E5C8A)'
                : index === 1
                ? 'linear-gradient(135deg, #FF9500, #CC7700)'
                : 'linear-gradient(135deg, #34C759, #28A745)'
            }}>
              {member.initial}
            </div>
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-relation">{member.relation}</div>
            </div>
          </div>
        ))}
        <button className="add-button" onClick={() => alert('Add member functionality')}>
          + Add Circle Member
        </button>
      </div>
    </div>
  );
};

export default CircleScreen;

