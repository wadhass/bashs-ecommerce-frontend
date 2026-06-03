import React, { useState } from 'react';
import { useAddProductsMutation } from '../../redux/features/products/productsApi';

const AddNewPost = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    color: '',
    price: '',
    image: '',
  });
  const [addProduct, { isLoading }] = useAddProductsMutation();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
      }).unwrap();
      setMessage('Product created successfully.');
      setForm({ name: '', description: '', category: '', color: '', price: '', image: '' });
    } catch (error) {
      console.error('Create post failed', error);
      setMessage('Unable to create the product.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'description', 'category', 'color', 'price', 'image'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === 'description' ? (
              <textarea
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 w-full rounded border-gray-300 px-3 py-2"
                rows={3}
              />
            ) : (
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 w-full rounded border-gray-300 px-3 py-2"
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-primary text-white px-5 py-3 rounded" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default AddNewPost;
