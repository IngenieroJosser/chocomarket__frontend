'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export const AuthRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
      toast.error('Debes iniciar sesión');
      router.push('/login');
      return;
    }

    if (!allowedRoles.includes(userRole)) {
      toast.error('No tienes permisos para acceder a esta página');
      router.push('/login');
    }
  }, [allowedRoles, router]);

  return null;
};