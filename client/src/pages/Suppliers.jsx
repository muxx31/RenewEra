import React, { useState, useEffect } from 'react';

const SuppliersDashboard = ({ token }) => {
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('listings');

  const [newMaterial, setNewMaterial] = useState({
    materialType: '',
    quantity: '',
    pickupAddress: '',
    freeOrPaid: 'free',  // must match backend enum 'free' or 'paid'
    description: '',
  });

  // Fetch materials posted by logged-in supplier
  useEffect(() => {
    if (!token) return;

    fetch('https://renewera-server.onrender.com/api/supplier-materials', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMaterials(data))
      .catch(err => console.error('Error fetching materials:', err));
  }, [token]);

  // Fetch requests received for supplier's materials
  useEffect(() => {
    if (!token) return;

    fetch('https://renewera-server.onrender.com/api/supplier-materials/requests', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Error fetching requests:', err));
  }, [token]);

  // Handle form input changes
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

  // Submit new material form
  const handleSubmit = e => {
    e.preventDefault();

    fetch('https://renewera-server.onrender.com/api/supplier-materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newMaterial,
        quantity: Number(newMaterial.quantity), // ensure number type
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add material');
        return res.json();
      })
      .then(addedMaterial => {
        setMaterials(prev => [addedMaterial, ...prev]);
        // Reset form after adding
        setNewMaterial({
          materialType: '',
          quantity: '',
          pickupAddress: '',
          freeOrPaid: 'free',
          description: '',
        });
        setActiveTab('listings');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Supplier Dashboard</h2>

      <div className="mb-6 flex space-x-4">
        <button
          className={`px-4 py-2 font-semibold rounded ${
            activeTab === 'listings' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${
            activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('add')}
        >
          Add New Material
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${
            activeTab === 'requests' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          Requests Received
        </button>
      </div>

      {activeTab === 'listings' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">My Listings</h3>
          {materials.length === 0 ? (
            <p>No materials posted yet.</p>
          ) : (
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

      {activeTab === 'add' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Add New Material</h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block mb-1 font-medium">Material Type</label>
              <input
                type="text"
                name="materialType"
                value={newMaterial.materialType}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={newMaterial.quantity}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pickup Address</label>
              <input
                type="text"
                name="pickupAddress"
                value={newMaterial.pickupAddress}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="freeOrPaid"
                checked={newMaterial.freeOrPaid === 'free'}
                onChange={handleInputChange}
                id="freeOrPaid"
              />
              <label htmlFor="freeOrPaid">Is this material free?</label>
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={newMaterial.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Material
            </button>
          </form>
        </div>
      )}

      {activeTab === 'requests' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Requests Received</h3>
          {requests.length === 0 ? (
            <p>No requests received yet.</p>
          ) : (
            <ul>
              {requests.map(req => (
                <li key={req._id} className="border rounded p-3 mb-3">
                  <p>
                    <strong>Startup:</strong> {req.startup?.name || 'N/A'}
                  </p>
                  <p>
                    <strong>Material Requested:</strong> {req.materialPost?.materialType || 'N/A'}
                  </p>
                  <p>
                    <strong>Message:</strong> {req.message || 'N/A'}
                  </p>
                  <p>
                    <strong>Offer Price:</strong> {req.offerPrice || 'N/A'}
                  </p>
                  <p>
                    <strong>Status:</strong> {req.status || 'N/A'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SuppliersDashboard;
