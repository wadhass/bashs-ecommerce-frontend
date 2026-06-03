import React, { useState } from 'react';
import { getBaseUrl } from '../../utils/baseURL';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim() || !email.trim()) {
      setStatus('Please enter your email and message before sending.');
      return;
    }

    setStatus('Sending message...');

    const apiUrl = `${getBaseUrl()}/api/contact/send-message`;

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to send message');
        }
        return res.json();
      })
      .then(() => {
        setStatus('Thanks — your message was sent. I will reach out shortly.');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.error('Contact send error:', err.message);
        setStatus(err.message || 'Failed to send message. Try again later.');
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-2">
        Feel free to reach out with any questions or inquiries!
      </p>
      <div className="text-center text-gray-700 mb-8">
        <p>
          <strong>Phone:</strong>{' '}
          <a href="tel:+250734332198" className="text-indigo-600 hover:underline">
            +250 734 332 198
          </a>
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:ahmedhassansumu@gmail.com" className="text-indigo-600 hover:underline">
            ahmedhassansumu@gmail.com
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Ahmed"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="ahmed@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        {status && <p className="text-sm text-gray-700">{status}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
