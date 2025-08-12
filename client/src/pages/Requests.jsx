import React, { useState, useEffect } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('https://renewera-server.onrender.com/api/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Material Requests</h2>
      <ul className="space-y-4">
        {requests.map(req => (
          <li key={req._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{req.title}</h3>
            <p>{req.description}</p>
            <p>
              <strong>Material Type:</strong> {req.materialType}
            </p>
            <p>
              <strong>Quantity:</strong> {req.quantity} {req.unit}
            </p>
          </li>
        ))}
        {requests.length === 0 && <p>No requests found.</p>}
      </ul>
    </div>
  );
};

export default Requests;
