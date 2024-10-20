import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 p-6 text-white py-4 text-center">
      <div className="footer mx-auto">
        <a href="#top" className="hover:text-yellow-500">
          Back to Top
        </a>
        <p className="mt-4">&copy; {new Date().getFullYear()} Recipe Mate. All Rights Reserved.</p>
        <p className="text-sm">Developed by Fiston</p>
      </div>
    </footer>
  );
};

export default Footer;
