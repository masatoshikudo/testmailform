import React from 'react';
import Header from './components/Header';
import EmailForm from './components/EmailForm';
import Footer from './components/Footer';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              最新情報をお届けします
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              メールマガジンに登録して、最新のニュース、特別オファー、お得な情報をいち早くお届けします。
            </p>
          </div>
          <EmailForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;