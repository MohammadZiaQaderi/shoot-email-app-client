import React from 'react';
import EmailForm from './components/EmailForm';

function App() {
  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '40px' }}>
      <h2>Send an Email</h2>
      <EmailForm />
    </div>
  );
}

export default App;
