import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-950 text-white text-center py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} Material-to-Product. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
