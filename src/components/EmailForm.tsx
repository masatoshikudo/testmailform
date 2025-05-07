import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormStore } from '../store/formStore';
import { saveUserToSupabase, subscribeToMailchimp } from '../lib/supabase';
import FormInput from './FormInput';
import SuccessMessage from './SuccessMessage';

const EmailForm: React.FC = () => {
  const formState = useFormStore();
  const { email, firstName, isSubmitting, isSuccess, error, setEmail, setFirstName, setIsSubmitting, setError, setIsSuccess, reset } = formState;
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
    
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(firstName);
    
    if (!isEmailValid || !isNameValid) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Save user to Supabase
      const { error: supabaseError } = await saveUserToSupabase({
        email: email,
        firstName: firstName
      });
      
      if (supabaseError) {
        throw new Error('登録中にエラーが発生しました。後ほど再度お試しください。');
      }
      
      // Subscribe to Mailchimp
      const { error: mailchimpError } = await subscribeToMailchimp({
        email: email,
        firstName: firstName
      });
      
      if (mailchimpError) {
        throw new Error('メールの購読中にエラーが発生しました。後ほど再度お試しください。');
      }
      
      setIsSuccess(true);
      
      // Reset form after 5 seconds on success
      setTimeout(() => {
        reset();
      }, 5000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    } finally {
      setIsSubmitting(false);
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

  if (isSuccess) {
    return <SuccessMessage />;
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
      
      {error && (
        <motion.div 
          className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.form onSubmit={handleSubmit} variants={itemVariants}>
        <FormInput
          id="firstName"
          name="firstName"
          label="お名前"
          value={firstName}
          placeholder="山田 太郎"
          error={nameError}
          onChange={(e) => { setFirstName(e.target.value); validateName(e.target.value); }}
          required={true}
          variants={itemVariants}
        />
        <FormInput
          id="email"
          type="email"
          name="email"
          label="メールアドレス"
          value={email}
          placeholder="example@example.com"
          error={emailError}
          onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
          required={true}
          variants={itemVariants}
        />
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
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