import React, { useState } from 'react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: 'Test',
    text: 'Hi, kindly ignore this email',
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
      const response = await fetch('https://shoot-email-app-api.onrender.com/send-email', {
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
        <form
      onSubmit={handleSubmit}
      className="container mt-5 p-4 border rounded"
      style={{ maxWidth: '500px' }}
    >
      <div className="mb-3">
        <input
          type="email"
          name="to"
          placeholder="To"
          className="form-control"
          value={formData.to}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="form-control"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          name="text"
          placeholder="Message"
          className="form-control"
          rows={5}
          value={formData.text}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={status === 'Sending...'}
      >
        {status === 'Sending...' ? 'Sending...' : 'Send Email'}
      </button>
      {status && <p className="mt-3 text-center">{status}</p>}
    </form>

  );
};

export default EmailForm;
