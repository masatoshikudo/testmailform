import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-8 text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} メールマガジン. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="text-indigo-600 hover:underline">プライバシーポリシー</a>
          {' • '}
          <a href="#" className="text-indigo-600 hover:underline">利用規約</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;