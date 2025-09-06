import React, { useState } from 'react';

const CreateLeadForm = ({ onSubmit }) => {
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactFullName, setContactFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [suburb, setSuburb] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // ATUALIZAÇÃO DA VALIDAÇÃO
    // verificação de obrigatoriedade.
    if (!contactFirstName || !contactFullName || !phoneNumber || !email || !suburb || !category || !description || !price) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (isNaN(parseFloat(price))) {
        setError('O preço deve ser um número válido.');
        return;
    }

    setError('');

    const newLeadData = {
      contactFirstName,
      contactFullName,
      phoneNumber,
      email,
      suburb,
      category,
      description,
      price: parseFloat(price),
    };

    onSubmit(newLeadData);
  };

  return (
    <div className="lead-card">
      <h2>Criar Nova Lead</h2>
      <form onSubmit={handleSubmit} className="create-lead-form">
        <div className="form-group">
          <label>Primeiro Nome do Contato *</label>
          <input type="text" value={contactFirstName} onChange={(e) => setContactFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nome Completo do Contato *</label>
          <input type="text" value={contactFullName} onChange={(e) => setContactFullName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Telefone *</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Bairro / CEP *</label>
          <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Categoria *</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Descrição *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Preço ($) *</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-create">Criar Lead</button>
      </form>
    </div>
  );
};

export default CreateLeadForm;