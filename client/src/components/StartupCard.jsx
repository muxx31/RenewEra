import React from 'react';

const StartupCard = ({ startup }) => {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition duration-300">
      <h3 className="text-lg font-semibold">{startup.name}</h3>
      <p><strong>Founder:</strong> {startup.founderName}</p>
      <p><strong>Contact:</strong> {startup.contactNumber}</p>
      <p><strong>Email:</strong> {startup.email}</p>
      <p><strong>Industry:</strong> {startup.industry}</p>
      <p><strong>Address:</strong> {startup.address}</p>
    </div>
  );
};

export default StartupCard;
