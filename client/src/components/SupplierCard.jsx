import React from 'react';

const SupplierCard = ({ supplier }) => {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition duration-300">
      <h3 className="text-lg font-semibold">{supplier.companyName}</h3>
      <p><strong>Contact:</strong> {supplier.contactNumber}</p>
      <p><strong>Email:</strong> {supplier.email}</p>
      <p><strong>Materials Supplied:</strong> {supplier.materialsSupplied.join(', ')}</p>
      <p><strong>Address:</strong> {supplier.address}</p>
    </div>
  );
};

export default SupplierCard;
