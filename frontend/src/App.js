import React, { useState, useEffect } from 'react';
import LeadList from './components/LeadList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('invited'); // 'invited' ou 'accepted'
  const [leads, setLeads] = useState([]); // Começa com uma lista vazia

  // IMPORTANTE: Verifique no terminal do seu backend qual porta ele está usando!
  // Pode ser 7052, 7123, etc. E ajuste a URL abaixo se necessário.
  const API_URL = "https://localhost:7052/api";

  // useEffect para buscar os dados da API quando o componente carregar
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Busca os dois tipos de leads
        const invitedResponse = await fetch(`${API_URL}/leads?status=Invited`);
        const acceptedResponse = await fetch(`${API_URL}/leads?status=Accepted`);

        const invitedData = await invitedResponse.json();
        const acceptedData = await acceptedResponse.json();

        // Junta tudo em uma única lista e atualiza o estado
        setLeads([...invitedData, ...acceptedData]);
      } catch (error) {
        console.error("Falha ao buscar leads:", error);
      }
    };

    fetchLeads();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Filtra os leads com base na aba ativa
  const invitedLeads = leads.filter(lead => lead.status === 0);
  const acceptedLeads = leads.filter(lead => lead.status === 1);

  // Função para ACEITAR um lead
  const handleAccept = async (leadId) => {
    try {
      const response = await fetch(`${API_URL}/leads/${leadId}/accept`, {
        method: 'POST',
      });

      if (response.ok) {
        // Atualiza o estado local para refletir a mudança instantaneamente
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: 1 } : lead
        ));
      }
    } catch (error) {
      console.error("Falha ao aceitar lead:", error);
    }
  };

  // Função para RECUSAR um lead
  const handleDecline = async (leadId) => {
    try {
      const response = await fetch(`${API_URL}/leads/${leadId}/decline`, {
        method: 'POST',
      });

      if (response.ok) {
        // Remove o lead da lista local para a UI atualizar
        setLeads(leads.filter(lead => lead.id !== leadId));
      }
    } catch (error) {
      console.error("Falha ao recusar lead:", error);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <nav className="tabs">
          <button onClick={() => setActiveTab('invited')} className={activeTab === 'invited' ? 'active' : ''}>
            Invited
          </button>
          <button onClick={() => setActiveTab('accepted')} className={activeTab === 'accepted' ? 'active' : ''}>
            Accepted
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'invited' ? (
          <LeadList leads={invitedLeads} onAccept={handleAccept} onDecline={handleDecline} />
        ) : (
          <LeadList leads={acceptedLeads} />
        )}
      </main>
    </div>
  );
}

export default App;