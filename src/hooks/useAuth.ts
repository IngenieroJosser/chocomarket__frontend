import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  userAuthenticated,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from '@/services/auth/authService';

export const useAuth = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info');

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      toast.error('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      toast.error('El correo electrónico no es válido');
      setLoading(false);
      return;
    }

    try {
      const response = await userAuthenticated({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.user.role);
      localStorage.setItem('userName', response.user.name);

      toast.success(`Hola, ${response.user.name || 'Usuario'}`);

      const role = response.user.role.toUpperCase();
      if (role === 'SELLER') router.push('/seller-dashboard');
      else if (role === 'ADMIN') router.push('/admin-dashboard');
      else router.push('/shop');
    } catch (err: any) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (email: string, onSuccess: () => void) => {
    setLoading(true);
    setError('');
    try {
      await forgotPassword({ email });
      toast.success('OTP enviada al correo');
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateOtp = async (email: string, otp: string, onSuccess: () => void) => {
    setError('');
    try {
      await verifyOtp({ email, otp });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al verificar la OTP');
    }
  };

  const changePassword = async (
    email: string,
    newPassword: string,
    confirmPassword: string,
    onSuccess: () => void
  ) => {
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setAlertMessage('La contraseña debe tener al menos 6 caracteres');
      setAlertType('error');
      return;
    }

    try {
      await resetPassword({ email, newPassword });
      toast.success('Contraseña actualizada');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al cambiar contraseña');
    }
  };

  return {
    loading,
    error,
    alertMessage,
    alertType,
    setError,
    login,
    sendOtp,
    validateOtp,
    changePassword,
  };
};
