import React from 'react';

const LeadCard = ({ lead, onAccept, onDecline }) => {
  // Formata a data para uma leitura mais fácil
  const formattedDate = new Date(lead.dateCreated).toLocaleString('pt-BR');

  return (
    <div className="lead-card">
      <div className="lead-header">
        <span className="lead-name">{lead.contactFirstName}</span>
        <span className="lead-date">{formattedDate}</span>
      </div>
      <div className="lead-details">
        <p>{lead.suburb}</p>
        <p><strong>Job ID:</strong> {lead.id} | <strong>Category:</strong> {lead.category}</p>
        <hr />
        {/* Mostra email e telefone apenas se existirem (para leads aceitos) */}
        {lead.email && <p><strong>Email:</strong> {lead.email}</p>}
        {lead.phoneNumber && <p><strong>Phone:</strong> {lead.phoneNumber}</p>}
        <p className="lead-description">{lead.description}</p>
      </div>
      <div className="lead-footer">
        {lead.status === 0 && (
          <div className="lead-actions">
            <button className="btn-accept" onClick={() => onAccept(lead.id)}>Accept</button>
            <button className="btn-decline" onClick={() => onDecline(lead.id)}>Decline</button>
          </div>
        )}
        <span className="lead-price">${lead.price.toFixed(2)} Lead Invitation</span>
      </div>
    </div>
  );
};

export default LeadCard;