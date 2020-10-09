import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from "../src/components/ContactForm/ContactForm";
import StatusAnnouncement from "../src/components/StatusAnnouncement/StatusAnnouncement";
function App() {
  const [status, setStatus] = useState(null);

  const setResponse = (response) => {
    setStatus(response);
    setTimeout(() => setStatus(null), 5000);
  };
  
  return (
    <div className="App">
      <h1>Contact Form</h1>
      {status && (
        <StatusAnnouncement type={status.type} message={status.message} />
      )}
      <ContactForm setResponse={setResponse} />
    </div>
  );
}

export default App;
