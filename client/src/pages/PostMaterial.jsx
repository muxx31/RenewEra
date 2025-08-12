import React, { useState } from 'react';
import FormInput from '../components/FormInput';

const PostMaterial = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materialType: '',
    quantity: '',
    unit: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get JWT token from localStorage

    fetch('http://localhost:5002/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // <-- Authorization header with token
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to post material');
        return res.json();
      })
      .then(data => {
        alert('Material posted successfully!');
        setFormData({ title: '', description: '', materialType: '', quantity: '', unit: '' });
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Post New Material Request</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Material title"
        />
        <FormInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <FormInput
          label="Material Type"
          name="materialType"
          value={formData.materialType}
          onChange={handleChange}
          placeholder="Type of material"
        />
        <FormInput
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <FormInput
          label="Unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Unit (e.g., kg, liters)"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostMaterial;
