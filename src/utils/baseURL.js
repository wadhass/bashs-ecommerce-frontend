export const getBaseUrl = () => {
  try {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
      if (isLocal) {
        return 'http://localhost:3030';
      }
    }
  } catch (e) {
    console.error('Error detecting base URL:', e);
  }

  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  return 'https://basha-ecommerce-backend-17el.onrender.com/api';
};