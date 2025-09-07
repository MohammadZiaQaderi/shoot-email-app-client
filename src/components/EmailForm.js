import React, { useState } from 'react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    text: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('✅ Email sent successfully!');
        setFormData({ to: '', subject: '', text: '' });
      } else {
        setStatus('❌ Failed to send email.');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Error while sending email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input
        type="email"
        name="to"
        placeholder="To"
        value={formData.to}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="text"
        placeholder="Message"
        value={formData.text}
        onChange={handleChange}
        rows={5}
        required
      />
      <button type="submit">Send Email</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default EmailForm;
