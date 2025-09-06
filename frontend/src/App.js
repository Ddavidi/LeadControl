import React, { useState, useEffect } from 'react';
import LeadList from './components/LeadList';
import CreateLeadForm from './components/CreateLeadForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('invited');
  const [leads, setLeads] = useState([]);

  const API_URL = "https://localhost:7052/api";

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const invitedResponse = await fetch(`${API_URL}/leads?status=Invited`);
        const acceptedResponse = await fetch(`${API_URL}/leads?status=Accepted`);
        const declinedResponse = await fetch(`${API_URL}/leads?status=Declined`);
        const invitedData = await invitedResponse.json();
        const acceptedData = await acceptedResponse.json();
        const declinedData = await declinedResponse.json();
        setLeads([...invitedData, ...acceptedData, ...declinedData]);
      } catch (error) {
        console.error("Falha ao buscar leads:", error);
      }
    };
    fetchLeads();
  }, []);

  const invitedLeads = leads.filter(lead => lead.status === 0);
  const acceptedLeads = leads.filter(lead => lead.status === 1);
  const declinedLeads = leads.filter(lead => lead.status === 2);

  const handleAccept = async (leadId) => {
    try {
      const response = await fetch(`${API_URL}/leads/${leadId}/accept`, {
        method: 'POST',
      });

      if (response.ok) {
        // 1. Pega os dados ATUALIZADOS do lead que a API retornou.
        const updatedLead = await response.json();

        // 2. Substitui o lead antigo na lista pelo lead totalmente atualizado.
        setLeads(leads.map(lead => 
          lead.id === leadId ? updatedLead : lead
        ));
      }
    } catch (error) {
      console.error("Falha ao aceitar lead:", error);
    }
  };

  const handleDecline = async (leadId) => {
    try {
      const response = await fetch(`${API_URL}/leads/${leadId}/decline`, {
        method: 'POST',
      });

      if (response.ok) {
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: 2 } : lead
        ));
      }
    } catch (error) {
      console.error("Falha ao recusar lead:", error);
    }
  };

  const handleCreateLead = async (leadData) => {
    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        const newLead = await response.json();
        setLeads(prevLeads => [...prevLeads, newLead]);
        setActiveTab('invited');
      } else {
        console.error("Falha ao criar lead:", await response.text());
      }
    } catch (error) {
      console.error("Erro de rede ao criar lead:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'invited':
        return <LeadList leads={invitedLeads} onAccept={handleAccept} onDecline={handleDecline} />;
      case 'accepted':
        return <LeadList leads={acceptedLeads} />;
      case 'declined':
        return <LeadList leads={declinedLeads} />;
      case 'create':
        return <CreateLeadForm onSubmit={handleCreateLead} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <nav className="tabs">
          <button onClick={() => setActiveTab('invited')} className={`invited ${activeTab === 'invited' ? 'active' : ''}`}>
            Invited
          </button>
          <button onClick={() => setActiveTab('accepted')} className={`accepted ${activeTab === 'accepted' ? 'active' : ''}`}>
            Accepted
          </button>
          <button onClick={() => setActiveTab('declined')} className={`declined ${activeTab === 'declined' ? 'active' : ''}`}>
            Declined
          </button>
          <button onClick={() => setActiveTab('create')} className={`create ${activeTab === 'create' ? 'active' : ''}`}>
            Criar Nova Lead
          </button>
        </nav>
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;