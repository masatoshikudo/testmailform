import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormStore } from '../store/formStore';
import { saveUserToSupabase, subscribeToMailchimp } from '../lib/supabase';

const EmailForm: React.FC = () => {
  const formState = useFormStore();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('メールアドレスを入力してください');
      return false;
    } else if (!regex.test(email)) {
      setEmailError('有効なメールアドレスを入力してください');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateName = (name: string) => {
    if (!name) {
      setNameError('お名前を入力してください');
      return false;
    }
    setNameError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(formState.email);
    const isNameValid = validateName(formState.firstName);
    
    if (!isEmailValid || !isNameValid) {
      return;
    }
    
    formState.setIsSubmitting(true);
    formState.setError(null);
    
    try {
      // Save user to Supabase
      const { error: supabaseError } = await saveUserToSupabase({
        email: formState.email,
        firstName: formState.firstName
      });
      
      if (supabaseError) {
        throw new Error('登録中にエラーが発生しました。後ほど再度お試しください。');
      }
      
      // Subscribe to Mailchimp
      const { error: mailchimpError } = await subscribeToMailchimp({
        email: formState.email,
        firstName: formState.firstName
      });
      
      if (mailchimpError) {
        throw new Error('メールの購読中にエラーが発生しました。後ほど再度お試しください。');
      }
      
      formState.setIsSuccess(true);
      
      // Reset form after 5 seconds on success
      setTimeout(() => {
        formState.reset();
      }, 5000);
      
    } catch (error) {
      formState.setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    } finally {
      formState.setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (formState.isSuccess) {
    return (
      <motion.div 
        className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">ありがとうございます！</h2>
        <p className="text-center text-gray-600">
          登録が完了しました。まもなくウェルカムメールが届きます。
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6 md:p-8 bg-white rounded-lg shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-bold text-center text-gray-800 mb-6"
        variants={itemVariants}
      >
        ニュースレターに登録する
      </motion.h2>
      
      {formState.error && (
        <motion.div 
          className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {formState.error}
        </motion.div>
      )}
      
      <motion.form onSubmit={handleSubmit} variants={itemVariants}>
        <div className="mb-5">
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={(e) => {
              formState.setFirstName(e.target.value);
              validateName(e.target.value);
            }}
            className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              nameError ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="山田 太郎"
          />
          {nameError && (
            <motion.p 
              className="mt-1 text-sm text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {nameError}
            </motion.p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={(e) => {
              formState.setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              emailError ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="example@example.com"
          />
          {emailError && (
            <motion.p 
              className="mt-1 text-sm text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {emailError}
            </motion.p>
          )}
        </div>
        
        <motion.button
          type="submit"
          disabled={formState.isSubmitting}
          className={`w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
            formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {formState.isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              処理中...
            </div>
          ) : (
            '登録する'
          )}
        </motion.button>
        
        <motion.p 
          className="mt-4 text-sm text-gray-500 text-center"
          variants={itemVariants}
        >
          ※ 登録すると最新情報をお届けします
        </motion.p>
      </motion.form>
    </motion.div>
  );
};

export default EmailForm;