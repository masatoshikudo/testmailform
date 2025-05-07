import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants?: Variants;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = 'text',
  label,
  value,
  placeholder,
  error,
  onChange,
  variants,
  required = false,
}) => (
  <motion.div variants={variants} className="mb-5">
    <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      placeholder={placeholder}
    />
    {error && (
      <motion.p
        className="mt-1 text-sm text-red-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {error}
      </motion.p>
    )}
  </motion.div>
);

export default FormInput; 