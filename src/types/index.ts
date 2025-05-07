export interface User {
  id?: string;
  email: string;
  firstName: string;
  createdAt?: string;
}

export interface FormState {
  email: string;
  firstName: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface FormActions {
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}