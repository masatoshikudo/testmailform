import React from 'react';
import { Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 md:py-8">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">メールマガジン</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;