import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SupplierCard from '../components/SupplierCard';

const Startups = () => {
  const [startup, setStartup] = useState(null);           // logged-in startup info
  const [requests, setRequests] = useState([]);           // requests made to this startup
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // suppliers or products matching search

  // Get token from localStorage (adjust if your auth uses other storage)
  const token = localStorage.getItem('token');

  // Fetch logged-in startup info and requests on mount
  useEffect(() => {
    if (!token) return; // No token, can't fetch

    // Fetch startup profile
    fetch('http://localhost:5002/api/startups/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.message) {
          console.error('Error fetching startup profile:', data.message);
          return;
        }
        setStartup(data);
      })
      .catch(err => console.error(err));

    // Fetch requests made to this startup
    fetch('http://localhost:5002/api/requests/mystartup', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.message) {
          console.error('Error fetching requests:', data.message);
          return;
        }
        setRequests(data);
      })
      .catch(err => console.error(err));
  }, [token]);

  // Search suppliers or materials on searchTerm change (debounce if you want)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    fetch(`http://localhost:5002/api/suppliers/search?q=${encodeURIComponent(searchTerm)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.message) {
          console.error('Error fetching search results:', data.message);
          setSearchResults([]);
          return;
        }
        setSearchResults(data);
      })
      .catch(err => {
        console.error(err);
        setSearchResults([]);
      });
  }, [searchTerm, token]);

  if (!startup) return <p className="p-6 text-center">Loading your dashboard...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {startup.companyName || startup.name}!</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Requests from Suppliers</h3>
        {requests.length > 0 ? (
          <ul className="list-disc list-inside">
            {requests.map(req => (
              <li key={req._id}>
                {req.supplierName} requested {req.material} - Status: {req.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No requests found.</p>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Search Suppliers / Products</h3>
        <SearchBar
          searchText={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search suppliers or materials (e.g., plastic, cloth scrap)"
        />

        <div className="grid gap-6 md:grid-cols-2 mt-4">
          {searchResults.length > 0 ? (
            searchResults.map(supplier => (
              <SupplierCard key={supplier._id} supplier={supplier} />
            ))
          ) : (
            searchTerm.trim() !== '' && <p>No results found for "{searchTerm}".</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Startups;
