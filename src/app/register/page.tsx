'use client'; // si estás en app router de Next.js

import { useState } from 'react';
import { Input } from '@/components/Input';
import { registerUser } from '@/services/auth/authService';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router'; // si usas Pages Router

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(formData);
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-[#008060] mb-2">Crear Cuenta</h2>

      <Input label="Nombre completo" name="name" value={formData.name} onChange={handleChange} />
      <Input label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />
      <Input label="Teléfono" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
      <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-[#008060] text-white py-2 px-4 rounded hover:bg-[#00694d] transition"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}

export default RegisterPage