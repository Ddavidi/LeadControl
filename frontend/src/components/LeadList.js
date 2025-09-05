import React from 'react';
import LeadCard from './LeadCard';

// Recebe as funções onAccept e onDecline como props
const LeadList = ({ leads, onAccept, onDecline }) => {
  return (
    <div className="lead-list">
      {leads.map(lead => (
        <LeadCard 
          key={lead.id} 
          lead={lead} 
          onAccept={onAccept} // Passa para o LeadCard
          onDecline={onDecline} // Passa para o LeadCard
        />
      ))}
    </div>
  );
};

export default LeadList;