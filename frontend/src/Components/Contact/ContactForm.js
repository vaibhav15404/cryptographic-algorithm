import React, { useState } from 'react';
import './ContactForm.css'; // Optional: for styling

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });

  const [message, setMessage] = useState(''); // State for feedback message
  const [isError, setIsError] = useState(false); // State to manage error flag

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch('https://formspree.io/f/xovqvnov', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Message sent successfully!');
          setIsError(false); // Reset error state
          setFormData({ from_name: '', from_email: '', message: '' }); // Clear the form
        } else {
          throw new Error('Failed to send message');
        }
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setMessage('Failed to send message, please try again later.');
        setIsError(true); // Set error state
      })
      .finally(() => {
        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);
      });
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {message && (
        <div className='success-message' style={{ 
          color: isError ? 'red' : 'green',
          position: 'absolute',  // Make the message absolutely positioned
          top: '100%',           // Position it below the form
          left: '0',
          width: '100%',         // Make it take the full width of the form
          marginTop: '10px',     // Add some margin for spacing
          zIndex: '1',           // Bring it above other elements
        }}>
          {message}
        </div>
      )}
      
    </div>
  );
};

export default ContactForm;
