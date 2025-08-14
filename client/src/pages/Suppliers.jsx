import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../utils/config.js';

const token = localStorage.getItem('token'); // get token

const SuppliersDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('listings');
  const [newMaterial, setNewMaterial] = useState({
    materialType: '',
    quantity: '',
    pickupAddress: '',
    freeOrPaid: 'free',
    description: '',
  });

  useEffect(() => {
    if (!token) return;
    fetch(`${BACKEND_URL}/api/supplier-materials`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMaterials(data))
      .catch(err => console.error('Error fetching materials:', err));
  }, []);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'freeOrPaid') {
      setNewMaterial(prev => ({
        ...prev,
        freeOrPaid: checked ? 'free' : 'paid',
      }));
    } else {
      setNewMaterial(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newMaterial).forEach(key => {
        formData.append(key, newMaterial[key]);
      });

      const response = await fetch(`${BACKEND_URL}/api/supplier-materials`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }, // do NOT set Content-Type manually
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add material');

      setMaterials(prev => [data, ...prev]);
      setNewMaterial({
        materialType: '',
        quantity: '',
        pickupAddress: '',
        freeOrPaid: 'free',
        description: '',
      });
      setActiveTab('listings');
    } catch (err) {
      console.error('Error submitting material:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Supplier Dashboard</h2>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4">
        <button
          className={activeTab === 'listings' ? 'bg-blue-600 text-white px-4 py-2 rounded' : 'bg-gray-200 px-4 py-2 rounded'}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button
          className={activeTab === 'add' ? 'bg-blue-600 text-white px-4 py-2 rounded' : 'bg-gray-200 px-4 py-2 rounded'}
          onClick={() => setActiveTab('add')}
        >
          Add New Material
        </button>
      </div>

      {/* Listings Tab */}
      {activeTab === 'listings' && (
        <div>
          {materials.length === 0 ? <p>No materials posted yet.</p> : (
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Material Type</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Pickup Address</th>
                  <th className="border px-4 py-2">Free/Paid</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {materials.map(mat => (
                  <tr key={mat._id}>
                    <td className="border px-4 py-2">{mat.materialType}</td>
                    <td className="border px-4 py-2">{mat.quantity}</td>
                    <td className="border px-4 py-2">{mat.pickupAddress}</td>
                    <td className="border px-4 py-2">{mat.freeOrPaid}</td>
                    <td className="border px-4 py-2">{mat.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add Material Tab */}
      {activeTab === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input type="text" name="materialType" placeholder="Material Type" value={newMaterial.materialType} onChange={handleInputChange} required className="w-full border px-3 py-2 rounded"/>
          <input type="number" name="quantity" placeholder="Quantity" value={newMaterial.quantity} onChange={handleInputChange} required className="w-full border px-3 py-2 rounded"/>
          <input type="text" name="pickupAddress" placeholder="Pickup Address" value={newMaterial.pickupAddress} onChange={handleInputChange} required className="w-full border px-3 py-2 rounded"/>
          <div>
            <label>
              <input type="checkbox" name="freeOrPaid" checked={newMaterial.freeOrPaid === 'free'} onChange={handleInputChange}/> Free
            </label>
          </div>
          <textarea name="description" placeholder="Description" value={newMaterial.description} onChange={handleInputChange} className="w-full border px-3 py-2 rounded"/>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Material</button>
        </form>
      )}
    </div>
  );
};

export default SuppliersDashboard;
