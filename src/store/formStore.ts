import { create } from 'zustand';
import { FormState, FormActions } from '../types';

const initialState: FormState = {
  email: '',
  firstName: '',
  isSubmitting: false,
  isSuccess: false,
  error: null
};

export const useFormStore = create<FormState & FormActions>((set) => ({
  ...initialState,
  setEmail: (email) => set({ email }),
  setFirstName: (firstName) => set({ firstName }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),
  setError: (error) => set({ error }),
  reset: () => set(initialState)
}));