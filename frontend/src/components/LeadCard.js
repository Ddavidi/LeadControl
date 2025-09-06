import React from 'react';

import { FaUser, FaBriefcase, FaPhone, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

const LeadCard = ({ lead, onAccept, onDecline }) => {
  const formattedDate = new Date(lead.dateCreated).toLocaleString('pt-BR');

  return (
    <div className="lead-card">
      <div className="lead-header">
        <div className="detail-item">
          <FaUser className="icon" /> {/* Ícone de Usuário */}
          <span className="lead-name">
            {lead.status === 0 ? lead.contactFirstName : (lead.contactFullName || lead.contactFirstName)}
          </span>
        </div>
        <div className="detail-item">
          <FaCalendarAlt className="icon" /> {/* Ícone de Calendário */}
          <span className="lead-date">{formattedDate}</span>
        </div>
      </div>

      <hr />

      {/* Exibição dos detalhes para incluir os ícones */}
      <div className="lead-details">
        <div className="detail-item">
          <FaMapMarkerAlt className="icon" /> {/* Ícone de Localização */}
          <span>{lead.suburb}</span>
        </div>
        <div className="detail-item">
          <FaBriefcase className="icon" /> {/* Ícone de Maleta */}
          <span><strong>Category:</strong> {lead.category}</span>
        </div>
        <p className="lead-description">{lead.description}</p>
        <p><strong>Job ID:</strong> {lead.id}</p>

        {/* Renderização Condicional dos Detalhes de Contato */}
        {(lead.status === 1 || lead.status === 2) && (
          <div className="contact-details">
            {lead.phoneNumber && (
              <div className="detail-item">
                <FaPhone className="icon" /> {/* Ícone de Telefone */}
                <span>{lead.phoneNumber}</span>
              </div>
            )}
            {lead.email && (
              <div className="detail-item">
                <FaEnvelope className="icon" /> {/* Ícone de Email */}
                <span>{lead.email}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <hr />

      <div className="lead-footer">
        {lead.status === 0 && (
          <div className="lead-actions">
            <button onClick={() => onAccept(lead.id)} className="btn-accept">Accept</button>
            <button onClick={() => onDecline(lead.id)} className="btn-decline">Decline</button>
          </div>
        )}

        <div className="price-section">
          <div className="price-line">
            <FaMoneyBillWave className="icon" />
            <span className="lead-price">${lead.price.toFixed(2)}</span>
          </div>

          {lead.wasDiscountApplied && (
            <span className="discount-applied">10% de desconto aplicado!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCard;