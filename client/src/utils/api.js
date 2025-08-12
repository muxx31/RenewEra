const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002/api';

// Helper to handle JSON response and errors
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'API Error');
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// Generic GET request
export async function get(endpoint, token) {
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  return handleResponse(res);
}

// Generic POST request with JSON body
export async function post(endpoint, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// Generic PUT request with JSON body
export async function put(endpoint, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// Generic DELETE request
export async function del(endpoint, token) {
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers,
  });
  return handleResponse(res);
}
